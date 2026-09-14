import { readFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import satori from 'satori';
import sharp from 'sharp';

const require = createRequire(import.meta.url);

async function font(file: string) {
  return readFile(require.resolve(`@fontsource/inter/files/${file}`));
}

export async function renderOgImage(title: string, label: string) {
  const [regular, semibold] = await Promise.all([
    font('inter-latin-400-normal.woff'),
    font('inter-latin-600-normal.woff'),
  ]);

  const svg = await satori(
    {
      type: 'div',
      props: {
        style: {
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: '#0a0a0a',
          color: '#f5f5f5',
          padding: '72px 80px',
        },
        children: [
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                fontFamily: 'Inter',
                fontSize: '22px',
                fontWeight: 400,
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                color: '#a3a3a3',
              },
              children: label,
            },
          },
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                fontFamily: 'Inter',
                fontSize: title.length > 70 ? '48px' : '60px',
                fontWeight: 600,
                lineHeight: 1.15,
                letterSpacing: '-0.03em',
              },
              children: title,
            },
          },
          {
            type: 'div',
            props: {
              style: {
                display: 'flex',
                fontFamily: 'Inter',
                fontSize: '22px',
                color: '#737373',
              },
              children: 'cyber journey',
            },
          },
        ],
      },
    },
    {
      width: 1200,
      height: 630,
      fonts: [
        { name: 'Inter', data: regular, weight: 400, style: 'normal' },
        { name: 'Inter', data: semibold, weight: 600, style: 'normal' },
      ],
    },
  );

  return sharp(Buffer.from(svg)).png().toBuffer();
}
