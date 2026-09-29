// @ts-nocheck
export function initHomeMotion(): void {
  'use strict';

  /* Infinite marquee: duplicate groups for seamless loop */
  document.querySelectorAll('[data-marquee]').forEach(function (el) {
    var track = el.querySelector('.marquee__track');
    var group = track && track.querySelector('.marquee__group');
    if (track && group) {
      var clone = group.cloneNode(true);
      clone.setAttribute('aria-hidden', 'true');
      track.appendChild(clone);
    }
  });

  /* Sticky header */
  var header = document.getElementById('mainHeader');
  var heroBg = document.getElementById('heroBg');

  window.addEventListener('scroll', function () {
    var y = window.scrollY || 0;
    if (header) header.classList.toggle('scrolled', y > 40);
    if (heroBg && y < window.innerHeight) {
      heroBg.style.transform = 'scale(1) translateY(' + (y * 0.22) + 'px)';
    }
  }, { passive: true });

  /* Reveal observer */
  var revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-scale');
  if ('IntersectionObserver' in window) {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          io.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
    revealEls.forEach(function (el) { io.observe(el); });
  } else {
    revealEls.forEach(function (el) { el.classList.add('visible'); });
  }

  /* Flip clocks: restart every time the stats section re-enters the viewport */
  (function () {
    var clocks = Array.prototype.slice.call(document.querySelectorAll('.flip-clock[data-target]'));
    if (!clocks.length) return;
    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    var controllers = clocks.map(function (clock) {
      var faces = clock.querySelectorAll('.flip-digit__num');
      var digits = parseInt(clock.getAttribute('data-digits'), 10) || faces.length;
      var target = parseInt(clock.getAttribute('data-target'), 10) || 0;
      var duration = parseInt(clock.getAttribute('data-duration'), 10) || 6500;
      var raf = 0;

      function pad(n) {
        var s = String(Math.max(0, Math.round(n)));
        while (s.length < digits) s = '0' + s;
        if (s.length > digits) s = s.slice(-digits);
        return s;
      }

      function render(n, withFlip) {
        var s = pad(n);
        for (var i = 0; i < faces.length; i++) {
          if (faces[i].textContent === s[i]) continue;
          faces[i].textContent = s[i];
          if (!withFlip) continue;
          var card = faces[i].parentElement;
          card.classList.remove('is-flip');
          void card.offsetWidth;
          card.classList.add('is-flip');
        }
      }

      return {
        stop: function () {
          if (raf) cancelAnimationFrame(raf);
          raf = 0;
          render(0, false);
        },
        play: function () {
          if (raf) cancelAnimationFrame(raf);
          render(0, false);
          if (reduceMotion) {
            render(target, false);
            return;
          }
          var start = performance.now();
          var lastFlip = 0;
          function step(now) {
            var progress = Math.min((now - start) / duration, 1);
            var eased = 1 - Math.pow(1 - progress, 3);
            var flip = now - lastFlip > 70;
            if (flip) lastFlip = now;
            render(eased * target, flip);
            if (progress < 1) {
              raf = requestAnimationFrame(step);
            } else {
              render(target, true);
              raf = 0;
            }
          }
          raf = requestAnimationFrame(step);
        }
      };
    });

    function playAll() { controllers.forEach(function (c) { c.play(); }); }
    function stopAll() { controllers.forEach(function (c) { c.stop(); }); }

    var section = document.getElementById('statsSection') || clocks[0];
    if ('IntersectionObserver' in window) {
      var cio = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) playAll();
          else stopAll();
        });
      }, { threshold: 0.35 });
      cio.observe(section);
    } else {
      playAll();
    }
  })();

  /* Housing Showcase Counter — VIP design with pop animation */
  (function () {
    var counter = document.getElementById('housingCounter');
    if (!counter) return;
    var digits = counter.querySelectorAll('.housing-digit .housing-digit__num');
    var totalDigits = parseInt(counter.getAttribute('data-digits'), 10) || digits.length;
    var target = parseInt(counter.getAttribute('data-target'), 10) || 0;
    var duration = parseInt(counter.getAttribute('data-duration'), 10) || 6500;
    var raf = 0;
    var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    function pad(n) {
      var s = String(Math.max(0, Math.round(n)));
      while (s.length < totalDigits) s = '0' + s;
      if (s.length > totalDigits) s = s.slice(-totalDigits);
      return s;
    }

    function render(n, withPop) {
      var s = pad(n);
      for (var i = 0; i < digits.length; i++) {
        var nextDigit = s[i];
        if (digits[i].getAttribute('data-num') === nextDigit && digits[i].textContent === nextDigit) continue;
        digits[i].setAttribute('data-num', nextDigit);
        digits[i].textContent = nextDigit;
        if (!withPop) continue;
        var card = digits[i].parentElement;
        card.classList.remove('is-pop');
        void card.offsetWidth;
        card.classList.add('is-pop');
      }
    }

    function stop() {
      if (raf) cancelAnimationFrame(raf);
      raf = 0;
      render(0, false);
    }

    function play() {
      if (raf) cancelAnimationFrame(raf);
      render(0, false);
      if (reduceMotion) {
        render(target, false);
        return;
      }
      var start = performance.now();
      var lastPop = 0;
      function step(now) {
        var progress = Math.min((now - start) / duration, 1);
        var eased = 1 - Math.pow(1 - progress, 4);
        var pop = now - lastPop > 75;
        if (pop) lastPop = now;
        render(eased * target, pop);
        if (progress < 1) {
          raf = requestAnimationFrame(step);
        } else {
          render(target, true);
          raf = 0;
        }
      }
      raf = requestAnimationFrame(step);
    }

    if ('IntersectionObserver' in window) {
      var hio = new IntersectionObserver(function (entries) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) play();
          else stop();
        });
      }, { threshold: 0.3 });
      hio.observe(counter);
    } else {
      play();
    }
  })();

  /* Smooth anchors */
  document.querySelectorAll('a[href^="#"]').forEach(function (a) {
    a.addEventListener('click', function (e) {
      var t = document.querySelector(this.getAttribute('href'));
      if (t) {
        e.preventDefault();
        t.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

  /* Ripple on buttons */
  document.querySelectorAll('.btn-fill, .btn-ghost').forEach(function (btn) {
    btn.addEventListener('click', function (e) {
      var circle = document.createElement('span');
      var rect = btn.getBoundingClientRect();
      var size = Math.max(rect.width, rect.height);
      var x = e.clientX - rect.left - size / 2;
      var y = e.clientY - rect.top - size / 2;
      circle.style.cssText = [
        'position:absolute', 'border-radius:50%',
        'width:' + size + 'px', 'height:' + size + 'px',
        'left:' + x + 'px', 'top:' + y + 'px',
        'background:rgba(255,255,255,0.35)',
        'transform:scale(0)', 'animation:rippleBtn 0.55s linear',
        'pointer-events:none'
      ].join(';');
      btn.style.position = 'relative';
      btn.style.overflow = 'hidden';
      btn.appendChild(circle);
      circle.addEventListener('animationend', function () { circle.remove(); });
    });
  });

  /* Service card tilt */
  document.querySelectorAll('.service-card').forEach(function (card) {
    card.addEventListener('mousemove', function (e) {
      var rect = card.getBoundingClientRect();
      var x = (e.clientX - rect.left) / rect.width - 0.5;
      var y = (e.clientY - rect.top) / rect.height - 0.5;
      card.style.transform = 'translateY(-10px) rotateY(' + (x * 7) + 'deg) rotateX(' + (-y * 7) + 'deg)';
    });
    card.addEventListener('mouseleave', function () {
      card.style.transform = '';
      card.style.transition = 'transform 0.45s ease';
      setTimeout(function () { card.style.transition = ''; }, 450);
    });
  });

}
