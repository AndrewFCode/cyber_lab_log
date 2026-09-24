import { strToU8, zipSync } from 'fflate';
import { marked } from 'marked';
import { resourceLabel } from './collections';
import { OTHER_COURSE, compareNotes, courseRank, noteCourse } from './notes-browse';

const SITE_ORIGIN = 'https://andrewfcode.github.io';

export interface OneNoteSource {
  id: string;
  title: string;
  description?: string;
  tags: string[];
  pubDate: Date;
  body?: string;
}

function escapeHtml(value: string) {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

function courseLabel(key: string) {
  return key === OTHER_COURSE ? 'Other' : resourceLabel(key);
}

function safeName(value: string) {
  const cleaned = value
    .replace(/[\\/:*?"<>|]/g, '-')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/[. ]+$/g, '');
  return cleaned || 'note';
}

function absoluteLinks(markdown: string) {
  return markdown.replace(/\]\((\/[^)\s]+)\)/g, `](${SITE_ORIGIN}$1)`);
}

function pageHtml(note: OneNoteSource) {
  const markdown = absoluteLinks(note.body ?? '');
  const body = marked.parse(markdown, { async: false, gfm: true });
  const date = note.pubDate.toISOString().slice(0, 10);
  const tags = note.tags.length > 0 ? note.tags.join(', ') : '';
  const description = note.description
    ? `<p>${escapeHtml(note.description)}</p>`
    : '';
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="utf-8">
<title>${escapeHtml(note.title)}</title>
</head>
<body>
<h1>${escapeHtml(note.title)}</h1>
<p>${escapeHtml(date)}${tags ? ` · ${escapeHtml(tags)}` : ''}</p>
${description}
${body}
</body>
</html>
`;
}

function readme(folders: string[]) {
  const list = folders.map((name) => `- ${name}`).join('\n');
  return `Lesson Notes for OneNote

Each folder below is one course tab from the Lesson Notes page. Import each folder as its own notebook. Each HTML file in a folder is one page.

${list}

OneNote does not open this zip by itself. On Windows, OneNote Batch Cloud can import the unpacked folder: Import Tree, choose this folder, and turn on "The first-tier subdirectory is recognized as a notebook." Each folder becomes a notebook and each HTML file becomes a page.

Links in the pages point at the live site.
`;
}

export function buildOneNoteZip(notes: OneNoteSource[]) {
  const groups = new Map<string, OneNoteSource[]>();
  for (const note of notes) {
    const { key } = noteCourse(note.id);
    const list = groups.get(key) ?? [];
    list.push(note);
    groups.set(key, list);
  }

  const folders = [...groups.keys()].sort((a, b) => courseRank(a) - courseRank(b));

  const files: Record<string, Uint8Array> = {};
  const folderNames: string[] = [];
  const used = new Set<string>();

  for (const key of folders) {
    const label = courseLabel(key);
    folderNames.push(label);
    const pages = [...(groups.get(key) ?? [])].sort((a, b) => {
      const courseA = noteCourse(a.id);
      const courseB = noteCourse(b.id);
      return compareNotes(
        { title: a.title, date: a.pubDate.getTime(), course: courseA.key, lesson: courseA.lesson },
        { title: b.title, date: b.pubDate.getTime(), course: courseB.key, lesson: courseB.lesson },
        'course',
      );
    });

    for (const note of pages) {
      const course = noteCourse(note.id);
      const numbered = Number.isFinite(course.lesson)
        ? `${String(course.lesson).padStart(2, '0')} ${safeName(note.title)}`
        : safeName(note.title);
      let path = `${label}/${numbered}.html`;
      if (used.has(path)) path = `${label}/${numbered} (${safeName(note.id)}).html`;
      used.add(path);
      files[path] = strToU8(pageHtml(note));
    }
  }

  files['README.txt'] = strToU8(readme(folderNames));
  return zipSync(files);
}
