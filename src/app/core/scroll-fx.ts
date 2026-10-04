type Cleanup = () => void;

interface Scrub {
  el: HTMLElement;
  mode: 'view' | 'pin' | 'leave';
  p: number;
}

interface Highlight {
  el: HTMLElement;
  words: HTMLElement[];
  lit: number;
}

interface HScroll {
  section: HTMLElement;
  track: HTMLElement;
  distance: number;
}

const clamp = (v: number, min = 0, max = 1) => Math.min(max, Math.max(min, v));
const easeOut = (t: number) => 1 - Math.pow(1 - t, 3);
const format = (n: number) => Math.round(n).toLocaleString('en-US');

/**
 * Scroll-linked motion driven by data attributes:
 *  data-reveal[="words|scale"]  fade/slide in once visible (adds .is-in)
 *  data-split              wrap words in .fx-w spans (needed by words reveal / highlight)
 *  data-highlight          light up words progressively while scrolling through
 *  data-count="N"          count up to N when visible
 *  data-odo="N"            odometer: each digit rolls from 0 to its value when visible
 *  data-scrub="view|pin|leave"  exposes scroll progress as --p (0..1)
 *  data-hscroll / data-hscroll-track    vertical scroll drives a horizontal track
 *  data-tilt, data-magnetic, data-spot  pointer effects
 *  data-mx-marquee         seamless infinite loop
 *
 * Elements are re-collected whenever the subtree changes, because hydration
 * may replace server-rendered nodes after the first client render.
 */
