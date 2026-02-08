/**
 * Returns GitHub avatar URL for a given username/nickname
 * @param username - GitHub username or nickname
 * @returns GitHub avatar URL or null if username is invalid
 */
export function getGitHubUserAvatar(username: string): string | null {
  if (!username) {
    return null;
  }

  const trimmedUsername = username.trim();
  if (!trimmedUsername) {
    return null;
  }

  // GitHub provides avatars at this URL
  return `https://github.com/${trimmedUsername}.png`;
}
