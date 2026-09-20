/**
 * Prefix site-root image paths with Astro `base` so screenshots in Markdown
 * resolve on GitHub project Pages (`/cyber_lab_log/media/...`).
 */
export function imageBasePlugin(base: string) {
  const prefix = base.replace(/\/+$/, '');

  return {
    name: 'image-base',
    element: {
      filter: ['img'],
      visit(
        node: { properties?: Record<string, unknown> },
        ctx: { setProperty: (node: unknown, key: string, value: string) => void },
      ) {
        const src = node.properties?.src;
        if (typeof src !== 'string' || !src.startsWith('/') || src.startsWith('//')) return;
        if (!prefix || src === prefix || src.startsWith(`${prefix}/`)) return;
        ctx.setProperty(node, 'src', `${prefix}${src}`);
      },
    },
  };
}
