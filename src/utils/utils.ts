import { RouterPage } from "../types";

export function format(first: string, middle: string, last: string): string {
  return (first || '') + (middle ? ` ${middle}` : '') + (last ? ` ${last}` : '');
}

export function getRoute(path: string): [RouterPage, Record<string, string>] {
  const pathParts = path.split('/');
  const params: Record<string, string> = {};
  for (const pageName in RouterPage) {
    const page: RouterPage = RouterPage[pageName];
    if(page.includes(':')) {
      const parts = page.split('/');
      if(parts.length !== pathParts.length) {
        continue;
      }
      let valid = true;
      for(let i = 0; i < parts.length; i++) {
        if(parts[i].startsWith(':')) {
          const alias = parts[i].slice(1);
          params[alias] = pathParts[i];
          continue;
        }
        if(parts[i] !== pathParts[i]) {
          valid = false;
          break;
        }
      }
      if(valid) {
        return [page, params];
      }
    }
    if(page === path) {
      return [page, params];
    }
  }
  return [RouterPage.HOME, {}];
}
