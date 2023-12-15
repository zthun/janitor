import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    testTimeout: 10000,
    coverage: {
      all: false,
      provider: 'istanbul'
    }
  }
});
