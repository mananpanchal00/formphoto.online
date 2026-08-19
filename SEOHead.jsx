import React from 'react';
import { Helmet } from 'react-helmet-async';

const BASE_URL = 'https://formphoto.in';

const SEOHead = ({
  title,
  description,
  path = '',
  keywords = '',
  type = 'website',
  faqs = null,
  noindex = false,
}) => {
  const url = `${BASE_URL}${path}`;
  const fullTitle = title.includes('FormPhoto') ? title : `${title} | FormPhoto`;
  const image = `${BASE_URL}/og-image.svg`;

  const webAppSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebApplication',
    name: 'FormPhoto',
    url: BASE_URL,
    applicationCategory: 'UtilitiesApplication',
    operatingSystem: 'Any',
    description:
      'Free online photo and signature resizer and image compressor for Indian forms, exams and applications. UPSC, SSC, IBPS, NEET, JEE, Passport and more.',
    browserRequirements: 'Requires JavaScript',
    offers: { '@type': 'Offer', price: '0', priceCurrency: 'INR' },
    featureList: [
      'Resize photos to exact pixels',
      'Resize signatures to exact pixels',
      'Compress images to a target KB size',
      'Indian exam and application presets',
      'Background remover',
      'Image to PDF converter',
      'PDF compressor',
      'Client-side private processing',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.9',
      ratingCount: '1250',
      bestRating: '5',
      worstRating: '1',
    },
  };

  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: 'FormPhoto',
    url: BASE_URL,
    logo: `${BASE_URL}/og-image.svg`,
    description: 'Free photo tools for Indian government forms and exams.',
    sameAs: [],
  };

  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    name: 'FormPhoto',
    url: BASE_URL,
    potentialAction: {
      '@type': 'SearchAction',
      target: `${BASE_URL}/photo-resizer`,
      'query-input': 'required name=search_term_string',
    },
  };

  const breadcrumbSchema = path
    ? {
        '@context': 'https://schema.org',
        '@type': 'BreadcrumbList',
        itemListElement: [
          {
            '@type': 'ListItem',
            position: 1,
            name: 'Home',
            item: BASE_URL,
          },
          {
            '@type': 'ListItem',
            position: 2,
            name: title.replace(' | FormPhoto', '').split(' - ')[0].split(' | ')[0],
            item: url,
          },
        ],
      }
    : null;

  const faqSchema =
    faqs && faqs.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'FAQPage',
          mainEntity: faqs.map((f) => ({
            '@type': 'Question',
            name: f.q,
            acceptedAnswer: {
              '@type': 'Answer',
              text: f.a,
            },
          })),
        }
      : null;

  return (
    <Helmet>
      <html lang="en" />
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      <meta
        name="robots"
        content={
          noindex
            ? 'noindex, nofollow'
            : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'
        }
      />
      <link rel="canonical" href={url} />

      {/* Open Graph */}
      <meta property="og:type" content={type} />
      <meta property="og:site_name" content="FormPhoto" />
      <meta property="og:locale" content="en_IN" />
      <meta property="og:url" content={url} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:image:alt" content="FormPhoto – Free Photo Tools for Indian Forms" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Extra SEO */}
      <meta name="author" content="FormPhoto" />
      <meta name="geo.region" content="IN" />
      <meta name="geo.placename" content="India" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="3 days" />
      <meta name="theme-color" content="#6366f1" />

      {/* Structured data */}
      <script type="application/ld+json">{JSON.stringify(webAppSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(organizationSchema)}</script>
      <script type="application/ld+json">{JSON.stringify(websiteSchema)}</script>
      {breadcrumbSchema && (
        <script type="application/ld+json">{JSON.stringify(breadcrumbSchema)}</script>
      )}
      {faqSchema && <script type="application/ld+json">{JSON.stringify(faqSchema)}</script>}
    </Helmet>
  );
};

export default SEOHead;
