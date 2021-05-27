module.exports = {
  out: 'docs/typedoc',
  json: 'docs/typedoc.json',
  exclude: ['src/index.ts'],
  excludePrivate: true,
  tsconfig: 'tsconfig.bin.json',
  entryPoints: ['src/index.ts']
};
