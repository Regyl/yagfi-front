export const LANGUAGES = [
    'JavaScript',
    'TypeScript',
    'Python',
    'Java',
    'C++',
    'C#',
    'Go',
    'Rust',
    'Ruby',
    'PHP',
    'Swift',
    'Kotlin',
    'Dart',
    'Perl',
    'Scala',
    'R',
    'Shell',
    'HTML',
    'CSS',
] as const;

export type Language = typeof LANGUAGES[number];
