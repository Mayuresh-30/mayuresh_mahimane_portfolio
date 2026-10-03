import type { PortfolioPayload } from '../data/portfolio';

export interface PortfolioLoadResult {
  payload: PortfolioPayload;
  contentSource: 'mysql' | 'seed';
  databaseConnected: boolean;
}

export async function loadPortfolio(): Promise<PortfolioLoadResult> {
  const [profileResponse, skillsResponse, projectsResponse, healthResponse] = await Promise.all([
    fetch('/api/profile', { headers: { Accept: 'application/json' } }),
    fetch('/api/skills', { headers: { Accept: 'application/json' } }),
    fetch('/api/projects', { headers: { Accept: 'application/json' } }),
    fetch('/api/health', { headers: { Accept: 'application/json' } }),
  ]);

  if (!profileResponse.ok || !skillsResponse.ok || !projectsResponse.ok || !healthResponse.ok) {
    throw new Error('Portfolio API returned an unsuccessful response.');
  }

  const [profile, skills, projects, health] = await Promise.all([
    profileResponse.json(),
    skillsResponse.json(),
    projectsResponse.json(),
    healthResponse.json(),
  ]);
  return {
    payload: { profile, skills, projects } as PortfolioPayload,
    contentSource: health.content_source === 'mysql' ? 'mysql' : 'seed',
    databaseConnected: Boolean(health.database_connected),
  };
}

export async function apiRequest<T>(path: string, init: RequestInit = {}): Promise<T> {
  const response = await fetch(path, {
    ...init,
    credentials: 'same-origin',
    headers: {
      Accept: 'application/json',
      ...(init.body ? { 'Content-Type': 'application/json' } : {}),
      ...init.headers,
    },
  });
  const payload = await response.json().catch(() => ({}));
  if (!response.ok) {
    throw new Error(payload.detail ?? payload.message ?? `Request failed (${response.status}).`);
  }
  return payload as T;
}
