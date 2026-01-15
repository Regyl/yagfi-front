/**
 * Extracts GitHub username from repository title and returns avatar URL
 * @param repositoryTitle - Repository title in format "owner/repo" or "owner/repo-name"
 * @returns GitHub avatar URL or null if username cannot be extracted
 */
export function getGitHubAvatar(repositoryTitle: string): string | null {
  if (!repositoryTitle) {
    return null;
  }

  // Extract username from "owner/repo" format
  const parts = repositoryTitle.split('/');
  if (parts.length < 2) {
    return null;
  }

  const username = parts[0].trim();
  if (!username) {
    return null;
  }

  // GitHub provides avatars at this URL
  return `https://github.com/${username}.png`;
}
