/** Converts a project name into a URL-safe slug, e.g. "Rubels & Angels" -> "rubels-angels" */
export function slugify(value: string): string {
  return value
    .toLowerCase()
    .trim()
    .replace(/&/g, 'and')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '');
}
