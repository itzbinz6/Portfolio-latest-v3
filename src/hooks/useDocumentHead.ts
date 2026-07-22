import { useEffect } from 'react';

type MetaTag = { attr: 'name' | 'property'; key: string };

const TAGS: MetaTag[] = [
  { attr: 'name', key: 'description' },
  { attr: 'property', key: 'og:title' },
  { attr: 'property', key: 'og:description' },
  { attr: 'property', key: 'og:type' },
  { attr: 'name', key: 'twitter:card' },
  { attr: 'name', key: 'twitter:title' },
  { attr: 'name', key: 'twitter:description' },
];

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.querySelector(`meta[${attr}="${key}"]`);
  const prev = el?.getAttribute('content') ?? null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
  return prev;
}

/**
 * Sets a unique <title>, meta description, and Open Graph / Twitter Card
 * tags per route. index.html ships one static set for the whole SPA, so
 * without this every route (/, /about, /work, /work/:slug, /certifications)
 * looks identical in Google results, browser tabs, and link-share previews
 * (LinkedIn, Slack, WhatsApp). Call this once per page component.
 */
export function useDocumentHead(title: string, description: string) {
  useEffect(() => {
    const prevTitle = document.title;
    document.title = title;

    const prevValues: Record<string, string | null> = {};
    prevValues.description = setMeta('name', 'description', description);
    prevValues['og:title'] = setMeta('property', 'og:title', title);
    prevValues['og:description'] = setMeta('property', 'og:description', description);
    prevValues['og:type'] = setMeta('property', 'og:type', 'website');
    prevValues['twitter:card'] = setMeta('name', 'twitter:card', 'summary');
    prevValues['twitter:title'] = setMeta('name', 'twitter:title', title);
    prevValues['twitter:description'] = setMeta('name', 'twitter:description', description);

    return () => {
      document.title = prevTitle;
      TAGS.forEach(({ attr, key }) => {
        const el = document.querySelector(`meta[${attr}="${key}"]`);
        if (el && prevValues[key] !== null && prevValues[key] !== undefined) {
          el.setAttribute('content', prevValues[key] as string);
        }
      });
    };
  }, [title, description]);
}
