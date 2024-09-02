// app/sitemap.xml.js
import { NextResponse } from 'next/server';

export async function GET() {
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
  <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
    <url>
      <loc>https://terratinge.com/</loc>
      <lastmod>2024-09-01</lastmod>
      <priority>1.00</priority>
    </url>
    <url>
      <loc>https://terratinge.com/login</loc>
      <lastmod>2024-09-01</lastmod>
      <priority>0.80</priority>
    </url>
    <url>
      <loc>https://terratinge.com/partner</loc>
      <lastmod>2024-09-01</lastmod>
      <priority>0.80</priority>
    </url>
  </urlset>`;

  return new NextResponse(sitemap, {
    headers: {
      'Content-Type': 'application/xml',
    },
  });
}
