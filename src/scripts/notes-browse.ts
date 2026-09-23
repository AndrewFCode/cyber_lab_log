import {
  compareNotes,
  isNoteSort,
  matchesQuery,
  sortPhrase,
  type NoteSort,
  type NoteSortFields,
} from '../lib/notes-browse';

function fields(row: HTMLElement): NoteSortFields {
  const lesson = Number(row.dataset.lesson);
  return {
    title: row.dataset.title ?? '',
    date: Number(row.dataset.date ?? 0),
    course: row.dataset.course ?? 'other',
    lesson: Number.isFinite(lesson) ? lesson : Number.POSITIVE_INFINITY,
  };
}

function statusText(visible: number, query: string, courseLabel: string, sort: NoteSort) {
  const order = sortPhrase(sort);
  const quoted = query ? `“${query}”` : '';

  if (visible === 0) {
    if (query && courseLabel) return `No ${courseLabel} notes match ${quoted}.`;
    if (query) return `No lesson notes match ${quoted}.`;
    return courseLabel ? `No ${courseLabel} notes.` : 'No lesson notes.';
  }

  const noun = visible === 1 ? 'note' : 'notes';
  const course = courseLabel ? `${courseLabel} ` : '';

  if (query) return `${visible} ${course}${noun} match ${quoted}, ${order}.`;
  if (courseLabel) return `${visible} ${course}${noun}, ${order}.`;
  return `${visible} ${noun}, ${order}.`;
}

export function bindNotesBrowser(root: HTMLElement) {
  const queryInput = root.querySelector<HTMLInputElement>('[data-notes-query]');
  const sortSelect = root.querySelector<HTMLSelectElement>('[data-notes-sort]');
  const list = root.querySelector<HTMLElement>('[data-notes-list]');
  const status = root.querySelector<HTMLElement>('[data-notes-status]');
  if (!queryInput || !sortSelect || !list || !status) return;

  const rows = [...list.querySelectorAll<HTMLElement>('[data-note]')];
  const courseInputs = [
    ...root.querySelectorAll<HTMLInputElement>('input[name="notes-course"]'),
  ];

  function selectedCourse() {
    return courseInputs.find((input) => input.checked)?.value ?? 'all';
  }

  function selectedCourseLabel() {
    const input = courseInputs.find((item) => item.checked);
    return input?.dataset.courseLabel ?? '';
  }

  function selectedSort(): NoteSort {
    return isNoteSort(sortSelect.value) ? sortSelect.value : 'newest';
  }

  function writeUrl(query: string, sort: NoteSort, course: string) {
    const url = new URL(window.location.href);
    if (query) url.searchParams.set('q', query);
    else url.searchParams.delete('q');
    if (sort !== 'newest') url.searchParams.set('sort', sort);
    else url.searchParams.delete('sort');
    if (course !== 'all') url.searchParams.set('course', course);
    else url.searchParams.delete('course');
    const next = `${url.pathname}${url.search}${url.hash}`;
    const current = `${window.location.pathname}${window.location.search}${window.location.hash}`;
    if (next !== current) window.history.replaceState(null, '', next);
  }

  function apply() {
    const query = queryInput.value.trim();
    const sort = selectedSort();
    const course = selectedCourse();
    const courseLabel = selectedCourseLabel();

    for (const input of courseInputs) {
      const key = input.value;
      const count = rows.filter(
        (row) =>
          (key === 'all' || row.dataset.course === key) &&
          matchesQuery(row.dataset.search ?? '', query),
      ).length;
      const slot = input.parentElement?.querySelector('[data-course-count]');
      if (slot) slot.textContent = String(count);
      input.parentElement?.classList.toggle('is-empty', count === 0);
    }

    const visible = rows.filter(
      (row) =>
        (course === 'all' || row.dataset.course === course) &&
        matchesQuery(row.dataset.search ?? '', query),
    );
    visible.sort((a, b) => compareNotes(fields(a), fields(b), sort));

    const hidden = rows.filter((row) => !visible.includes(row));
    for (const row of visible) row.hidden = false;
    for (const row of hidden) row.hidden = true;
    for (const row of [...visible, ...hidden]) list.appendChild(row);

    status.textContent = statusText(visible.length, query, courseLabel, sort);
    writeUrl(query, sort, course);
  }

  const params = new URLSearchParams(window.location.search);
  const initialQuery = params.get('q');
  const initialSort = params.get('sort');
  const initialCourse = params.get('course');
  if (initialQuery) queryInput.value = initialQuery;
  if (isNoteSort(initialSort)) sortSelect.value = initialSort;
  if (initialCourse) {
    const match = courseInputs.find((input) => input.value === initialCourse);
    if (match) match.checked = true;
  }

  queryInput.addEventListener('input', apply);
  queryInput.addEventListener('search', apply);
  sortSelect.addEventListener('change', apply);
  for (const input of courseInputs) input.addEventListener('change', apply);
  root.addEventListener('submit', (event) => event.preventDefault());

  apply();
}
