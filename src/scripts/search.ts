type PagefindResult = {
  data: () => Promise<{
    url: string;
    excerpt: string;
    meta: Record<string, string>;
  }>;
};

type PagefindApi = {
  init: () => Promise<void>;
  search: (
    query: string,
    options?: { filters?: Record<string, string[]> },
  ) => Promise<{ results: PagefindResult[] }>;
};

function selectedCollection(root: HTMLElement) {
  const checked = root.querySelector<HTMLInputElement>('input[type="radio"]:checked');
  if (!checked || checked.value === 'all') return undefined;
  return checked.value;
}

function renderResults(
  list: HTMLElement,
  status: HTMLElement,
  hits: Array<{ url: string; title: string; excerpt: string; collection: string }>,
  query: string,
) {
  list.replaceChildren();

  if (!query.trim()) {
    status.textContent = '';
    return;
  }

  if (hits.length === 0) {
    status.textContent = `No results for “${query}”.`;
    return;
  }

  status.textContent = hits.length === 1 ? '1 result' : `${hits.length} results`;

  for (const hit of hits) {
    const item = document.createElement('li');
    item.className = 'search-hit';

    const collection = document.createElement('p');
    collection.className = 'search-hit-collection';
    collection.textContent = hit.collection || 'Page';

    const title = document.createElement('a');
    title.className = 'search-hit-title';
    title.href = hit.url;
    title.textContent = hit.title || hit.url;

    const excerpt = document.createElement('p');
    excerpt.className = 'search-hit-excerpt';
    excerpt.innerHTML = hit.excerpt;

    item.append(collection, title, excerpt);
    list.append(item);
  }
}

export function bindSearch(root: HTMLElement) {
  const input = root.querySelector<HTMLInputElement>('[data-search-input]');
  const list = root.querySelector<HTMLElement>('[data-search-results]');
  const status = root.querySelector<HTMLElement>('[data-search-status]');
  const pagefindUrl = root.dataset.pagefindSrc;
  if (!input || !list || !status || !pagefindUrl) return;

  let pagefind: PagefindApi | null = null;
  let timer = 0;

  async function ensurePagefind() {
    if (pagefind) return pagefind;
    try {
      // Vite rewrites `import(url)` unless it is truly dynamic; Pagefind lives
      // in dist after the Astro build, not in the bundle.
      const load = new Function('url', 'return import(url)') as (url: string) => Promise<PagefindApi>;
      const mod = await load(pagefindUrl);
      await mod.init();
      pagefind = mod;
      return pagefind;
    } catch {
      status.textContent =
        'Search needs a production index. Run pnpm build && pnpm preview, then open this page.';
      input.disabled = true;
      return null;
    }
  }

  async function run() {
    const query = input.value.trim();
    const api = await ensurePagefind();
    if (!api) return;

    if (!query) {
      renderResults(list, status, [], query);
      return;
    }

    const collection = selectedCollection(root);
    const result = await api.search(
      query,
      collection ? { filters: { Collection: [collection] } } : undefined,
    );

    const hits = await Promise.all(
      result.results.slice(0, 30).map(async (entry) => {
        const data = await entry.data();
        return {
          url: data.url,
          title: data.meta.title ?? '',
          excerpt: data.excerpt,
          collection: data.meta.collection ?? '',
        };
      }),
    );

    renderResults(list, status, hits, query);
  }

  function schedule() {
    window.clearTimeout(timer);
    timer = window.setTimeout(() => {
      void run();
    }, 150);
  }

  input.addEventListener('input', schedule);
  root.querySelectorAll('input[type="radio"]').forEach((el) => {
    el.addEventListener('change', () => {
      void run();
    });
  });
}
