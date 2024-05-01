import { MetadataRoute } from 'next';

// https://nextjs.org/docs/app/api-reference/file-conventions/metadata/robots#generate-a-robots-file
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: '/private/',
    },
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL}/sitemap.xml`,
  };
}
