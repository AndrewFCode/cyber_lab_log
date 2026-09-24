import { getNotes } from '../../lib/collections';
import { buildOneNoteZip } from '../../lib/onenote-export';

export const prerender = true;

export async function GET() {
  const notes = await getNotes();
  const zip = buildOneNoteZip(
    notes.map((note) => ({
      id: note.id,
      title: note.data.title,
      description: note.data.description,
      tags: note.data.tags,
      pubDate: note.data.pubDate,
      body: note.body,
    })),
  );

  return new Response(zip, {
    headers: {
      'Content-Type': 'application/zip',
      'Content-Disposition': 'attachment; filename="lesson-notes-onenote.zip"',
    },
  });
}
