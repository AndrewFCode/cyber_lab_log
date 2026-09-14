/**
 * Sätteri hast plugin: wrap every <pre> in a .code-block with a Copy button
 * so the control exists in the HTML before any JavaScript runs.
 */
export function codeCopyPlugin() {
  return {
    name: 'code-copy',
    element: {
      filter: ['pre'],
      visit(node: {
        properties?: Record<string, unknown>;
        type: string;
        tagName?: string;
        children?: unknown[];
      }) {
        if (node.properties?.['data-copy-wrap'] != null) return;

        const wrappedPre = {
          ...node,
          properties: { ...node.properties, 'data-copy-wrap': '' },
        };

        return {
          type: 'element',
          tagName: 'div',
          properties: { className: ['code-block'] },
          children: [
            {
              type: 'element',
              tagName: 'button',
              properties: {
                type: 'button',
                className: ['copy-btn'],
                'aria-label': 'Copy code',
                'aria-live': 'polite',
              },
              children: [{ type: 'text', value: 'Copy' }],
            },
            wrappedPre,
          ],
        };
      },
    },
  };
}
