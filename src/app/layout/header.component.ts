import { Component, HostListener, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive } from '@angular/router';
import { filter } from 'rxjs';
import { aboutLinks, aboutPaths, projectLinks, projectPaths, serviceLinks, servicePaths } from '../core/site-nav';

@Component({
  selector: 'app-header',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './header.component.html',
})
export class HeaderComponent {
  private readonly router = inject(Router);

  readonly aboutLinks = aboutLinks;
  readonly serviceLinks = serviceLinks;
  readonly projectLinks = projectLinks;
  readonly menuOpen = signal(false);
  readonly openMenu = signal<string | null>(null);
  readonly url = signal(this.clean(this.router.url));

  constructor() {
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event) => {
      this.url.set(this.clean(event.urlAfterRedirects));
      this.menuOpen.set(false);
      this.openMenu.set(null);
    });
  }

  toggleMenu(): void {
    this.menuOpen.update((open) => !open);
  }

  onDropdown(event: Event, id: string): void {
    if (this.isDesktop()) {
      this.openMenu.set(null);
      return;
    }
    event.preventDefault();
    event.stopPropagation();
    this.openMenu.update((current) => (current === id ? null : id));
  }

  groupActive(paths: string[]): boolean {
    return paths.includes(this.url());
  }

  @HostListener('document:click', ['$event'])
  closeFromOutside(event: Event): void {
    const target = event.target as HTMLElement | null;
    if (!target?.closest('.navbar .dropdown')) this.openMenu.set(null);
  }

  @HostListener('document:keydown.escape')
  closeMenus(): void {
    this.openMenu.set(null);
  }

  @HostListener('window:scroll')
  onScroll(): void {
    document.getElementById('mainHeader')?.classList.toggle('scrolled', window.scrollY > 30);
  }

  private isDesktop(): boolean {
    return window.matchMedia('(min-width: 992px)').matches;
  }

  private clean(url: string): string {
    return url.split('?')[0].split('#')[0] || '/';
  }

  readonly aboutPaths = aboutPaths;
  readonly servicePaths = servicePaths;
  readonly projectPaths = projectPaths;
}
