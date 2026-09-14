import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';

const base = {
  title: z.string(),
  description: z.string().optional(),
  tags: z.array(z.string()).default([]),
  draft: z.boolean().default(false),
};

const cheatsheets = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/cheatsheets' }),
  schema: z.object({
    ...base,
    updated: z.coerce.date(),
    category: z.string().optional(), // e.g. "git", "sql", "ffmpeg"
    pinned: z.boolean().default(false),
  }),
});

const explainers = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/explainers' }),
  schema: z.object({
    ...base,
    pubDate: z.coerce.date(),
    updated: z.coerce.date().optional(),
    difficulty: z.enum(['beginner', 'intermediate', 'advanced']).optional(),
  }),
});

const notes = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/notes' }),
  schema: z.object({
    ...base,
    pubDate: z.coerce.date(),
  }),
});

const projectSchema = z
  .object({
    ...base,
    pubDate: z.coerce.date(),
    why: z.string(),
    status: z.enum(['active', 'paused', 'shipped', 'archived']).default('active'),
    origin: z.enum(['handwritten', 'ai']).default('handwritten'),
    prompt: z.string().optional(),
    repo: z.string().url().optional(),
  })
  .superRefine((value, ctx) => {
    if (value.origin === 'ai' && !value.prompt?.trim()) {
      ctx.addIssue({
        code: 'custom',
        message: 'AI-generated projects must include the initial command in `prompt`.',
        path: ['prompt'],
      });
    }
  });

const projects = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/projects' }),
  schema: projectSchema,
});

export const collections = { cheatsheets, explainers, notes, projects };
