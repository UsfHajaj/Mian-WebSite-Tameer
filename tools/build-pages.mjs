import { spawnSync } from 'node:child_process';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(import.meta.dirname, '..');
const source = path.resolve(root, '..', 'deploy_ready_for_hostinger');
const appRoot = path.join(root, 'src', 'app');
const stylesDir = path.join(root, 'src', 'styles');
const publicDir = path.join(root, 'public');

const priorities = {
  index: ['1.0', 'weekly'],
  about: ['0.9', 'weekly'],
  chairman_message: ['0.9', 'weekly'],
  board: ['0.8', 'monthly'],
  services: ['0.9', 'weekly'],
  project: ['0.8', 'weekly'],
  project_social: ['0.8', 'weekly'],
  project_dar: ['0.8', 'weekly'],
  project_janna: ['0.8', 'weekly'],
  project_t_square: ['0.6', 'weekly'],
  previous_works: ['0.7', 'weekly'],
  careers: ['0.9', 'weekly'],
  certificates: ['0.7', 'weekly'],
  'communication-complaints': ['0.9', 'weekly'],
  company_goals: ['0.7', 'weekly'],
  contracting: ['0.8', 'weekly'],
  contracting_transport: ['0.8', 'weekly'],
  equipment: ['0.7', 'weekly'],
  garden_lighting_maintenance: ['0.7', 'weekly'],
  green_area_maintenance: ['0.7', 'weekly'],
  maintenance_of_electric_elevators: ['0.7', 'weekly'],
  'protocol-tameer-ahly-misr': ['1.0', 'daily'],
  road_maintenance: ['0.7', 'weekly'],
  security_and_guarding_work: ['0.7', 'weekly'],
  sewage_network_maintenance: ['0.7', 'weekly'],
  administrative_building_cleaning: ['0.7', 'weekly'],
  building_cleaning_work: ['0.7', 'weekly'],
  building_facilities_maintenance: ['0.7', 'weekly'],
  real_estate_development: ['0.7', 'weekly'],
};

const skip = new Set(['general_cleaning_roads.html', 'road_cleaning_maintenance.html']);

function kebab(slug) {
  return slug.replace(/_/g, '-');
}

function className(slug) {
  return `${slug.split(/[_-]/).map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join('')}Component`;
}

