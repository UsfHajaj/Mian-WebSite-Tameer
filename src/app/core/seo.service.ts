import { DOCUMENT } from '@angular/common';
import { Injectable, inject } from '@angular/core';
import { Meta, Title } from '@angular/platform-browser';

export const SITE_URL = 'https://tameer-facility.com';
export const SITE_NAME = 'التعمير لإدارة المرافق';
export const DEFAULT_IMAGE = `${SITE_URL}/images/socialhousing_high.jpg`;

export interface PageSeo {
  title: string;
  description: string;
  keywords: string;
  path: string;
  image: string;
  priority: string;
  changefreq: string;
  crumb: string;
  robots?: string;
}

@Injectable({ providedIn: 'root' })
export class SeoService {
  private readonly title = inject(Title);
  private readonly meta = inject(Meta);
  private readonly doc = inject(DOCUMENT);

  apply(page: PageSeo): void {
    const url = page.path === '/' ? `${SITE_URL}/` : `${SITE_URL}${page.path}`;
    const image = page.image || DEFAULT_IMAGE;
    const robots = page.robots ?? 'index, follow, max-image-preview:large';
    const description = page.description || page.title;

    this.title.setTitle(page.title);
    this.upsertName('description', description);
    this.upsertName('author', SITE_NAME);
    this.upsertName('robots', robots);
    this.upsertName('googlebot', robots.includes('noindex') ? 'noindex, nofollow' : 'index, follow');
    this.upsertName('language', 'Arabic');
    if (page.keywords) this.upsertName('keywords', page.keywords);

    this.upsertProperty('og:type', 'website');
    this.upsertProperty('og:locale', 'ar_EG');
    this.upsertProperty('og:site_name', SITE_NAME);
    this.upsertProperty('og:title', page.title);
    this.upsertProperty('og:description', description);
    this.upsertProperty('og:url', url);
    this.upsertProperty('og:image', image);
    this.upsertProperty('og:image:alt', SITE_NAME);

    this.upsertName('twitter:card', 'summary_large_image');
    this.upsertName('twitter:title', page.title);
    this.upsertName('twitter:description', description);
    this.upsertName('twitter:image', image);

    this.setLink('canonical', 'canonical', url);
    this.setHeroPreload(page.path === '/');
    this.setJsonLd(page, url, image, description);
  }

  private upsertName(name: string, content: string): void {
    this.meta.updateTag({ name, content });
  }

  private upsertProperty(property: string, content: string): void {
    this.meta.updateTag({ property, content });
  }

  private setLink(id: string, rel: string, href: string, extra?: Record<string, string>): void {
    let link = this.doc.getElementById(id) as HTMLLinkElement | null;
    if (!link) link = this.doc.querySelector(`link[rel="${rel}"]`);
    if (!link) {
      link = this.doc.createElement('link');
      link.rel = rel;
      this.doc.head.appendChild(link);
    }
    link.id = id;
    link.rel = rel;
    link.href = href;
    if (extra) {
      for (const [key, value] of Object.entries(extra)) link.setAttribute(key, value);
    }
  }

  private setHeroPreload(enabled: boolean): void {
    const existing = this.doc.getElementById('hero-preload');
    if (!enabled) {
      existing?.remove();
      return;
    }
    this.setLink('hero-preload', 'preload', '/images/socialhousing_high.jpg', {
      as: 'image',
      fetchpriority: 'high',
    });
  }

  private setJsonLd(page: PageSeo, url: string, image: string, description: string): void {
    const crumbs = page.path === '/'
      ? [{ name: 'الرئيسية', item: `${SITE_URL}/` }]
      : [
          { name: 'الرئيسية', item: `${SITE_URL}/` },
          { name: page.crumb || page.title, item: url },
        ];

    const graph = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'Organization',
          '@id': `${SITE_URL}/#organization`,
          name: SITE_NAME,
          alternateName: ['التعمير', 'شركة التعمير', 'Al Tameer', 'Al Tameer Facility Management'],
          url: `${SITE_URL}/`,
          logo: `${SITE_URL}/images/company-logo-header.jpeg`,
          image,
          email: 'Tammer_facility@mhud.gov.eg',
          telephone: '+20228608414',
          address: {
            '@type': 'PostalAddress',
            streetAddress: 'الحي الأول، المجاورة الثالثة، عمارة 10',
            addressLocality: 'مدينة بدر',
            addressRegion: 'القاهرة',
            addressCountry: 'EG',
          },
          parentOrganization: {
            '@type': 'GovernmentOrganization',
            name: 'وزارة الإسكان والمرافق والمجتمعات العمرانية',
          },
          areaServed: { '@type': 'Country', name: 'Egypt' },
        },
        {
          '@type': 'WebSite',
          '@id': `${SITE_URL}/#website`,
          name: SITE_NAME,
          url: `${SITE_URL}/`,
          inLanguage: 'ar',
          publisher: { '@id': `${SITE_URL}/#organization` },
        },
        {
          '@type': 'WebPage',
          '@id': `${url}#webpage`,
          url,
          name: page.title,
          description,
          inLanguage: 'ar',
          isPartOf: { '@id': `${SITE_URL}/#website` },
          about: { '@id': `${SITE_URL}/#organization` },
          primaryImageOfPage: image,
        },
        {
          '@type': 'BreadcrumbList',
          itemListElement: crumbs.map((crumb, index) => ({
            '@type': 'ListItem',
            position: index + 1,
            name: crumb.name,
            item: crumb.item,
          })),
        },
      ],
    };

    let script = this.doc.getElementById('ld-json') as HTMLScriptElement | null;
    if (!script) {
      script = this.doc.createElement('script');
      script.id = 'ld-json';
      script.type = 'application/ld+json';
      this.doc.head.appendChild(script);
    }
    script.textContent = JSON.stringify(graph);
  }
}
