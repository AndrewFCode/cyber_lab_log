import { existsSync, readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

export interface GithubRepo {
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  pushed_at: string;
}

export interface ContributionDay {
  date: string;
  contributionCount: number;
  color: string;
}

export interface GithubActivity {
  ok: boolean;
  fetchedAt: string | null;
  user: string | null;
  repos: GithubRepo[];
  contributions: {
    totalContributions: number;
    weeks: Array<{ contributionDays: ContributionDay[] }>;
  };
}

const emptyActivity: GithubActivity = {
  ok: false,
  fetchedAt: null,
  user: null,
  repos: [],
  contributions: {
    totalContributions: 0,
    weeks: [],
  },
};

const dataPath = fileURLToPath(new URL('../data/github.json', import.meta.url));

export function loadGithubActivity(): GithubActivity {
  if (!existsSync(dataPath)) return emptyActivity;

  try {
    const parsed = JSON.parse(readFileSync(dataPath, 'utf8')) as GithubActivity;
    if (!parsed || parsed.ok !== true) return emptyActivity;
    if (!Array.isArray(parsed.repos) || parsed.repos.length === 0) return emptyActivity;
    return parsed;
  } catch {
    return emptyActivity;
  }
}

export function contributionLevel(count: number) {
  if (count <= 0) return 0;
  if (count === 1) return 1;
  if (count <= 3) return 2;
  if (count <= 6) return 3;
  return 4;
}
