
import type { MetadataRoute } from 'next'
 
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: 'https://terratinge.com',
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 1,
    },
    {
      url: 'https://terratinge.com/authentication',
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 0.8,
    },
    {
      url: 'https://terratinge.com/partnership',
      lastModified: new Date(),
      changeFrequency: 'always',
      priority: 0.8,
    },
  ]
}