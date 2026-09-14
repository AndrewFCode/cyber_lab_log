import { getCollection, type CollectionEntry } from 'astro:content';
import type { MarkdownHeading } from 'astro';

export type WritingCollection = 'cheatsheets' | 'explainers' | 'notes';
export type SiteCollection = WritingCollection | 'projects';
export type WritingEntry = CollectionEntry<WritingCollection>;
export type ProjectEntry = CollectionEntry<'projects'>;
export type SiteEntry = WritingEntry | ProjectEntry;

export interface Neighbor {
  href: string;
  title: string;
}

/**
 * Drafts render in `astro dev` so work in progress is previewable, and are
 * dropped from production builds so they never reach the deployed site.
 */
export const showDrafts = import.meta.env.DEV;

const isPublished = ({ data }: { data: { draft: boolean } }) => showDrafts || !data.draft;

const byDateDesc = (a: Date, b: Date) => b.valueOf() - a.valueOf();

const COLLECTION_PATH: Record<SiteCollection, string> = {
  cheatsheets: '/cheatsheets',
  explainers: '/explainers',
  notes: '/notes',
  projects: '/projects',
};

export const COLLECTION_LABELS: Record<SiteCollection, string> = {
  cheatsheets: 'Cheat sheet',
  explainers: 'Explainer',
  notes: 'Note',
  projects: 'Project',
};

/** Prefix a site-root path with Astro `base` so GitHub project Pages links resolve. */
export function withBase(path: string) {
  const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
  if (path === '/') return `${base}/`;
  return `${base}/${path.replace(/^\/+/, '')}`;
}

export function entryHref(entry: SiteEntry) {
  return withBase(`${COLLECTION_PATH[entry.collection]}/${entry.id}`);
}

export function entryOgPath(collection: SiteCollection, id: string) {
  return withBase(`/og/${collection}/${id}.png`);
}

export function absoluteUrl(path: string, site: URL | string | undefined) {
  if (!site) return path;
  return new URL(path, site).href;
}

export function entryDate(entry: SiteEntry) {
  return entry.collection === 'cheatsheets' ? entry.data.updated : entry.data.pubDate;
}

/** Newest first by `updated`, with pinned sheets held at the top. */
export async function getCheatsheets() {
  const entries = await getCollection('cheatsheets', isPublished);
  return entries.sort((a, b) => {
    if (a.data.pinned !== b.data.pinned) return a.data.pinned ? -1 : 1;
    return byDateDesc(a.data.updated, b.data.updated);
  });
}

/** Newest first by `pubDate`. */
export async function getExplainers() {
  const entries = await getCollection('explainers', isPublished);
  return entries.sort((a, b) => byDateDesc(a.data.pubDate, b.data.pubDate));
}

/** Newest first by `pubDate`. */
export async function getNotes() {
  const entries = await getCollection('notes', isPublished);
  return entries.sort((a, b) => byDateDesc(a.data.pubDate, b.data.pubDate));
}

/** Newest first by `pubDate`. */
export async function getProjects() {
  const entries = await getCollection('projects', isPublished);
  return entries.sort((a, b) => byDateDesc(a.data.pubDate, b.data.pubDate));
}

export async function getWriting() {
  const [cheatsheets, explainers, notes] = await Promise.all([
    getCheatsheets(),
    getExplainers(),
    getNotes(),
  ]);
  return [...cheatsheets, ...explainers, ...notes];
}

export function neighbors<T extends { id: string; data: { title: string } }>(
  entries: T[],
  id: string,
  hrefFor: (entry: T) => string,
): { prev?: Neighbor; next?: Neighbor } {
  const index = entries.findIndex((entry) => entry.id === id);
  if (index === -1) return {};

  const prevEntry = entries[index - 1];
  const nextEntry = entries[index + 1];

  return {
    prev: prevEntry ? { href: withBase(hrefFor(prevEntry)), title: prevEntry.data.title } : undefined,
    next: nextEntry ? { href: withBase(hrefFor(nextEntry)), title: nextEntry.data.title } : undefined,
  };
}

export function tagSlug(tag: string) {
  return tag
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}

export async function getAllTags() {
  const [writing, projects] = await Promise.all([getWriting(), getProjects()]);
  const entries: SiteEntry[] = [...writing, ...projects];
  const bySlug = new Map<string, { slug: string; label: string; entries: SiteEntry[] }>();

  for (const entry of entries) {
    for (const tag of entry.data.tags) {
      const slug = tagSlug(tag);
      if (!slug) continue;
      const existing = bySlug.get(slug);
      if (existing) {
        existing.entries.push(entry);
      } else {
        bySlug.set(slug, { slug, label: tag, entries: [entry] });
      }
    }
  }

  return [...bySlug.values()]
    .map((group) => ({
      ...group,
      entries: group.entries.sort((a, b) => byDateDesc(entryDate(a), entryDate(b))),
    }))
    .sort((a, b) => a.label.localeCompare(b.label));
}

export function readingTime(body: string | undefined) {
  const words = (body ?? '').trim().split(/\s+/).filter(Boolean).length;
  const minutes = Math.max(1, Math.round(words / 200));
  return minutes === 1 ? '1 min read' : `${minutes} min read`;
}

export function tocHeadings(headings: MarkdownHeading[]) {
  return headings.filter((heading) => heading.depth === 2 || heading.depth === 3);
}

/** Explainers always get a TOC when they have headings; other entries need 3+. */
export function shouldShowToc(collection: SiteCollection, headings: MarkdownHeading[]) {
  const items = tocHeadings(headings);
  if (items.length === 0) return false;
  if (collection === 'explainers') return true;
  return items.length >= 3;
}

export function formatDate(date: Date) {
  return date.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });
}