function fixCssUrls(css) {
  return css
    .replace(/url\((['"]?)\.\.\/images\//g, 'url($1/images/')
    .replace(/url\((['"]?)images\//g, 'url($1/images/');
}

function metaByName(html, name) {
  const tags = html.match(/<meta\b[^>]*>/gi) || [];
  for (const tag of tags) {
    const found = tag.match(/\bname=["']([^"']+)["']/i);
    if (!found || found[1].toLowerCase() !== name.toLowerCase()) continue;
    const content = tag.match(/\bcontent=["']([^"']*)["']/i);
    if (content) return content[1].trim();
  }
  return '';
}

function extractMain(html, file) {
  const headerEnd = html.search(/<\/header>/i);
  const footerAt = html.search(/<footer\b/i);
  if (headerEnd < 0 || footerAt < 0 || footerAt < headerEnd) {
    throw new Error(`Could not split layout in ${file}`);
  }
  return html.slice(headerEnd + '</header>'.length, footerAt).trim();
}

function rewriteLinks(html) {
  return html.replace(/\shref\s*=\s*(["'])(.*?)\1/gi, (full, _quote, href) => {
    if (/^(https?:|mailto:|tel:|#|\/\/)/i.test(href)) return full;
    const hashAt = href.indexOf('#');
    const filePath = hashAt >= 0 ? href.slice(0, hashAt) : href;
    const hash = hashAt >= 0 ? href.slice(hashAt + 1) : '';
    if (filePath && !filePath.endsWith('.html')) return full;
    let slug = 'index';
    if (filePath && filePath !== 'index.html') {
      slug = filePath.replace(/^\.\//, '').replace(/\.html$/i, '');
      if (slug === 'general_cleaning_roads' || slug === 'road_cleaning_maintenance') slug = 'road_maintenance';
    }
    const route = slug === 'index' ? '/' : `/${slug}`;
    const fragment = hash ? ` fragment="${hash}"` : '';
    return ` routerLink="${route}"${fragment}`;
  });
}

function absoluteAssets(html) {
  return html.replace(/(\s(?:src|poster)\s*=\s*(["']))(?!(?:https?:|\/\/|data:|\/))([^"']+)\2/gi, '$1/$3$2');
}

function specialize(slug, html) {
  if (slug === 'communication-complaints') {
    return html
      .replace(/onclick="showService\('contact'\)"/g, `(click)="showService('contact')"`)
      .replace(/onclick="showService\('complaint'\)"/g, `(click)="showService('complaint')"`)
      .replace(/onkeydown="[^"]*showService\('contact'\)[^"]*"/g, `(keydown.enter)="showService('contact')" (keydown.space)="showService('contact'); $event.preventDefault()"`)
      .replace(/onkeydown="[^"]*showService\('complaint'\)[^"]*"/g, `(keydown.enter)="showService('complaint')" (keydown.space)="showService('complaint'); $event.preventDefault()"`)
      .replace(/onclick="resetService\(\)"/g, `(click)="resetService()"`)
      .replace('<form id="contactForm"', '<form id="contactForm" (submit)="submitContact($event)"');
  }
  if (slug === 'careers') {
    return html.replace('onsubmit="return false"', '(submit)="$event.preventDefault()"');
  }
  return html;
}

function plainText(value) {
  return value.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').trim();
}

function copyImages() {
  const from = path.join(source, 'images');
  const to = path.join(publicDir, 'images');
  fs.mkdirSync(to, { recursive: true });
  const result = spawnSync('robocopy', [from, to, '/E', '/NFL', '/NDL', '/NJH', '/NJS', '/nc', '/ns', '/np'], { stdio: 'inherit' });
  if ((result.status ?? 1) > 7) throw new Error('Failed to copy images');
  fs.copyFileSync(path.join(source, 'favicon.ico'), path.join(publicDir, 'favicon.ico'));
}

function copyStyles() {
  fs.mkdirSync(stylesDir, { recursive: true });
  for (const file of ['style.css', 'inner-pages.css', 'equipment.css', 'fixes.css', 'advanced-fixes.css', 'placeholder.css']) {
    const css = fixCssUrls(fs.readFileSync(path.join(source, 'css', file), 'utf8'));
    const dest = file === 'style.css' ? 'site.css' : file;
    fs.writeFileSync(path.join(stylesDir, dest), css);
  }
  const homeHtml = fs.readFileSync(path.join(source, 'index.html'), 'utf8');
  const start = homeHtml.indexOf('<style>');
  const end = homeHtml.indexOf('</style>');
  const homeCss = fixCssUrls(homeHtml.slice(start + '<style>'.length, end).trim());
  const homeDir = path.join(appRoot, 'pages', 'home');
  fs.mkdirSync(homeDir, { recursive: true });
  fs.writeFileSync(path.join(homeDir, 'home.css'), homeCss);

  const scriptStart = homeHtml.indexOf("/* Infinite marquee");
  const scriptEnd = homeHtml.lastIndexOf('})();');
  const motion = homeHtml.slice(homeHtml.lastIndexOf('(function () {', scriptStart) + '(function () {'.length, scriptEnd);
  fs.writeFileSync(path.join(homeDir, 'home.motion.ts'), `// @ts-nocheck\nexport function initHomeMotion(): void {${motion}\n}\n`);
}

function writeOrgChart() {
  const raw = fs.readFileSync(path.join(source, 'js', 'org-chart.js'), 'utf8')
    .replace(/^\(function \(\) \{\r?\n/, '')
    .replace(/\}\)\(\);\s*$/, '')
    .replace(
      "window.addEventListener('resize', showEntireChart);",
      `window.addEventListener('resize', showEntireChart);
  return function () {
    window.removeEventListener('resize', showEntireChart);
    window.removeEventListener('load', showEntireChart);
  };`,
    );
  const file = `// @ts-nocheck
function loadScript(src) {
  return new Promise((resolve, reject) => {
    const found = document.querySelector('script[src="' + src + '"]');
    if (found && found.dataset.loaded === '1') { resolve(); return; }
    const script = found || document.createElement('script');
    script.src = src;
    script.onload = () => { script.dataset.loaded = '1'; resolve(); };
    script.onerror = () => reject(new Error(src));
    if (!found) document.head.appendChild(script);
  });
}

export async function mountOrgChart() {
  await loadScript('https://cdn.jsdelivr.net/npm/d3@7/dist/d3.min.js');
  await loadScript('https://cdn.jsdelivr.net/npm/d3-flextree@2.1.2/build/d3-flextree.js');
  await loadScript('https://cdn.jsdelivr.net/npm/d3-org-chart@3/build/d3-org-chart.min.js');
  return initOrgChart();
}

function initOrgChart() {
${raw}}
`;
  fs.mkdirSync(path.join(appRoot, 'pages', 'about'), { recursive: true });
  fs.writeFileSync(path.join(appRoot, 'pages', 'about', 'org-chart.ts'), file);
}

function componentSource(page) {
  const isHome = page.slug === 'index';
  const needsRender = isHome || page.slug === 'about' || page.slug === 'careers';
  const angularImports = ['Component', 'inject'];
  if (isHome) angularImports.splice(1, 0, 'ViewEncapsulation');
  if (needsRender) angularImports.splice(1, 0, 'afterNextRender');
  const imports = [`import { ${angularImports.join(', ')} } from '@angular/core';`];
  const extraImports = [];
  if (page.routerLink) extraImports.push("import { RouterLink } from '@angular/router';");
  extraImports.push("import { SeoService } from '../../core/seo.service';");
  if (isHome) extraImports.push("import { initHomeMotion } from './home.motion';");
  if (page.slug === 'about') extraImports.push("import { mountOrgChart } from './org-chart';");
  if (page.slug === 'careers') extraImports.push("import { initCareers } from './careers.motion';");

  const decorator = [
    '@Component({',
    `  selector: 'app-${page.selector}',`,
    `  imports: [${page.routerLink ? 'RouterLink' : ''}],`,
    `  templateUrl: './${page.file}.component.html',`,
  ];
  if (isHome) {
    decorator.push('  encapsulation: ViewEncapsulation.None,');
    decorator.push("  styleUrl: './home.css',");
  }
  decorator.push('})');

  let hooks = '';
  if (isHome) hooks = '\n    afterNextRender(() => initHomeMotion());';
  if (page.slug === 'about') {
    hooks = '\n    afterNextRender(() => { void mountOrgChart().then((stop) => { this.stopChart = typeof stop === \'function\' ? stop : undefined; }); });';
  }
  if (page.slug === 'careers') hooks = '\n    afterNextRender(() => initCareers());';

  let fields = '';
  if (page.slug === 'about') fields = '\n  private stopChart?: () => void;\n';

  let methods = '';
  if (page.slug === 'communication-complaints') methods = contactMethods();

  const destroy = page.slug === 'about'
    ? '\n\n  ngOnDestroy(): void {\n    this.stopChart?.();\n  }\n'
    : '\n';

  return `${imports.join('\n')}\n${extraImports.join('\n')}\n\n${decorator.join('\n')}\nexport class ${page.className} {${fields}
  private readonly seo = inject(SeoService);

  constructor() {
    this.seo.apply(${JSON.stringify(page.seo, null, 2)});${hooks}
  }${methods}${destroy}}
`;
}

function contactMethods() {
  return `
  showService(type: 'contact' | 'complaint'): void {
    document.getElementById('service-selection')?.classList.add('d-none');
    document.getElementById('contact-service')?.classList.add('d-none');
    document.getElementById('complaint-service')?.classList.add('d-none');
    document.getElementById(type === 'contact' ? 'contact-service' : 'complaint-service')?.classList.remove('d-none');
    const pad = document.querySelector('.content-pad');
    if (pad instanceof HTMLElement) {
      window.scrollTo({ top: pad.offsetTop - 80, behavior: 'smooth' });
    }
  }

  resetService(): void {
    document.getElementById('service-selection')?.classList.remove('d-none');
    document.getElementById('contact-service')?.classList.add('d-none');
    document.getElementById('complaint-service')?.classList.add('d-none');
  }

  submitContact(event: Event): void {
    event.preventDefault();
    const form = event.target;
    if (!(form instanceof HTMLFormElement)) return;
    const button = form.querySelector('[type="submit"]');
    if (!(button instanceof HTMLButtonElement)) return;
    const idle = button.innerHTML;
    button.disabled = true;
    button.innerHTML = '<i class="bi bi-hourglass-split me-2"></i>جارٍ الإرسال...';
    fetch('/', { method: 'POST', body: new FormData(form) })
      .then(() => {
        window.alert('تم إرسال رسالتك بنجاح. سنتواصل معك في أقرب وقت.');
        form.reset();
        this.resetService();
      })
      .catch(() => {
        window.alert('حدث خطأ في الإرسال. يرجى التواصل عبر البريد الإلكتروني للشركة.');
      })
      .finally(() => {
        button.disabled = false;
        button.innerHTML = idle;
      });
  }
`;
}

function writeRoutes(pages) {
  const home = pages.find((page) => page.slug === 'index');
  const rest = pages.filter((page) => page.slug !== 'index');
  const redirects = [
    "  { path: 'general_cleaning_roads', redirectTo: 'road_maintenance', pathMatch: 'full' },",
    "  { path: 'general_cleaning_roads.html', redirectTo: 'road_maintenance', pathMatch: 'full' },",
    "  { path: 'road_cleaning_maintenance', redirectTo: 'road_maintenance', pathMatch: 'full' },",
    "  { path: 'road_cleaning_maintenance.html', redirectTo: 'road_maintenance', pathMatch: 'full' },",
    ...rest.map((page) => `  { path: '${page.slug}.html', redirectTo: '${page.slug}', pathMatch: 'full' },`),
  ];
  const children = rest.map((page) => `      { path: '${page.slug}', loadComponent: () => import('./pages/${page.folder}/${page.file}.component').then((m) => m.${page.className}) },`);
  const sourceText = `import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home.component').then((m) => m.${home.className}), pathMatch: 'full' },
${redirects.join('\n')}
  {
    path: '',
    loadComponent: () => import('./layout/inner-layout.component').then((m) => m.InnerLayoutComponent),
    children: [
${children.join('\n')}
      { path: '**', loadComponent: () => import('./pages/not-found/not-found.component').then((m) => m.NotFoundComponent) },
    ],
  },
];
`;
  fs.writeFileSync(path.join(appRoot, 'app.routes.ts'), sourceText);
}

function writeSitemap(pages) {
  const today = '2026-09-29';
  const urls = pages.map((page) => {
    const loc = page.seo.path === '/' ? 'https://tameer-facility.com/' : `https://tameer-facility.com${page.seo.path}`;
    return `  <url>\n    <loc>${loc}</loc>\n    <lastmod>${today}</lastmod>\n    <changefreq>${page.seo.changefreq}</changefreq>\n    <priority>${page.seo.priority}</priority>\n  </url>`;
  }).join('\n');
  fs.writeFileSync(path.join(publicDir, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`);
  fs.writeFileSync(path.join(publicDir, 'robots.txt'), `User-agent: *\nAllow: /\n\nUser-agent: Googlebot\nAllow: /\n\nSitemap: https://tameer-facility.com/sitemap.xml\nHost: https://tameer-facility.com\n`);
}

function buildPages() {
  const files = fs.readdirSync(source).filter((file) => file.endsWith('.html') && !skip.has(file));
  const pages = files.map((file) => {
    const html = fs.readFileSync(path.join(source, file), 'utf8');
    const slug = file === 'index.html' ? 'index' : file.replace(/\.html$/, '');
    const folder = slug === 'index' ? 'home' : kebab(slug);
    const fileBase = folder;
    let body = specialize(slug, extractMain(html, file));
    body = absoluteAssets(rewriteLinks(body)).replace(/@/g, '&#64;');
    if (body.includes('{{')) throw new Error(`Template braces in ${file}`);
    const h1 = plainText((body.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i) || [])[1] || '');
    const [priority, changefreq] = priorities[slug] || ['0.6', 'monthly'];
    const title = (html.match(/<title>([^<]*)<\/title>/i) || [])[1]?.trim() || 'التعمير لإدارة المرافق';
    const description = metaByName(html, 'description') || title;
    const page = {
      slug,
      folder,
      file: fileBase,
      selector: fileBase,
      className: slug === 'index' ? 'HomeComponent' : className(slug),
      routerLink: body.includes('routerLink'),
      seo: {
        title,
        description,
        keywords: metaByName(html, 'keywords'),
        path: slug === 'index' ? '/' : `/${slug}`,
        image: 'https://tameer-facility.com/images/socialhousing_high.jpg',
        priority,
        changefreq,
        crumb: slug === 'index' ? 'الرئيسية' : (h1 || title),
        robots: 'index, follow, max-image-preview:large',
      },
    };
    const dir = path.join(appRoot, 'pages', folder);
    fs.mkdirSync(dir, { recursive: true });
    fs.writeFileSync(path.join(dir, `${fileBase}.component.html`), `${body}\n`);
    fs.writeFileSync(path.join(dir, `${fileBase}.component.ts`), componentSource(page));
    const leftover = [...body.matchAll(/\shref="([^"]+)"/g)].map((match) => match[1]).filter((href) => !/^(https?:|#|mailto:|tel:|\/\/)/.test(href));
    if (leftover.length) console.log(file, leftover);
    return page;
  });
  writeRoutes(pages);
  writeSitemap(pages);
  console.log(`Generated ${pages.length} pages`);
}

copyImages();
copyStyles();
writeOrgChart();
buildPages();
