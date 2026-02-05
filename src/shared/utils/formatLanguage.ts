/**
 * Formats a language string to Title Case (first letter uppercase, rest lowercase)
 * Example: "FRENCH" -> "French", "java" -> "Java"
 */
export function formatLanguage(language: string): string {
  if (!language) return language;
  
  return language.charAt(0).toUpperCase() + language.slice(1).toLowerCase();
}
