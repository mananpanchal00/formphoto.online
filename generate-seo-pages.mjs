import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { APPLICATIONS } from '../src/data/applicationRequirements.js';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const dist = path.join(root, 'dist');
const base = 'https://formphoto.in';

const pages = [
  ['/', 'Free Photo & Signature Resizer for Indian Forms | UPSC SSC NEET', 'Free online photo resizer, signature resizer and image compressor for Indian forms and exams. Exact UPSC, SSC, IBPS, NEET, JEE and Passport sizes. Private browser processing.', 'weekly', '1.0'],
  ['/photo-resizer', 'Photo Resizer for UPSC SSC IBPS NEET – Exact Pixel Size Free | FormPhoto', 'Resize photos to exact pixel dimensions for Indian forms, exams and applications. Use presets or custom dimensions with private browser processing.', 'weekly', '0.95'],
  ['/signature-resizer', 'Signature Resizer Online Free – SSC IBPS UPSC Forms | FormPhoto', 'Resize signatures to exact dimensions and file-size limits for Indian exam, banking and government application forms.', 'weekly', '0.95'],
  ['/compress', 'Compress Photo to 20KB, 50KB, 100KB Online Free | FormPhoto', 'Compress JPG and PNG photos to a target KB size for SSC, UPSC, IBPS, NEET and other application forms.', 'weekly', '0.95'],
  ['/background-remover', 'Background Remover Online Free – Transparent PNG | FormPhoto', 'Remove photo and signature backgrounds in your browser and create a transparent PNG without uploading your files.', 'weekly', '0.9'],
  ['/image-to-pdf', 'JPG PNG to PDF Converter Online Free | FormPhoto', 'Convert one or multiple JPG or PNG images into a PDF directly in your browser.', 'weekly', '0.9'],
  ['/pdf-compress', 'Compress PDF Online Free – Reduce PDF File Size | FormPhoto', 'Reduce PDF file size in your browser for easier email and application uploads.', 'weekly', '0.9'],
  ['/exam-requirements', 'Indian Exam Photo & Signature Size Requirements – UPSC SSC NEET JEE | FormPhoto', 'Browse photo and signature dimensions, formats and file-size requirements for major Indian exams and applications.', 'weekly', '0.95'],
  ['/application-checker', 'Application Photo & Signature Upload Checker | FormPhoto', 'Check application photos and signatures against listed dimensions, formats and file-size limits before submitting.', 'weekly', '0.95'],
  ['/about', 'About FormPhoto – Free Photo Tools for Indian Forms', 'Learn about FormPhoto and its browser-based photo, signature and document tools.', 'monthly', '0.6'],
  ['/contact', 'Contact FormPhoto', 'Contact FormPhoto about tools, requirements, privacy or technical questions.', 'monthly', '0.5'],
  ['/privacy', 'Privacy Policy | FormPhoto', 'Read the FormPhoto privacy policy and learn how browser-based processing handles your files.', 'monthly', '0.4'],
  ['/terms', 'Terms of Service | FormPhoto', 'Read the terms governing use of FormPhoto online tools.', 'monthly', '0.4'],
];

for (const app of APPLICATIONS) {
  pages.push([
    `/application/${app.id}-photo-signature-checker`,
    `${app.name} Photo & Signature Upload Checker | FormPhoto`,
    `Check ${app.name} photo and signature files against the listed dimensions, formats and file-size requirements. Verify current official instructions before submitting.`,
    'monthly',
    '0.85',
  ]);
}

const esc = (v) => v.replace(/&/g,'&amp;').replace(/</g,'&lt;').replace(/>/g,'&gt;').replace(/"/g,'&quot;');
const today = new Date().toISOString().slice(0,10);

const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${pages.map(([url,,,freq,priority]) => `  <url>
    <loc>${base}${url}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${freq}</changefreq>
    <priority>${priority}</priority>
  </url>`).join('\n')}
</urlset>
`;
fs.writeFileSync(path.join(dist, 'sitemap.xml'), sitemap);

const source = fs.readFileSync(path.join(dist, 'index.html'), 'utf8');
const scriptSrc = source.match(/<script type="module" crossorigin src="([^"]+)"><\/script>/)?.[1] || source.match(/<script type="module" src="([^"]+)"><\/script>/)?.[1];

const pageHtml = ([url,title,description]) => {
  const canonical = `${base}${url}`;
  const image = `${base}/og-image.svg`;
  const breadcrumb = url === '/' ? '' : `<script type="application/ld+json">${JSON.stringify({
    '@context':'https://schema.org','@type':'BreadcrumbList',
    itemListElement:[{'@type':'ListItem',position:1,name:'Home',item:`${base}/`},{'@type':'ListItem',position:2,name:title.split(' | ')[0],item:canonical}]
  })}</script>`;
  const appSchema = JSON.stringify({
    '@context':'https://schema.org','@type':'WebPage','name':title,'url':canonical,
    'description':description,'isPartOf':{'@type':'WebSite','name':'FormPhoto','url':base},
    'inLanguage':'en-IN'
  });
  const visible = `<main><h1>${esc(title.split(' | ')[0])}</h1><p>${esc(description)}</p><p>FormPhoto provides free browser-based photo, signature and document tools for Indian forms and applications. Files are processed locally in your browser.</p><nav><a href="/">Home</a> <a href="/photo-resizer">Photo Resizer</a> <a href="/signature-resizer">Signature Resizer</a> <a href="/compress">Compress Photo</a> <a href="/exam-requirements">Exam Requirements</a> <a href="/application-checker">Application Checker</a></nav></main>`;
  return `<!doctype html><html lang="en-IN"><head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover"><title>${esc(title)}</title><meta name="description" content="${esc(description)}"><meta name="robots" content="index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1"><link rel="canonical" href="${canonical}"><meta property="og:type" content="website"><meta property="og:site_name" content="FormPhoto"><meta property="og:locale" content="en_IN"><meta property="og:url" content="${canonical}"><meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(description)}"><meta property="og:image" content="${image}"><meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(title)}"><meta name="twitter:description" content="${esc(description)}"><meta name="twitter:image" content="${image}"><link rel="icon" href="/favicon.svg" type="image/svg+xml"><script type="application/ld+json">${appSchema}</script>${breadcrumb}</head><body><div id="root">${visible}</div><noscript><p>JavaScript is required to use FormPhoto's interactive image tools. The page content above remains available for search engines and users with JavaScript disabled.</p></noscript><script type="module" crossorigin src="${scriptSrc}"></script></body></html>`;
};

for (const page of pages) {
  if (page[0] === '/') continue;
  const dir = path.join(dist, page[0].replace(/^\/|\/$/g, ''));
  fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(path.join(dir, 'index.html'), pageHtml(page));
}
