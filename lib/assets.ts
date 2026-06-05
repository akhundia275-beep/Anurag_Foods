export const siteBasePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function publicAsset(path: string) {
  if (!path.startsWith("/") || path.startsWith("//") || /^https?:\/\//.test(path)) {
    return path;
  }

  return `${siteBasePath}${path}`;
}
