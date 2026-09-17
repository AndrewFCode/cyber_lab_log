import type { APIRoute, GetStaticPaths } from 'astro';
import { COLLECTION_LABELS, getLabs, getProjects, getWriting } from '../../../lib/collections';
import { renderOgImage } from '../../../lib/og';

export const getStaticPaths = (async () => {
  const entries = [...(await getWriting()), ...(await getProjects()), ...(await getLabs())];
  return entries.map((entry) => ({
    params: { collection: entry.collection, slug: entry.id },
    props: {
      title: entry.data.title,
      label: COLLECTION_LABELS[entry.collection],
    },
  }));
}) satisfies GetStaticPaths;

export const GET: APIRoute = async ({ props }) => {
  const png = await renderOgImage(props.title, props.label);
  return new Response(png, {
    headers: {
      'Content-Type': 'image/png',
    },
  });
};
