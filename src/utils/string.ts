export function replacePlaceholder(str: string, obj: { [key: string]: string }): string {
  return str.replace(/{\w+}/g, (key) => obj[key.slice(1, -1)]);
}