export function initScrollFx(root: HTMLElement): Cleanup {
  const disposers: Cleanup[] = [];
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const finePointer = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
  const desktop = window.matchMedia('(min-width: 992px)');

  const on = (target: EventTarget, type: string, fn: (e: any) => void, opts?: AddEventListenerOptions) => {
    target.addEventListener(type, fn, opts);
    disposers.push(() => target.removeEventListener(type, fn, opts));
  };
  const all = <T extends HTMLElement = HTMLElement>(sel: string) =>
    Array.from(root.querySelectorAll<T>(sel));

  let hdr = 0;
  const measureHeader = () => {
    hdr = document.getElementById('mainHeader')?.offsetHeight ?? 0;
    document.documentElement.style.setProperty('--hdr', hdr + 'px');
  };
  measureHeader();

  const splitWords = () => {
    all('[data-split]:not([data-split-done])').forEach((el) => {
      let index = 0;
      const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT);
      const nodes: Text[] = [];
      while (walker.nextNode()) nodes.push(walker.currentNode as Text);
      nodes.forEach((node) => {
        const frag = document.createDocumentFragment();
        (node.textContent ?? '').split(/(\s+)/).forEach((part) => {
          if (!part) return;
          if (/^\s+$/.test(part)) {
            frag.appendChild(document.createTextNode(' '));
            return;
          }
          const span = document.createElement('span');
          span.className = 'fx-w';
          span.style.setProperty('--i', String(index++));
          span.textContent = part;
          frag.appendChild(span);
        });
        node.replaceWith(frag);
      });
      el.setAttribute('data-split-done', '');
    });
  };

  const cloneMarquees = () => {
    all('[data-mx-marquee]').forEach((el) => {
      const track = el.querySelector('.mx-marquee__track');
      const group = track?.querySelector('.mx-marquee__group');
      if (!track || !group || track.children.length > 1) return;
      const clone = group.cloneNode(true) as HTMLElement;
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
    });
  };

  const buildOdo = () => {
    all('[data-odo]:not([data-odo-built])').forEach((el) => {
      const value = el.dataset['odo'] ?? '';
      el.textContent = '';
      el.setAttribute('role', 'img');
      el.setAttribute('aria-label', value);
      Array.from(value).forEach((ch, i) => {
        const cell = document.createElement('span');
        cell.setAttribute('aria-hidden', 'true');
        if (/\d/.test(ch)) {
          cell.className = 'odo__digit';
          cell.style.setProperty('--n', ch);
          cell.style.setProperty('--i', String(i));
          const strip = document.createElement('span');
          strip.className = 'odo__strip';
          for (let n = 0; n < 10; n++) {
            const num = document.createElement('span');
            num.textContent = String(n);
            strip.appendChild(num);
          }
          cell.appendChild(strip);
        } else {
          cell.className = 'odo__sep';
          cell.textContent = ch;
        }
        el.appendChild(cell);
      });
      el.setAttribute('data-odo-built', '');
    });
  };

  const countFrames = new WeakMap<HTMLElement, number>();

  const stopCount = (el: HTMLElement) => {
    const frame = countFrames.get(el);
    if (frame) cancelAnimationFrame(frame);
    countFrames.delete(el);
  };

  const runCount = (el: HTMLElement) => {
    stopCount(el);
    const to = Number(el.dataset['count']) || 0;
    const duration = Number(el.dataset['duration']) || 1400;
    const start = performance.now();
    const step = (now: number) => {
      const t = clamp((now - start) / duration);
      el.textContent = format(easeOut(t) * to);
      if (t < 1) countFrames.set(el, requestAnimationFrame(step));
      else countFrames.delete(el);
    };
    countFrames.set(el, requestAnimationFrame(step));
  };

  /* ── reveal & counters: checked by position on every scroll frame ── */
  const checkVisible = (vh: number) => {
    all('[data-reveal]:not(.is-in)').forEach((el) => {
      const r = el.getBoundingClientRect();
      if (reduce || (r.top <= vh * 0.9 && r.bottom >= 0)) el.classList.add('is-in');
    });
    all('[data-odo]:not(.is-in)').forEach((el) => {
      const r = el.getBoundingClientRect();
      if (reduce || (r.top <= vh * 0.88 && r.bottom >= 0)) el.classList.add('is-in');
    });
    all('[data-count]').forEach((el) => {
      if (reduce) {
        el.textContent = format(Number(el.dataset['count']) || 0);
        return;
      }
      const r = el.getBoundingClientRect();
      const repeat = el.hasAttribute('data-count-repeat');
      const out = r.bottom <= 0 || r.top >= vh;
      const seen = r.top <= vh * 0.82 && r.bottom >= vh * 0.12;

      if (out) {
        if (repeat && (el.hasAttribute('data-counted') || countFrames.has(el))) {
          stopCount(el);
          el.removeAttribute('data-counted');
          el.textContent = '0';
        } else if (!el.hasAttribute('data-counted') && !el.hasAttribute('data-count-armed')) {
          el.setAttribute('data-count-armed', '');
          el.textContent = '0';
        }
        return;
      }

      if (!seen || el.hasAttribute('data-counted')) return;
      el.setAttribute('data-counted', '');
      runCount(el);
    });
  };

  let scrubs: Scrub[] = [];
  let highlights: Highlight[] = [];
  let hscrolls: HScroll[] = [];

  const layoutHScroll = () => {
    hscrolls.forEach((h) => {
      if (reduce || !desktop.matches) {
        h.distance = 0;
        h.section.style.height = '';
        h.track.style.transform = '';
        return;
      }
      const viewport = h.track.parentElement!;
      const cs = getComputedStyle(viewport);
      const inner = viewport.clientWidth - parseFloat(cs.paddingLeft) - parseFloat(cs.paddingRight);
      h.distance = Math.max(0, h.track.scrollWidth - inner);
      h.section.style.height = h.distance + window.innerHeight - hdr + 'px';
    });
  };

  const bindPointer = () => {
    if (!finePointer || reduce) return;
    const fresh = (sel: string) =>
      all(sel).filter((el) => {
        if (el.hasAttribute('data-fx-bound')) return false;
        el.setAttribute('data-fx-bound', '');
        return true;
      });

    fresh('[data-tilt]').forEach((el) => {
      on(el, 'pointermove', (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        const x = (e.clientX - r.left) / r.width;
        const y = (e.clientY - r.top) / r.height;
        el.style.setProperty('--ry', ((x - 0.5) * 10).toFixed(2) + 'deg');
        el.style.setProperty('--rx', ((0.5 - y) * 8).toFixed(2) + 'deg');
        el.style.setProperty('--gx', (x * 100).toFixed(1) + '%');
        el.style.setProperty('--gy', (y * 100).toFixed(1) + '%');
        el.classList.add('is-tilting');
      });
      on(el, 'pointerleave', () => {
        el.style.setProperty('--rx', '0deg');
        el.style.setProperty('--ry', '0deg');
        el.classList.remove('is-tilting');
      });
    });

    fresh('[data-magnetic]').forEach((el) => {
      on(el, 'pointermove', (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty('--tx', ((e.clientX - (r.left + r.width / 2)) * 0.22).toFixed(1) + 'px');
        el.style.setProperty('--ty', ((e.clientY - (r.top + r.height / 2)) * 0.3).toFixed(1) + 'px');
      });
      on(el, 'pointerleave', () => {
        el.style.setProperty('--tx', '0px');
        el.style.setProperty('--ty', '0px');
      });
    });

    fresh('[data-spot]').forEach((el) => {
      on(el, 'pointermove', (e: PointerEvent) => {
        const r = el.getBoundingClientRect();
        el.style.setProperty('--mx', (e.clientX - r.left).toFixed(0) + 'px');
        el.style.setProperty('--my', (e.clientY - r.top).toFixed(0) + 'px');
      });
    });
  };

  const collect = () => {
    splitWords();
    cloneMarquees();
    buildOdo();
    scrubs = all('[data-scrub]').map((el) => ({
      el,
      mode: (el.dataset['scrub'] as Scrub['mode']) || 'view',
      p: -1,
    }));
    highlights = all('[data-highlight]').map((el) => ({
      el,
      words: Array.from(el.querySelectorAll<HTMLElement>('.fx-w')),
      lit: -1,
    }));
    hscrolls = all('[data-hscroll]')
      .map((section) => ({
        section,
        track: section.querySelector<HTMLElement>('[data-hscroll-track]')!,
        distance: 0,
      }))
      .filter((h) => h.track);
    layoutHScroll();
    bindPointer();
  };

  let ticking = false;
  let dirty = false;
  const update = () => {
    ticking = false;
    if (dirty) {
      dirty = false;
      collect();
    }
    const vh = window.innerHeight;
    checkVisible(vh);

    scrubs.forEach((s) => {
      const r = s.el.getBoundingClientRect();
      let p: number;
      if (s.mode === 'pin') p = (hdr - r.top) / Math.max(1, r.height - (vh - hdr));
      else if (s.mode === 'leave') p = (hdr - r.top) / Math.max(1, r.height);
      else p = (vh - r.top) / (vh + r.height);
      p = reduce ? 1 : clamp(p);
      if (Math.abs(p - s.p) < 0.0005) return;
      s.p = p;
      s.el.style.setProperty('--p', p.toFixed(4));
    });

    highlights.forEach((h) => {
      const r = h.el.getBoundingClientRect();
      const p = reduce ? 1 : clamp((vh * 0.85 - r.top) / (r.height + vh * 0.35));
      const lit = Math.round(p * h.words.length);
      if (lit === h.lit) return;
      h.lit = lit;
      h.words.forEach((w, i) => w.classList.toggle('is-lit', i < lit));
    });

    hscrolls.forEach((h) => {
      if (!h.distance) return;
      const r = h.section.getBoundingClientRect();
      const p = clamp((hdr - r.top) / Math.max(1, r.height - (vh - hdr)));
      const dir = getComputedStyle(h.track).direction === 'rtl' ? 1 : -1;
      h.track.style.transform = `translate3d(${dir * p * h.distance}px,0,0)`;
      h.section.style.setProperty('--p', p.toFixed(4));
    });
  };
  const requestUpdate = () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(update);
  };

  collect();
  update();

  const observer = new MutationObserver((records) => {
    const structural = records.some(
      (r) =>
        (r.addedNodes.length || r.removedNodes.length) &&
        !(r.target as Element).closest?.('[data-count], [data-odo]'),
    );
    if (structural) {
      dirty = true;
      requestUpdate();
    }
  });
  observer.observe(root, { childList: true, subtree: true });
  disposers.push(() => observer.disconnect());

  on(window, 'scroll', requestUpdate, { passive: true });
  on(window, 'resize', () => {
    measureHeader();
    layoutHScroll();
    requestUpdate();
  });
  on(window, 'load', () => {
    layoutHScroll();
    requestUpdate();
  });

  return () => disposers.forEach((dispose) => dispose());
}
