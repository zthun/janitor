# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

# [10.0.0](https://github.com/zthun/janitor/compare/v9.0.0...v10.0.0) (2021-05-08)


### Bug Fixes

* markdownlint will now properly load .markdownlint.json ([eefbd03](https://github.com/zthun/janitor/commit/eefbd0383346a5e7a729bb276e0735075b23503a))
* removed logging requirement ([6bbbf3a](https://github.com/zthun/janitor/commit/6bbbf3ad574dba7f1c959219adac0bb324620dfb))
* travis build migration to yarn ([8468b10](https://github.com/zthun/janitor/commit/8468b10954e046d054fbe1765ae5bfb326874ab1))


### Code Refactoring

*  moving json linter into content ([83795c9](https://github.com/zthun/janitor/commit/83795c90ba80ba119e15011d83a6d0020b7937c4))
* move file lint report into linter ([09b6772](https://github.com/zthun/janitor/commit/09b677217f42ec4d0c5a71e210dfd74436f3aa78))
* move file lint to linters ([0c8b761](https://github.com/zthun/janitor/commit/0c8b761fb6d5f0e2471024e6297c63f8b5314a14))
* move html to content folder ([84eea52](https://github.com/zthun/janitor/commit/84eea52498f0c86bfa9421b429a9e7db8bfe557a))
* move yaml to content ([6759df5](https://github.com/zthun/janitor/commit/6759df5e7345300e0e7f18a678b8261d29aebd05))
* moved markdown lint to linter ([8b3de5a](https://github.com/zthun/janitor/commit/8b3de5acd705294fb84f082f461481c1e2feab64))
* moved silent lint to linter ([44e6932](https://github.com/zthun/janitor/commit/44e69323dbf00c2dd7a73dc04498cb7ab5d21439))
* moving eslint to linteres ([8f7ee7e](https://github.com/zthun/janitor/commit/8f7ee7e5c7e61cb5f85491f82768d59b63482030))
* moving style lint into linters ([ac22375](https://github.com/zthun/janitor/commit/ac2237537fed9be7dbf0c72835ec4c69142c5716))


### Features

* added code of conduct ([7f1535f](https://github.com/zthun/janitor/commit/7f1535f23d2dfeead7def3e0af9e1b6269d43813))
* added issue templates ([8e1bc13](https://github.com/zthun/janitor/commit/8e1bc13212e3b159af298e9917c47610cf592076))
* added prettier check support ([83bf62e](https://github.com/zthun/janitor/commit/83bf62eefc68629142dd134ce60cd7ef8cb5cd46))
* added shared configuration for htmlhint ([9bb3800](https://github.com/zthun/janitor/commit/9bb38004d9f3b5e7d427e815dedc677b41d9a449))
* added shared markdownlint config ([0a4f3ad](https://github.com/zthun/janitor/commit/0a4f3adc034cb1e3ecec478f1a32b5eb0a18824f))
* added shared stylelint-config ([9e39267](https://github.com/zthun/janitor/commit/9e39267f4edfeb5ecdaabefa27243f2c574e6408))
* added spelling lint support ([9053a70](https://github.com/zthun/janitor/commit/9053a70699cb1d031268d5ce21768db0b24234d7))
* added support for cosmiconfig based config reads ([c7f6a4c](https://github.com/zthun/janitor/commit/c7f6a4cfef4699a58e7c7c3a37f724b362b27f96))
* adding icon ([6934429](https://github.com/zthun/janitor/commit/693442911bba777ead403edba240022ead3e5ff9))
* adding shaed prettier config ([36f01fc](https://github.com/zthun/janitor/commit/36f01fc3a8cfedfb6d490a438191fc819f057f32))
* better icon ([f3c19d1](https://github.com/zthun/janitor/commit/f3c19d1539918df470943e2718433a62ddecda8c))
* file linting should now discover config files ([9a4282d](https://github.com/zthun/janitor/commit/9a4282ddeaebd38377505c54719b791317a6d756))
* removed dead code ([c0f33f9](https://github.com/zthun/janitor/commit/c0f33f9cfaf3f371545de664597b742fba54be2a))
* removed publish lint files ([848554b](https://github.com/zthun/janitor/commit/848554bca0b6964272265632abb0eb8bd10edbfe))
* silent lint can now take the resolve argument ([1718a2e](https://github.com/zthun/janitor/commit/1718a2e76ef97e6fd595f481a8d827c6827a9a87))
* the config reader can now take additional paths plus the standards ([1eea5bf](https://github.com/zthun/janitor/commit/1eea5bfe231e9b6a9f0eeee271d3e232838a1e1a))
* the cosmiconfig reader now supports module configs ([fbe0c65](https://github.com/zthun/janitor/commit/fbe0c6594c0c934413a42d27e4b13e83a709c076))
* the default paths for eslint and stylelint now run through each respective linter ([fb60cf8](https://github.com/zthun/janitor/commit/fb60cf8e4bc8a23ffb36e0e88224db59c4acfa49))
* the linters now look at the root of the repository ([901622e](https://github.com/zthun/janitor/commit/901622e07f231016c8f49a998e98b33ab36c8cd6))
* the spelling linter should now fail with issues ([52daeb8](https://github.com/zthun/janitor/commit/52daeb8f7b134e9b89533670f0d4d6c505269725))
* updated documentation and the config now requires typescript ([0956bed](https://github.com/zthun/janitor/commit/0956bed1f3c1f1a8a81296e701b34f38fc194729))
* You can now use node paths in the lint janitor config for stylelint ([8f829c3](https://github.com/zthun/janitor/commit/8f829c331367e1b63c323bce745d7f10c1e3fe39))
* You can now use node paths to the eslintConfig in the lint janitor config ([f835d3b](https://github.com/zthun/janitor/commit/f835d3b3c82566d6556c1b4b47d386bd37e7f723))
* you can simply use [@zthun](https://github.com/zthun) in extends to get all configuration ([fdb8354](https://github.com/zthun/janitor/commit/fdb8354e5589ae780ee27fdedd4ef122062b2aec))


### BREAKING CHANGES

* ZFileReportLint has been renamed to ZLinterReport
* ZFileLint has been renamed to ZLinterFile
* ZMarkdownLint has been renamed to ZLinterMarkdown
* ZStyleLint has been renamed to ZLinterStyle
* ZSilentLint has been renamed to ZLinterSilent
* ZYamlLint has been renamed to ZContentLinterYaml
* ZJsonLint has been renamed to ZContentLinterJson
* ZHtmlHint has been renamed to ZContentLinterHtml
* ZEsLint has been renamed to ZLinterEs
* These have been moved to shared configuration packages

MIGRATION: Use
@zthun/eslint-config
@zthun/htmlhint-config
@zthun/markdownlint-config
@zthun/stylelint-config
instead
* The following are no longer exported
IZConfigParser
ZConfigJsonParser
ZConfigReader

MIGRATION: Just use ZConfigCosmicReader
* ZLintJanitor no longer exports DefaultHtmlHintConfig
or DefaultMarkdownLintConfig as these will be removed.

This also add ZConfigCosmicReader and ZConfigExtender.

MIGRATION:  Use null instead
* You must now have the appropriate configuration
at the root of your project.

MIGRATION: You should create your own shared configuration based on
the eslint, stylelint, htmlhind, and markdownlint standards.
