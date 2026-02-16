/**
 * Extracts display name from GitHub URL (e.g. owner/repo)
 */
export function getRepoDisplayName(url: string): string {
  return url.replace(/^https?:\/\/github\.com\//i, '').replace(/\/$/, '');
}
