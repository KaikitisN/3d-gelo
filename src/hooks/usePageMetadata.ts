import { useEffect } from 'react';
import { PageMetadata } from '../types';

export function usePageMetadata(metadata: PageMetadata) {
  useEffect(() => {
    // Set document title
    document.title = metadata.title;

    // Set meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', metadata.description);

    // Set Open Graph tags
    const ogTitle = metadata.ogTitle || metadata.title;
    const ogDescription = metadata.ogDescription || metadata.description;

    setMetaTag('og:title', ogTitle);
    setMetaTag('og:description', ogDescription);
    setMetaTag('og:type', 'website');
    
    if (metadata.ogImage) {
      setMetaTag('og:image', metadata.ogImage);
    }

    // Set Twitter Card tags
    setMetaTag('twitter:card', 'summary_large_image');
    setMetaTag('twitter:title', ogTitle);
    setMetaTag('twitter:description', ogDescription);
    
    if (metadata.ogImage) {
      setMetaTag('twitter:image', metadata.ogImage);
    }
  }, [metadata]);
}

function setMetaTag(property: string, content: string) {
  let meta = document.querySelector(`meta[property="${property}"]`);
  if (!meta) {
    meta = document.createElement('meta');
    meta.setAttribute('property', property);
    document.head.appendChild(meta);
  }
  meta.setAttribute('content', content);
}
