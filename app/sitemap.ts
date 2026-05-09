import { MetadataRoute } from 'next';

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://kcctf.org';

export default function sitemap(): MetadataRoute.Sitemap {
  const routes = ['', '/terms', '/privacy', '/refund'];
  const locales = ['', '/en'];

  const entries: MetadataRoute.Sitemap = [];

  for (const route of routes) {
    for (const locale of locales) {
      entries.push({
        url: `${BASE_URL}${locale}${route}`,
        lastModified: new Date(),
        changeFrequency: route === '' ? 'weekly' : 'monthly',
        priority: route === '' ? 1.0 : 0.5,
      });
    }
  }

  return entries;
}
