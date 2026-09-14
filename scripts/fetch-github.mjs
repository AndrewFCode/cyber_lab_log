/**
 * Build-time GitHub activity fetch.
 * Username and token come from GH_USER and GH_PAT — never from source.
 * Writes src/data/github.json. Any failure writes a safe empty payload
 * so the site still builds and the /github page hides the activity section.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';

const OUTPUT = join(dirname(fileURLToPath(import.meta.url)), '../src/data/github.json');

const emptyPayload = {
  ok: false,
  fetchedAt: null,
  user: null,
  repos: [],
  contributions: {
    totalContributions: 0,
    weeks: [],
  },
};

const CONTRIBUTIONS_QUERY = `query($login: String!) {
  user(login: $login) {
    contributionsCollection {
      contributionCalendar {
        totalContributions
        weeks { contributionDays { date contributionCount color } }
      }
    }
  }
}`;

function env(name) {
  const value = process.env[name];
  return typeof value === 'string' && value.trim() ? value.trim() : '';
}

const user = env('GH_USER');
const token = env('GH_PAT');

function containsSecret(value, secret) {
  return Boolean(secret) && value.includes(secret);
}

async function writePayload(payload) {
  const json = `${JSON.stringify(payload, null, 2)}\n`;
  if (containsSecret(json, token)) {
    console.error('Refusing to write github.json because it would contain GH_PAT.');
    await mkdir(dirname(OUTPUT), { recursive: true });
    await writeFile(OUTPUT, `${JSON.stringify(emptyPayload, null, 2)}\n`);
    return;
  }
  await mkdir(dirname(OUTPUT), { recursive: true });
  await writeFile(OUTPUT, json);
}

function failSoft(reason) {
  console.warn(`GitHub activity unavailable: ${reason}`);
  return writePayload(emptyPayload);
}

function headers() {
  return {
    Accept: 'application/vnd.github+json',
    Authorization: `Bearer ${token}`,
    'User-Agent': 'knowledge-blog-github-activity',
    'X-GitHub-Api-Version': '2022-11-28',
  };
}

async function readJson(response) {
  const text = await response.text();
  if (containsSecret(text, token)) {
    throw new Error(`GitHub API ${response.status}`);
  }
  try {
    return JSON.parse(text);
  } catch {
    throw new Error(`GitHub API ${response.status}: invalid JSON`);
  }
}

function pickRepo(repo) {
  return {
    name: repo.name,
    description: repo.description ?? null,
    html_url: repo.html_url,
    language: repo.language ?? null,
    stargazers_count: repo.stargazers_count ?? 0,
    pushed_at: repo.pushed_at,
  };
}

async function fetchRepos() {
  const url = `https://api.github.com/users/${encodeURIComponent(user)}/repos?sort=updated&per_page=6`;
  const response = await fetch(url, { headers: headers() });
  if (!response.ok) {
    throw new Error(`REST ${response.status}`);
  }
  const body = await readJson(response);
  if (!Array.isArray(body)) {
    throw new Error('REST: unexpected payload');
  }
  return body.slice(0, 6).map(pickRepo);
}

async function fetchContributions() {
  const response = await fetch('https://api.github.com/graphql', {
    method: 'POST',
    headers: {
      ...headers(),
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      query: CONTRIBUTIONS_QUERY,
      variables: { login: user },
    }),
  });
  if (!response.ok) {
    throw new Error(`GraphQL ${response.status}`);
  }
  const body = await readJson(response);
  if (body.errors?.length) {
    throw new Error('GraphQL errors');
  }
  const calendar = body.data?.user?.contributionsCollection?.contributionCalendar;
  if (!calendar) {
    throw new Error('GraphQL: missing calendar');
  }
  return {
    totalContributions: calendar.totalContributions,
    weeks: calendar.weeks.map((week) => ({
      contributionDays: week.contributionDays.map((day) => ({
        date: day.date,
        contributionCount: day.contributionCount,
        color: day.color,
      })),
    })),
  };
}

async function main() {
  if (!user || !token) {
    await failSoft('GH_USER or GH_PAT is not set');
    return;
  }

  try {
    const [repos, contributions] = await Promise.all([fetchRepos(), fetchContributions()]);
    await writePayload({
      ok: true,
      fetchedAt: new Date().toISOString(),
      user,
      repos,
      contributions,
    });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'unknown error';
    await failSoft(containsSecret(message, token) ? 'API error' : message);
  }
}

await main();
