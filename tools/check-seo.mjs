import fs from 'node:fs';

const root = 'dist/tameer-facility/browser';

function check(rel) {
  const html = fs.readFileSync(`${root}/${rel}`, 'utf8');
  const canonical = [...html.matchAll(/<link[^>]*rel="canonical"[^>]*>/g)].map((match) => match[0]);
  const title = (html.match(/<title>([^<]*)<\/title>/) || [])[1];
  const h1 = (html.match(/<h1[^>]*>([\s\S]*?)<\/h1>/) || [])[1]?.replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim();
  const schema = html.includes('BreadcrumbList') && html.includes('Organization');
  console.log('\n' + rel);
  console.log('title:', title);
  console.log('h1:', h1);
  console.log('canonical:', canonical.join(' | '));
  console.log('schema:', schema);
  console.log('preload:', html.includes('hero-preload'));
}

check('index.html');
check('about/index.html');
check('services/index.html');
check('careers/index.html');
check('communication-complaints/index.html');
console.log('\nhtaccess', fs.existsSync(`${root}/.htaccess`));
console.log('sitemap', fs.existsSync(`${root}/sitemap.xml`));
console.log('robots', fs.existsSync(`${root}/robots.txt`));
console.log('logo', fs.existsSync(`${root}/images/logo1-ministry.png`));
console.log('hero', fs.existsSync(`${root}/images/socialhousing_high.jpg`));
