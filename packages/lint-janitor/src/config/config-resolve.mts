import { createRequire } from 'node:module';

export function $require(id: string) {
  const require = createRequire(import.meta.url);
  return require(id);
}

export function $resolve(id: string, options?: { paths?: string[] }) {
  const require = createRequire(import.meta.url);
  return require.resolve(id, options);
}
