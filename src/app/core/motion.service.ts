import { isPlatformBrowser } from '@angular/common';
import { Injectable, PLATFORM_ID, afterNextRender, inject } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { filter } from 'rxjs';

const REVEAL_SELECTOR = '.reveal:not(.visible), .reveal-left:not(.visible), .reveal-right:not(.visible), .reveal-scale:not(.visible)';

@Injectable({ providedIn: 'root' })
export class MotionService {
  private observer?: IntersectionObserver;
  private scheduled = false;

  constructor() {
    if (!isPlatformBrowser(inject(PLATFORM_ID))) return;

    afterNextRender(() => this.watch());
    inject(Router).events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe(() => {
      this.schedule();
    });
  }

  private watch(): void {
    this.schedule();
    const mutations = new MutationObserver(() => this.schedule());
    mutations.observe(document.body, { childList: true, subtree: true });
    window.addEventListener('load', () => this.schedule(), { once: true });
  }

  private schedule(): void {
    if (this.scheduled) return;
    this.scheduled = true;
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        this.scheduled = false;
        this.observe();
      });
    });
  }

  private observe(): void {
    const nodes = document.querySelectorAll<HTMLElement>(REVEAL_SELECTOR);
    if (!nodes.length) return;

    if (!('IntersectionObserver' in window)) {
      nodes.forEach((node) => node.classList.add('visible'));
      return;
    }

    this.observer ??= new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add('visible');
        this.observer?.unobserve(entry.target);
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -24px 0px' });

    nodes.forEach((node) => {
      const box = node.getBoundingClientRect();
      const onScreen = box.width > 0 && box.bottom > 0 && box.top < window.innerHeight;
      if (onScreen) {
        node.classList.add('visible');
        return;
      }
      this.observer?.observe(node);
    });
  }
}
