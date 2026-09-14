import { getCollection, type CollectionEntry } from 'astro:content';

export type WritingCollection = 'cheatsheets' | 'explainers' | 'notes';
export type WritingEntry = CollectionEntry<WritingCollection>;

/**
 * Drafts render in `astro dev` so work in progress is previewable, and are
 * dropped from production builds so they never reach the deployed site.
 */
export const showDrafts = import.meta.env.DEV;

const isPublished = ({ data }: { data: { draft: boolean } }) => showDrafts || !data.draft;

const byDateDesc = (a: Date, b: Date) => b.valueOf() - a.valueOf();

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

export const COLLECTION_LABELS: Record<WritingCollection, string> = {
  cheatsheets: 'Cheat sheet',
  explainers: 'Explainer',
  notes: 'Note',
};

export function formatDate(date: Date) {
  return date.toLocaleDateString('en-GB', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    timeZone: 'UTC',
  });
}
