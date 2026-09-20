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
  schema: z
    .object({
      ...base,
      updated: z.coerce.date(),
      category: z.string().optional(), // e.g. "git", "sql", "ffmpeg"
      pinned: z.boolean().default(false),
      kind: z.enum(['ultimate', 'resource']).default('resource'),
      resource: z.string().optional(), // book or course tab, e.g. "Code (2nd ed.)"
      module: z.string().optional(), // chapter / module label inside that resource
      moduleOrder: z.number().optional(),
    })
    .superRefine((value, ctx) => {
      if (value.kind === 'resource' && !value.resource?.trim()) {
        ctx.addIssue({
          code: 'custom',
          message: 'Resource cheat sheets need `resource` (the book or course they belong to).',
          path: ['resource'],
        });
      }
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

const labs = defineCollection({
  loader: glob({ pattern: '**/*.{md,mdx}', base: './src/content/labs' }),
  schema: z.object({
    ...base,
    pubDate: z.coerce.date(),
    series: z.enum(['powershell', 'linux']),
    lab: z.string().optional(),
    example: z.string().optional(), // id of the matching example project (code only)
  }),
});

export const collections = { cheatsheets, explainers, notes, projects, labs };
