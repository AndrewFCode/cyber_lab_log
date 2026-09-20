import type { APIContext } from 'astro';
import rss from '@astrojs/rss';
import { entryDate, entryLabel, getWriting, withBase } from '../lib/collections';

export async function GET(context: APIContext) {
  const site = context.site;
  if (!site) {
    throw new Error('rss.xml requires `site` in astro.config.mjs');
  }

  const feedUrl = new URL(withBase('/'), site);
  const entries = await getWriting();

  return rss({
    title: 'Cyber Journey',
    description: 'Ultimate and resource cheat sheets, explainers and notes — a personal reference pile.',
    site: feedUrl,
    trailingSlash: false,
    items: entries
      .slice()
      .sort((a, b) => entryDate(b).valueOf() - entryDate(a).valueOf())
      .map((entry) => ({
        title: entry.data.title,
        description: entry.data.description ?? '',
        pubDate: entryDate(entry),
        link: `${entry.collection}/${entry.id}`,
        categories: [entryLabel(entry), ...entry.data.tags],
      })),
  });
}
