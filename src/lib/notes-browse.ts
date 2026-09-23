/** Keep this aligned with `RESOURCE_ORDER` in `collections.ts`. */
const COURSE_ORDER = [
  'code',
  'tcm-help-desk',
  'tryhackme',
  'a-plus-core-1',
  'linux',
  'powershell',
  'networking-sysadmins',
] as const;

/** Longer prefixes first so `a-plus-core-1-` is not mistaken for a shorter key. */
const COURSE_PREFIXES: { prefix: string; key: string }[] = [
  { prefix: 'a-plus-core-1-', key: 'a-plus-core-1' },
  { prefix: 'networking-sysadmins-', key: 'networking-sysadmins' },
  { prefix: 'tcm-help-desk-', key: 'tcm-help-desk' },
  { prefix: 'tryhackme-', key: 'tryhackme' },
  { prefix: 'powershell-', key: 'powershell' },
  { prefix: 'linux-', key: 'linux' },
];

export const OTHER_COURSE = 'other';

export const NOTE_SORTS = [
  { id: 'newest', label: 'Newest', phrase: 'newest first' },
  { id: 'oldest', label: 'Oldest', phrase: 'oldest first' },
  { id: 'title', label: 'A–Z', phrase: 'A–Z' },
  { id: 'course', label: 'Course order', phrase: 'course order' },
] as const;

export type NoteSort = (typeof NOTE_SORTS)[number]['id'];

export function isNoteSort(value: string | null): value is NoteSort {
  return NOTE_SORTS.some((item) => item.id === value);
}

export function sortPhrase(sort: NoteSort) {
  return NOTE_SORTS.find((item) => item.id === sort)?.phrase ?? 'newest first';
}

/** Course key and lesson number come from the filename, which is the site sequence. */
export function noteCourse(id: string) {
  const match = COURSE_PREFIXES.find((course) => id.startsWith(course.prefix));
  if (!match) return { key: OTHER_COURSE, lesson: Number.POSITIVE_INFINITY };
  const number = /^(\d+)/.exec(id.slice(match.prefix.length));
  return {
    key: match.key,
    lesson: number ? Number(number[1]) : Number.POSITIVE_INFINITY,
  };
}

export function courseRank(key: string) {
  if (key === OTHER_COURSE) return COURSE_ORDER.length + 1;
  const index = COURSE_ORDER.indexOf(key as (typeof COURSE_ORDER)[number]);
  return index === -1 ? COURSE_ORDER.length : index;
}

export interface NoteSortFields {
  title: string;
  date: number;
  course: string;
  lesson: number;
}

export function compareNotes(a: NoteSortFields, b: NoteSortFields, sort: NoteSort) {
  const byTitle = () => a.title.localeCompare(b.title, 'en');

  if (sort === 'title') return byTitle() || a.date - b.date;
  if (sort === 'oldest') return a.date - b.date || byTitle();
  if (sort === 'course') {
    const byCourse = courseRank(a.course) - courseRank(b.course);
    if (byCourse !== 0) return byCourse;
    if (a.lesson !== b.lesson) return a.lesson - b.lesson;
    return byTitle();
  }
  return b.date - a.date || byTitle();
}

/** Every word must appear in the searchable text. */
export function matchesQuery(text: string, query: string) {
  const tokens = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  return tokens.every((token) => text.includes(token));
}

export function noteSearchText(note: {
  title: string;
  description?: string;
  tags: string[];
  headings?: string[];
}) {
  return [note.title, note.description ?? '', ...note.tags, ...(note.headings ?? [])]
    .join(' ')
    .toLowerCase();
}

/** Outline lines, so a topic can be found when it is a heading but not the title. */
export function noteHeadings(body: string | undefined) {
  if (!body) return [];
  return [...body.matchAll(/^#{1,3}[ \t]+(.+)$/gm)].map((match) =>
    match[1].replace(/[*_`[\]]/g, '').trim(),
  );
}
