import { getCollection, type CollectionEntry } from 'astro:content';
import type { MarkdownHeading } from 'astro';

export type WritingCollection = 'cheatsheets' | 'explainers' | 'notes';
export type SiteCollection = WritingCollection | 'projects' | 'labs';
export type WritingEntry = CollectionEntry<WritingCollection>;
export type ProjectEntry = CollectionEntry<'projects'>;
export type LabEntry = CollectionEntry<'labs'>;
export type CheatsheetEntry = CollectionEntry<'cheatsheets'>;
export type SiteEntry = WritingEntry | ProjectEntry | LabEntry;

export const LAB_SERIES_LABELS = {
  powershell: 'Learn Windows PowerShell',
  linux: 'The Linux Command Line',
} as const;

/** Preferred tab order on Resource Cheatsheets. Unknown keys sort after these. */
export const RESOURCE_ORDER = [
  'code',
  'tcm-help-desk',
  'tryhackme',
  'a-plus-core-1',
  'linux',
  'powershell',
  'networking-sysadmins',
];

/** Display names for resource tab keys stored in frontmatter. */
export const RESOURCE_LABELS: Record<string, string> = {
  code: 'Code (2nd ed.)',
  'tcm-help-desk': 'Help Desk',
  tryhackme: 'TryHackMe',
  'a-plus-core-1': 'A+ Core 1',
  linux: 'The Linux Command Line',
  powershell: 'Learn Windows PowerShell',
  'networking-sysadmins': 'Networking for Sysadmins',
};

export function resourceLabel(resource: string) {
  return RESOURCE_LABELS[resource] ?? resource;
}

export interface Neighbor {
  href: string;
  title: string;
}

export interface ResourceGroup {
  resource: string;
  slug: string;
  entries: CheatsheetEntry[];
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
  projects: '/example-projects',
  labs: '/full-picture',
};

export const COLLECTION_LABELS: Record<SiteCollection, string> = {
  cheatsheets: 'Cheat sheet',
  explainers: 'Explainer',
  notes: 'Lesson Note',
  projects: 'Example Project',
  labs: 'Full Picture',
};

/** Prefix a site-root path with Astro `base` so GitHub project Pages links resolve. */
export function withBase(path: string) {
  const base = import.meta.env.BASE_URL.replace(/\/+$/, '');
  if (path === '/') return `${base}/`;
  return `${base}/${path.replace(/^\/+/, '')}`;
}

export function resourceSlug(resource: string) {
  return tagSlug(resource);
}

export function sheetUnit(entry: CheatsheetEntry) {
  return typeof entry.data.unit === 'number' ? entry.data.unit : undefined;
}

/** Canonical unique URL. Unit hubs (one sheet per unit) also exist without `id`. */
export function cheatsheetPath(entry: CheatsheetEntry) {
  if (entry.data.kind === 'ultimate') return '/cheatsheets';
  const resource = resourceSlug(entry.data.resource ?? entry.data.category ?? 'uncategorised');
  const unit = sheetUnit(entry);
  if (unit != null) return `/resources/${resource}/${unit}/${entry.id}`;
  return `/resources/${resource}/${entry.id}`;
}

/** Prefers `/resources/{key}/{unit}` when that unit has a single sheet. */
export function resourceSheetPath(entry: CheatsheetEntry, group: ResourceGroup) {
  const unit = sheetUnit(entry);
  if (unit == null) return `/resources/${group.slug}/${entry.id}`;
  const sameUnit = group.entries.filter((item) => sheetUnit(item) === unit);
  if (sameUnit.length <= 1) return `/resources/${group.slug}/${unit}`;
  return `/resources/${group.slug}/${unit}/${entry.id}`;
}

export function cheatsheetHref(entry: CheatsheetEntry) {
  return withBase(cheatsheetPath(entry));
}

export function entryHref(entry: SiteEntry) {
  if (entry.collection === 'cheatsheets') return cheatsheetHref(entry);
  return withBase(`${COLLECTION_PATH[entry.collection]}/${entry.id}`);
}

export function entryLabel(entry: SiteEntry) {
  if (entry.collection === 'cheatsheets') {
    return entry.data.kind === 'ultimate' ? 'Ultimate Cheatsheet' : 'Resource Cheatsheet';
  }
  return COLLECTION_LABELS[entry.collection];
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

export async function getResourceCheatsheets() {
  const entries = await getCheatsheets();
  return entries.filter((entry) => entry.data.kind !== 'ultimate');
}

export async function getUltimateCheatsheet() {
  const entries = await getCheatsheets();
  return entries.find((entry) => entry.data.kind === 'ultimate');
}

export function groupResourceCheatsheets(entries: CheatsheetEntry[]): ResourceGroup[] {
  const groups = new Map<string, CheatsheetEntry[]>();

  for (const entry of entries) {
    const key = entry.data.resource?.trim() || 'Uncategorised';
    const group = groups.get(key);
    if (group) group.push(entry);
    else groups.set(key, [entry]);
  }

  const orderIndex = (name: string) => {
    const index = RESOURCE_ORDER.indexOf(name);
    return index === -1 ? RESOURCE_ORDER.length : index;
  };

  return [...groups.entries()]
    .sort((a, b) => {
      const byPreferred = orderIndex(a[0]) - orderIndex(b[0]);
      return byPreferred !== 0 ? byPreferred : a[0].localeCompare(b[0]);
    })
    .map(([key, sheets]) => ({
      resource: resourceLabel(key),
      slug: resourceSlug(key),
      entries: sheets.slice().sort((a, b) => {
        const order = (a.data.moduleOrder ?? 0) - (b.data.moduleOrder ?? 0);
        return order !== 0 ? order : a.data.title.localeCompare(b.data.title);
      }),
    }));
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

/** Newest first by `pubDate`. Code-only book examples live here. */
export async function getProjects() {
  const entries = await getCollection('projects', isPublished);
  return entries.sort((a, b) => byDateDesc(a.data.pubDate, b.data.pubDate));
}

/** Newest first by `pubDate`. Screenshot walkthroughs that link to example projects. */
export async function getLabs() {
  const entries = await getCollection('labs', isPublished);
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
  const [writing, projects, labs] = await Promise.all([
    getWriting(),
    getProjects(),
    getLabs(),
  ]);
  const entries: SiteEntry[] = [...writing, ...projects, ...labs];
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
