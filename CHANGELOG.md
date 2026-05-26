# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [20.0.7](https://github.com/zthun/janitor/compare/v20.0.6...v20.0.7) (2026-05-26)

### Bug Fixes

* turn off no-extra-spacing-tags


## [20.0.6](https://github.com/zthun/janitor/compare/v20.0.5...v20.0.6) (2026-05-26)

**Note:** Version bump only for package @zthun/janitor





## [20.0.5](https://github.com/zthun/janitor/compare/v20.0.4...v20.0.5) (2026-04-26)

**Note:** Version bump only for package @zthun/janitor





## [20.0.4](https://github.com/zthun/janitor/compare/v20.0.3...v20.0.4) (2026-04-05)

**Note:** Version bump only for package @zthun/janitor





## [20.0.3](https://github.com/zthun/janitor/compare/v20.0.2...v20.0.3) (2026-04-01)

### Bug Fixes

* turn off unbound method for react app support


## [20.0.2](https://github.com/zthun/janitor/compare/v20.0.1...v20.0.2) (2026-04-01)

### Bug Fixes

* do not lint cspell.json
* html rules should no longer conflict with prettier
* migrate react plugin to swc
* typescript rules allows full usage of any


## [20.0.1](https://github.com/zthun/janitor/compare/v20.0.0...v20.0.1) (2026-04-01)

### Bug Fixes

* ignore lerna.json globally


## [20.0.0](https://github.com/zthun/janitor/compare/v19.5.6...v20.0.0) (2026-04-01)

### ⚠ BREAKING CHANGES

* tsconfig default target is now es2022
* janitor-web has been removed and will no longer be deployed
* janitor lint is now deprecated
* janitor-lint no longer support cspell
* janitor lint no longer supports yaml
* janitor-lint no longer supports json files
* eslint recommended type check rules are now turned on
* janitor-build-config now requires vite 8
* stylelint support has been removed
* markdownlint is no longer supported

### Features

* added css support for eslint shared config
* eslint config now checks spelling
* eslint config now embeds the full prettier config
* eslint config now lints json files
* eslint config now lints yaml files
* eslint config now validates vitest techniques
* eslint now check import and export sorting
* eslint now reports on react hooks
* eslint now supports html
* eslint recommended type check rules are now turned on
* eslint will now lint markdown files
* htmlhint is no longer supported
* janitor lint is now deprecated
* janitor-build-config now requires vite 8
* janitor-eslint-config now has global ignores
* janitor-lint no longer support cspell
* janitor-web has been removed and will no longer be deployed
* markdownlint is no longer supported
* stylelint support has been removed
* tsconfig default target is now es2022
* vite config builder now uses tsconfigpaths natively instead of a plugin

### Bug Fixes

* dts now properly only outputs types from the src directory

### Code Refactoring

* janitor lint no longer supports yaml
* janitor-lint no longer supports json files


## <small>19.5.6 (2026-01-31)</small>

* build: update outdated packages ([eee3a6b](https://github.com/zthun/janitor/commit/eee3a6b))
* chore: update yarn lockfile [skip ci] ([72278f2](https://github.com/zthun/janitor/commit/72278f2))





## [19.5.5](https://github.com/zthun/janitor/compare/v19.5.4...v19.5.5) (2026-01-04)

**Note:** Version bump only for package @zthun/janitor





## [19.5.4](https://github.com/zthun/janitor/compare/v19.5.3...v19.5.4) (2026-01-02)

**Note:** Version bump only for package @zthun/janitor





## [19.5.3](https://github.com/zthun/janitor/compare/v19.5.2...v19.5.3) (2025-12-13)

**Note:** Version bump only for package @zthun/janitor





## [19.5.2](https://github.com/zthun/janitor/compare/v19.5.1...v19.5.2) (2025-11-23)

**Note:** Version bump only for package @zthun/janitor





## [19.5.1](https://github.com/zthun/janitor/compare/v19.5.0...v19.5.1) (2025-11-19)

**Note:** Version bump only for package @zthun/janitor





## [19.5.0](https://github.com/zthun/janitor/compare/v19.4.3...v19.5.0) (2025-11-19)


### Features

* janitor-ts-config supports reusable tsconfig json files ([a47450c](https://github.com/zthun/janitor/commit/a47450c2f3ff6240eaa4ab07d11d00756c97d517))



## [19.4.3](https://github.com/zthun/janitor/compare/v19.4.2...v19.4.3) (2025-11-18)

**Note:** Version bump only for package @zthun/janitor





## [19.4.2](https://github.com/zthun/janitor/compare/v19.4.1...v19.4.2) (2025-10-29)


### ⚠ BREAKING CHANGES

* update to vitest 4

### Features

* update to vitest 4 ([36f6ca8](https://github.com/zthun/janitor/commit/36f6ca834eb653d183686ad67f2cae85f427f15a))



## [19.4.1](https://github.com/zthun/janitor/compare/v19.4.0...v19.4.1) (2025-10-23)

**Note:** Version bump only for package @zthun/janitor





## [19.4.0](https://github.com/zthun/janitor/compare/v19.3.6...v19.4.0) (2025-10-21)


### Features

* you can now run test serially ([34d9edc](https://github.com/zthun/janitor/commit/34d9edc7a39fca1159f97a771daa48905af25480))



## [19.3.6](https://github.com/zthun/janitor/compare/v19.3.5...v19.3.6) (2025-10-04)


### Reverts

* swc core to 1.13.5 ([9ac5216](https://github.com/zthun/janitor/commit/9ac5216e9a6d86f8621532efecaecafad45daf17)), closes [/github.com/swc-project/swc/issues/11126#issuecomment-3343258214](https://github.com/zthun//github.com/swc-project/swc/issues/11126/issues/issuecomment-3343258214)



## [19.3.5](https://github.com/zthun/janitor/compare/v19.3.4...v19.3.5) (2025-10-04)

**Note:** Version bump only for package @zthun/janitor





## [19.3.4](https://github.com/zthun/janitor/compare/v19.3.3...v19.3.4) (2025-09-09)

**Note:** Version bump only for package @zthun/janitor





## [19.3.3](https://github.com/zthun/janitor/compare/v19.3.2...v19.3.3) (2025-09-06)


### Bug Fixes

* externalize deps should no longer give any errors ([213a8e2](https://github.com/zthun/janitor/commit/213a8e26ca8fe5b86316e3fb93470e6e7a9e0089))



## [19.3.2](https://github.com/zthun/janitor/compare/v19.3.1...v19.3.2) (2025-09-05)

**Note:** Version bump only for package @zthun/janitor





## [19.3.1](https://github.com/zthun/janitor/compare/v19.3.0...v19.3.1) (2025-07-18)

**Note:** Version bump only for package @zthun/janitor





## [19.3.0](https://github.com/zthun/janitor/compare/v19.2.6...v19.3.0) (2025-07-02)


### Features

* add support for vite 7.x ([3242082](https://github.com/zthun/janitor/commit/32420828b8972549fc2c953d83ab350aa7aac04f))



## [19.2.6](https://github.com/zthun/janitor/compare/v19.2.5...v19.2.6) (2025-06-28)


### Bug Fixes

* source map is now true by default and minify is now off by default ([a8c4744](https://github.com/zthun/janitor/commit/a8c4744215cc34d067514d2055959f2e2eb2c3b8))



## [19.2.5](https://github.com/zthun/janitor/compare/v19.2.4...v19.2.5) (2025-06-22)


### Bug Fixes

* mui style selectors are now supported ([ba158c5](https://github.com/zthun/janitor/commit/ba158c50846a4b48b5ebf29158078e54f172bc22))



## [19.2.4](https://github.com/zthun/janitor/compare/v19.2.3...v19.2.4) (2025-06-21)


### Bug Fixes

* generating types should no longer generate types for spec/test files ([c14e540](https://github.com/zthun/janitor/commit/c14e540c59af58743c9d4a3890ab3389aee7fdfb))
* the test builder now defaults to v8 as the coverage provider ([a9bf26d](https://github.com/zthun/janitor/commit/a9bf26d3a170f0451d9b7da2ab9729efb622ac9f))



## [19.2.3](https://github.com/zthun/janitor/compare/v19.2.2...v19.2.3) (2025-06-20)


### Bug Fixes

* common html files now include files at the root of the src and individual project folders ([d2fef02](https://github.com/zthun/janitor/commit/d2fef0266b2d01cd6387fd0639961c4f9b9c8566))



## [19.2.2](https://github.com/zthun/janitor/compare/v19.2.1...v19.2.2) (2025-06-20)


### Bug Fixes

* swc is now the default compiler for all projects ([2b4b71d](https://github.com/zthun/janitor/commit/2b4b71ddbce2bce12f99171cc7cb1887805c0719))



## [19.2.1](https://github.com/zthun/janitor/compare/v19.2.0...v19.2.1) (2025-06-12)


### Bug Fixes

* remove LICENSE from common markdown files ([d84462f](https://github.com/zthun/janitor/commit/d84462f39a66355716887b7847de257a9a8d0840))



## [19.2.0](https://github.com/zthun/janitor/compare/v19.1.5...v19.2.0) (2025-06-11)


### Features

* support for resolve alias values ([aa2bee8](https://github.com/zthun/janitor/commit/aa2bee8a5eb441435f809042fcd21d56d82b89c8))
* you can add conventional excludes ([ba2a09b](https://github.com/zthun/janitor/commit/ba2a09b93a1e384cd5ee915ce7827f5dd91e9ffb))
* you can now add conventional html files ([d6a6550](https://github.com/zthun/janitor/commit/d6a655002af1f1556f752798a64f63ef61acda0d))
* you can now add conventional yaml files ([1c664cd](https://github.com/zthun/janitor/commit/1c664cd479a01e997a955c789c39d09f5370535d))
* you can now exclude style files ([c47d280](https://github.com/zthun/janitor/commit/c47d280f42ecbc1036534f69e3a0539b42113da1))
* you can now have common es files and style files ([56b5052](https://github.com/zthun/janitor/commit/56b50525c04cbf4378af149a317b94753ac0c654))


### Bug Fixes

* linting es files should no longer error on empty patterns ([08104ef](https://github.com/zthun/janitor/commit/08104ef552285a5d4c86000beff8017334ace8d2))



## [19.1.5](https://github.com/zthun/janitor/compare/v19.1.4...v19.1.5) (2025-06-09)

**Note:** Version bump only for package @zthun/janitor





## [19.1.4](https://github.com/zthun/janitor/compare/v19.1.3...v19.1.4) (2025-06-09)


### Bug Fixes

* vite, vitest, and typedoc are now transitive since they are optional ([4a22aef](https://github.com/zthun/janitor/commit/4a22aef5be9352926ba179e5296cd9ccad45b13d))



## [19.1.3](https://github.com/zthun/janitor/compare/v19.1.2...v19.1.3) (2025-06-09)


### Bug Fixes

* types should use mts and not ts ([cb6a2fb](https://github.com/zthun/janitor/commit/cb6a2fbe5974d947017f8c056dadb78d994a8ef7))



## [19.1.2](https://github.com/zthun/janitor/compare/v19.1.1...v19.1.2) (2025-06-09)


### Bug Fixes

* entry points are now mts files and not ts files ([3fd6ffe](https://github.com/zthun/janitor/commit/3fd6ffe4f0bfec8a5478ef340736c4cce7c6be7b))



## [19.1.1](https://github.com/zthun/janitor/compare/v19.1.0...v19.1.1) (2025-06-08)


### Bug Fixes

* swc plugin is now optional ([e8afb4c](https://github.com/zthun/janitor/commit/e8afb4cdfc5e6bece013614c0cf057f61a21650b))



## [19.1.0](https://github.com/zthun/janitor/compare/v19.0.0...v19.1.0) (2025-06-08)


### Features

* add monorepo support for upcoming vitest 4.x ([d5a1d7c](https://github.com/zthun/janitor/commit/d5a1d7c8789d665fc77a7abd0b90261c580fc076))
* vite config builder now has web and server options ([dcef82e](https://github.com/zthun/janitor/commit/dcef82ee25ed68ca07c23e068d90d7974c60b333))
* vite server builder can build the server options ([dc902fe](https://github.com/zthun/janitor/commit/dc902fe312a9255668f539b6e7294b69828a3f15))


### Bug Fixes

* vite and vitest are now optional dependencies instead of transitive ([0be504e](https://github.com/zthun/janitor/commit/0be504ea554b4728d3e52f7d89e37737716c8dc3))



## [19.0.0](https://github.com/zthun/janitor/compare/v18.1.0...v19.0.0) (2025-06-06)


### ⚠ BREAKING CHANGES

* janitor options have been extracted to @zthun/janitor-options
* janitor lint options is now janitor options
* config file for janitor is now janitor instead of lint-janitor
* module resolution and style are now node next
* rename stylelint-config to janitor-stylelint-config
* markdownlint-config is now janitor-markdownlint-config
* htmlhint-config is now janitor-htmlhint-config
* rename @zthun/eslint-config to @zthun/janitor-eslint-config
* class ZLintJanitor is now ZJanitorLint
* interface, IZLintJanitorOptions, is now IZJanitorLintOptions
* rename lint-janitor-config to janitor-lint-config
* lint-janitor is now janitor-lint

### Features

* janitor options allows for using a builder to build options ([b989284](https://github.com/zthun/janitor/commit/b9892849c32d680ae8be64c187e27fe2691624e9))
* janitor options lint allows you to build lint options programmatically ([0ecab65](https://github.com/zthun/janitor/commit/0ecab65c6a0d68f782452307d56d522643924aaa))
* janitor options lint can support excludes for every file type ([20208f1](https://github.com/zthun/janitor/commit/20208f115f2d12799e86f9e78cc1159250c7c551))
* janitor-build-config adds configuration for various projects ([9e7d5c6](https://github.com/zthun/janitor/commit/9e7d5c63c4627e1cc617ddcf04a816a178ebeefd))
* spelling files can be generated ([377937c](https://github.com/zthun/janitor/commit/377937cbfc674686e6f16998f0718c2f66b3fcbc))
* typedoc config builder allows for a shared typedoc config ([83815a7](https://github.com/zthun/janitor/commit/83815a71b53a8de94faad2dad93adfbf38c8b718))
* vitest config builder helps with building configs for vitest ([7a822b7](https://github.com/zthun/janitor/commit/7a822b7c07ae9907b3a9e3b4651a26073b192f80))


### Code Refactoring

* class ZLintJanitor is now ZJanitorLint ([b74881e](https://github.com/zthun/janitor/commit/b74881ea89cdf405b81283c39303fa8e5e13ff0b))
* config file for janitor is now janitor instead of lint-janitor ([0ec0792](https://github.com/zthun/janitor/commit/0ec07921c0135de6f06ebd13ba56740e8848154a))
* htmlhint-config is now janitor-htmlhint-config ([6407b0f](https://github.com/zthun/janitor/commit/6407b0fb9b8935a70233d724c2eed23b2da04309))
* interface, IZLintJanitorOptions, is now IZJanitorLintOptions ([77cb00d](https://github.com/zthun/janitor/commit/77cb00dc4464984a84292a4687c07c4f5255c4ce))
* janitor lint options is now janitor options ([e8e4578](https://github.com/zthun/janitor/commit/e8e4578711efccef9e23ade8450f07db2178127f))
* janitor options have been extracted to @zthun/janitor-options ([887f6fe](https://github.com/zthun/janitor/commit/887f6fe798a2d6a0e11fee72860d3f25087a2757))
* lint-janitor is now janitor-lint ([e70b671](https://github.com/zthun/janitor/commit/e70b6713850499841df1e49413dba19cafebe32a))
* markdownlint-config is now janitor-markdownlint-config ([b4ed3ee](https://github.com/zthun/janitor/commit/b4ed3ee364ff85cb28f30572fee6a42924a0ebf5))
* rename @zthun/eslint-config to @zthun/janitor-eslint-config ([01494c6](https://github.com/zthun/janitor/commit/01494c6a476d60ce45d4a18ae7c5be40aaab2363))
* rename lint-janitor-config to janitor-lint-config ([9c9aebf](https://github.com/zthun/janitor/commit/9c9aebfb7f9cc7f91bcf9005739f17bb8f37699a))
* rename stylelint-config to janitor-stylelint-config ([0d6cd68](https://github.com/zthun/janitor/commit/0d6cd68c05ee246d8188627165d9f81877a9ac25))


### Build System

* module resolution and style are now node next ([77fada3](https://github.com/zthun/janitor/commit/77fada3a88a243cda30350a7e0df74269c27142f))



## [18.1.0](https://github.com/zthun/janitor/compare/v18.0.6...v18.1.0) (2025-05-20)


### Features

* upgrade cspell to 9.x ([e31d12d](https://github.com/zthun/janitor/commit/e31d12d6b0a7bd4289e5e5515930f2c427865d01))
* upgrade eslint-prettier to 10.x and globals to 16.x ([64c3fa7](https://github.com/zthun/janitor/commit/64c3fa729c8cec3ad24795390feb17fc05b8a15b))
* upgrade stylelint-config-standard to 38.x ([ac91eb4](https://github.com/zthun/janitor/commit/ac91eb4da2d7eab775b9ee1aa9d815ff99539062))
* upgrade stylelint-config-standard-scss to 15.x ([c200468](https://github.com/zthun/janitor/commit/c20046895d087e7f07456b8fdea00fedcda1b741))



## [18.0.6](https://github.com/zthun/janitor/compare/v18.0.5...v18.0.6) (2025-01-03)


### Bug Fixes

* search strategy for config is now project ([ae2984b](https://github.com/zthun/janitor/commit/ae2984bab66dd7342b5e096fd84c218b0ff0e3ab))



## [18.0.5](https://github.com/zthun/janitor/compare/v18.0.4...v18.0.5) (2024-12-29)

**Note:** Version bump only for package @zthun/janitor





## [18.0.4](https://github.com/zthun/janitor/compare/v18.0.3...v18.0.4) (2024-11-17)


### Bug Fixes

* no-unused-expressions should no longer crash janitor for the time being ([93ee348](https://github.com/zthun/janitor/commit/93ee348dec5db864924973d108e329f05a1bac2e))



## [18.0.3](https://github.com/zthun/janitor/compare/v18.0.2...v18.0.3) (2024-11-06)

**Note:** Version bump only for package @zthun/janitor





## [18.0.2](https://github.com/zthun/janitor/compare/v18.0.1...v18.0.2) (2024-11-05)


### Bug Fixes

* markdownlint is now properly exported ([a755349](https://github.com/zthun/janitor/commit/a755349cf4a5f022255691fc9d0dc3e0012da3b3))



## [18.0.1](https://github.com/zthun/janitor/compare/v18.0.0...v18.0.1) (2024-11-05)


### Bug Fixes

* allow react rules to run on files that are not jsx and tsx ([718dab0](https://github.com/zthun/janitor/commit/718dab0b0ef191e8ff48cf40c1c0ce8eab25d6d0))



## [18.0.0](https://github.com/zthun/janitor/compare/v17.1.0...v18.0.0) (2024-11-05)


### ⚠ BREAKING CHANGES

* eslint-config now requires eslint 9.x
* eslint-react-config has been collapsed into eslint-config
* eslint-react-config has been collapsed into eslint-confg
* eslint-react-config has been collapsed into eslint-config

### Features

* eslint-config now requires eslint 9.x ([7426498](https://github.com/zthun/janitor/commit/742649839b356dc85e9349a44669c67aa175c977))
* eslint-react-config has been collapsed into eslint-confg ([1bfe75f](https://github.com/zthun/janitor/commit/1bfe75f1035460152ab52903e2d97ec1bbc19e1f))
* eslint-react-config has been collapsed into eslint-config ([4e4ed09](https://github.com/zthun/janitor/commit/4e4ed09d76d49222d30fccabe774e76bba37bd5c))
* eslint-react-config has been collapsed into eslint-config ([ea49be1](https://github.com/zthun/janitor/commit/ea49be1fc5f801d94fbb567760823b20e3aa9351))
* recommended includes the recommendations across all technologies and projects ([f622df4](https://github.com/zthun/janitor/commit/f622df4442c2de53b352f8b4163de1496f6ba9bd))
* specify standards for environments ([e6e1cfc](https://github.com/zthun/janitor/commit/e6e1cfcc9a71d8f0241c8491409b1af46b12a137))
* standards for import are now composable ([5148aa4](https://github.com/zthun/janitor/commit/5148aa422d574e0c0964cdfcddce3d5b7b872e35))
* standards for javascript are now composable ([2d0abd4](https://github.com/zthun/janitor/commit/2d0abd4b8f4fd1871502d084081ef6772a805ab1))
* standards for prettier are now composable ([2c995df](https://github.com/zthun/janitor/commit/2c995df53bec5374f4e088bdbae9f02d0deb0a51))
* standards for the react framework are now composable ([31197b5](https://github.com/zthun/janitor/commit/31197b54a3f631e82a8027f2cafbb948d4ba771b))
* standards for typescript are now composable ([e94db89](https://github.com/zthun/janitor/commit/e94db899d9ea10d330dc908e0919b9c0a4d5b6bf))



## [17.1.0](https://github.com/zthun/janitor/compare/v17.0.8...v17.1.0) (2024-11-05)


### Features

* eslint-config now supports esm as well as cjs ([63f7d6e](https://github.com/zthun/janitor/commit/63f7d6e4f5f580166cc1a4993d0772805b75e26a))
* eslint-react-config now supports esm as well as cjs ([78261af](https://github.com/zthun/janitor/commit/78261af8cb0cfbd8d679642396a6351efacac5c1))
* htmlhint now outputs esm as well as cjs ([b01689a](https://github.com/zthun/janitor/commit/b01689aaf0ac2d947a78d2850f8d26859034d808))
* lint-janitor-config now supports esm in addition to cjs ([e662d7c](https://github.com/zthun/janitor/commit/e662d7c75151a38b0d6d8d1b3d964c8d8ac5a3a6))
* prettier-config now supports cjs and esm ([6fd3f1c](https://github.com/zthun/janitor/commit/6fd3f1cd42a880bfeaa73d1ee51355d12c659f48))



## [17.0.8](https://github.com/zthun/janitor/compare/v17.0.7...v17.0.8) (2024-11-05)

**Note:** Version bump only for package @zthun/janitor





## [17.0.7](https://github.com/zthun/janitor/compare/v17.0.6...v17.0.7) (2024-11-04)

**Note:** Version bump only for package @zthun/janitor





## [17.0.6](https://github.com/zthun/janitor/compare/v17.0.5...v17.0.6) (2024-10-27)

**Note:** Version bump only for package @zthun/janitor





## [17.0.5](https://github.com/zthun/janitor/compare/v17.0.4...v17.0.5) (2024-09-08)

**Note:** Version bump only for package @zthun/janitor





## [17.0.4](https://github.com/zthun/janitor/compare/v17.0.3...v17.0.4) (2024-09-03)

**Note:** Version bump only for package @zthun/janitor





## [17.0.3](https://github.com/zthun/janitor/compare/v17.0.2...v17.0.3) (2024-09-01)


### Bug Fixes

* peer dependencies ([e1c270c](https://github.com/zthun/janitor/commit/e1c270c025f1f0b8b0ce02d8e21f6db152b5a92e))



## [17.0.2](https://github.com/zthun/janitor/compare/v17.0.1...v17.0.2) (2024-08-31)

**Note:** Version bump only for package @zthun/janitor





## [17.0.1](https://github.com/zthun/janitor/compare/v17.0.0...v17.0.1) (2024-08-27)

**Note:** Version bump only for package @zthun/janitor





## [17.0.0](https://github.com/zthun/janitor/compare/v16.1.2...v17.0.0) (2024-08-27)


### ⚠ BREAKING CHANGES

* stylelint-config now favors the default rule set
* eslint-plugin-react now caters to the default rules
* eslint now leans towards using defaults as much as possible

### Features

* cosmiconfig now falls back to the default empty config ([3e9fdf6](https://github.com/zthun/janitor/commit/3e9fdf6164a3df1cae71831d1e5dc5ddb2989b92))
* prettier config file is now optional ([db6d432](https://github.com/zthun/janitor/commit/db6d432ded4ee050cf7f5527fd49ab28d8415a1c))


### Code Refactoring

* eslint now leans towards using defaults as much as possible ([c563c78](https://github.com/zthun/janitor/commit/c563c78cbfb24cec479bd1a590e2fad6654e83d1))
* eslint-plugin-react now caters to the default rules ([68687dc](https://github.com/zthun/janitor/commit/68687dc63983fb50d4aded99760d780d0e16c255))
* stylelint-config now favors the default rule set ([821cff6](https://github.com/zthun/janitor/commit/821cff6256ee487418e6fa18e686b5c911dba9f6))



# Change Log

All notable changes to this project will be documented in this file. See
[Conventional Commits](https://conventionalcommits.org) for commit guidelines.

## [16.1.2](https://github.com/zthun/janitor/compare/v16.1.1...v16.1.2) (2024-08-27)

**Note:** Version bump only for package @zthun/janitor

## [16.1.1](https://github.com/zthun/janitor/compare/v16.1.0...v16.1.1) (2024-07-15)

**Note:** Version bump only for package @zthun/janitor

## [16.1.0](https://github.com/zthun/janitor/compare/v16.0.1...v16.1.0) (2024-04-11)

### Features

- style lint upgraded to 16.3.1
  ([f854af0](https://github.com/zthun/janitor/commit/f854af00e3f264c68929fba5bd9dcabbf27bb1e2))
- upgrade cspell to 3.7.0
  ([66ef9ba](https://github.com/zthun/janitor/commit/66ef9ba4aa8beb113362da1db8be76fc1768a725))
- upgraded markdown lint to 0.34.0
  ([aab1e76](https://github.com/zthun/janitor/commit/aab1e761055b6da1c1612680c5a9cb3338d8813e))

### Bug Fixes

- failures when linting es files will still allow other linters to run their
  checks
  ([68e942f](https://github.com/zthun/janitor/commit/68e942f21f8fa415d4f7c19b34c2b596509dbd30))

## [16.0.1](https://github.com/zthun/janitor/compare/v16.0.0...v16.0.1) (2024-03-15)

### Bug Fixes

- lint janitor config peer dependency is now v16 of lint janitor
  ([29fa865](https://github.com/zthun/janitor/commit/29fa865aa401ffd8a7b952467af010f37e737a8b))

## [16.0.0](https://github.com/zthun/janitor/compare/v15.1.2...v16.0.0) (2024-03-15)

### ⚠ BREAKING CHANGES

- upgrade stylelint to 16.2.1

### Features

- brace style lint is now turned off for better prettier support
  ([964fa81](https://github.com/zthun/janitor/commit/964fa81bd49b1f27879f52bca7bc17a2e58096e5))
- upgrade cspell to 8.6.0
  ([f2e7ec6](https://github.com/zthun/janitor/commit/f2e7ec60196ab4f09543669e9d78e0b1b8b3a8e9))
- upgrade markdown lint to 0.33.0
  ([bc1b6f1](https://github.com/zthun/janitor/commit/bc1b6f1fe08cef5be9643b02eadb92254d30163b))
- upgrade prettier to 3.2.5
  ([6a00766](https://github.com/zthun/janitor/commit/6a007663742c2bb4f0af1582746d87002bded6bc))
- upgrade stylelint to 16.2.1
  ([281283f](https://github.com/zthun/janitor/commit/281283f5738df0755baacd731d8473453d4a9603))

## [15.1.2](https://github.com/zthun/janitor/compare/v15.1.1...v15.1.2) (2023-12-15)

### Bug Fixes

- minimum of version of prettier is now a peer dependency
  ([ed77d2e](https://github.com/zthun/janitor/commit/ed77d2e17ff688efd5a9479aeb98ee26f200b1fa))
- prettier now correctly discovers the config file
  ([47bd8a9](https://github.com/zthun/janitor/commit/47bd8a9897389d3cef399d4b7d48a45167930721))

## [15.1.1](https://github.com/zthun/janitor/compare/v15.1.0...v15.1.1) (2023-11-29)

### Bug Fixes

- added additional stylelint-configs
  ([7da19eb](https://github.com/zthun/janitor/commit/7da19eb57ad95eeb0fb860a2feb1f863b8d38200))
- adding config dependency
  ([c720c65](https://github.com/zthun/janitor/commit/c720c6515622f24f417612c1b11bcbaee57180c1))
- update lint-janitor peer dependency
  ([9643e92](https://github.com/zthun/janitor/commit/9643e927c760b33c1d4278a134b6e9535c0108e0))

## [15.1.0](https://github.com/zthun/janitor/compare/v15.0.0...v15.1.0) (2023-11-29)

### Features

- janitor now has an icon
  ([3a82827](https://github.com/zthun/janitor/commit/3a82827c2bb945f837455f44f09a86d7a5558b0a))
- janitor web showcases the docs for janitor projects
  ([2da70dc](https://github.com/zthun/janitor/commit/2da70dc7fff4b39468aa09183c376eb345564d3b))
- remove string-quotes
  ([6ccb2db](https://github.com/zthun/janitor/commit/6ccb2db7afcf270f1a081c5bd42298ec7d156806))
- stylelint config less helps with less based style projects
  ([21d9f70](https://github.com/zthun/janitor/commit/21d9f70f6b929c18aa87295e099bc68ec2354b7d))
- stylelint-config-sass can be used to lint sass projects
  ([0015ed6](https://github.com/zthun/janitor/commit/0015ed62399ea377f76a38f51b2712ae420f8595))

### Bug Fixes

- prettier lint should now properly identify errors
  ([d492e8b](https://github.com/zthun/janitor/commit/d492e8b9098039f624ed729ccad84ca192a1f9ef))

## [15.0.0](https://github.com/zthun/janitor/compare/v14.4.0...v15.0.0) (2023-11-28)

### ⚠ BREAKING CHANGES

- upgrade chalk to 5.x
- upgrade cspell to 8.0.0
- convert to esm module
- convert lint janitor to esm modules only

### Features

- upgrade chalk to 5.x
  ([3304bbd](https://github.com/zthun/janitor/commit/3304bbd34090da39a51e2e04a3bf6bfda7b18c62))
- upgrade cspell to 8.0.0
  ([759d837](https://github.com/zthun/janitor/commit/759d8377f74e0494eb8d424d90d0f1c981a02306))

### Code Refactoring

- convert lint janitor to esm modules only
  ([5d73f75](https://github.com/zthun/janitor/commit/5d73f75615df32025d908e442bfeff2c5fc0c143))
- convert to esm module
  ([26f3b64](https://github.com/zthun/janitor/commit/26f3b6460586b0f1b48855e739a894be158985ad))

## [14.4.0](https://github.com/zthun/janitor/compare/v14.3.2...v14.4.0) (2023-11-21)

### Features

- upgrade eslint tooling
  ([7bc94d3](https://github.com/zthun/janitor/commit/7bc94d3fcdd25ece893963903a306cd48c0c8fcb))
- upgrade markdownlint to 0.32.x
  ([14d9226](https://github.com/zthun/janitor/commit/14d922674fe12b3b4215979759a031473ec9b195))
- upgrade prettier to 3.1.0
  ([8d75669](https://github.com/zthun/janitor/commit/8d75669471e562bd38895b540754ecff8d0a4674))
- upgrade stylelint to 15.11.x
  ([87a0b2f](https://github.com/zthun/janitor/commit/87a0b2f714f7fa91f278a3bcab1190cbe513ccce))

## [14.3.2](https://github.com/zthun/janitor/compare/v14.3.1...v14.3.2) (2023-09-02)

**Note:** Version bump only for package @zthun/janitor

## [14.3.1](https://github.com/zthun/janitor/compare/v14.3.0...v14.3.1) (2023-08-15)

### Bug Fixes

- peer dependencies
  ([7c5a080](https://github.com/zthun/janitor/commit/7c5a080c6e57007d0801ff4e0dd5d5395d83f199))

## [14.3.0](https://github.com/zthun/janitor/compare/v14.2.0...v14.3.0) (2023-08-15)

### Features

- update cspell
  ([fabb1b8](https://github.com/zthun/janitor/commit/fabb1b84bba4a6c90909bef806be6eecf5183775))
- update eslint
  ([ed7ebcb](https://github.com/zthun/janitor/commit/ed7ebcb48ad1199bf4f84cc7e98136ffe513f5ca))
- update markdown lint
  ([d1e490c](https://github.com/zthun/janitor/commit/d1e490cb22d6ffac45c81b4076e00fe278f5ed4e))
- update prettier
  ([5f1104c](https://github.com/zthun/janitor/commit/5f1104c127830389b46ad4d0954825bb9533ed1c))
- update stylelint
  ([6ece8fa](https://github.com/zthun/janitor/commit/6ece8fa9a8ce261147f12f9a027b35f18fbf80f2))

## [14.2.0](https://github.com/zthun/janitor/compare/v14.1.0...v14.2.0) (2023-06-09)

### Features

- typedoc no longer distributed
  ([c1d8114](https://github.com/zthun/janitor/commit/c1d811493d669d6148825108bd44ea5008325d8a))
- update cspell
  ([94e7464](https://github.com/zthun/janitor/commit/94e7464002cd821ee9a199c4fa474caab647e20f))
- update markdownlint
  ([f331048](https://github.com/zthun/janitor/commit/f3310482cd355f382e0f02170b08d031457811af))
- update prettier
  ([97bb183](https://github.com/zthun/janitor/commit/97bb183af6b1373567a81d980a7e4c73575e8095))
- update stylelint
  ([3c5e59e](https://github.com/zthun/janitor/commit/3c5e59e022a8daec294a776cde24f7f5aebcabbb))

## [14.1.0](https://github.com/zthun/janitor/compare/v14.0.0...v14.1.0) (2023-01-25)

### Features

- relaxing jsdoc rules and switched to tsdoc
  ([17f31f1](https://github.com/zthun/janitor/commit/17f31f14bbce83da70239242ffa05deb83508025))

### Bug Fixes

- updating peer dependencies
  ([2c6306b](https://github.com/zthun/janitor/commit/2c6306bf274d072762c1d6335a7237eab9b38d84))

## [14.0.0](https://github.com/zthun/janitor/compare/v13.0.2...v14.0.0) (2023-01-24)

### ⚠ BREAKING CHANGES

- updated dependencies to latest
- update minimum node engine to lts version

### Build System

- update minimum node engine to lts version
  ([8598a44](https://github.com/zthun/janitor/commit/8598a449d5145d80944ba0354ec85b5d6a931cb1))
- updated dependencies to latest
  ([e6d7bb5](https://github.com/zthun/janitor/commit/e6d7bb5023193235d7069976a1fe39a59cfed1e4))

## [13.0.2](https://github.com/zthun/janitor/compare/v13.0.1...v13.0.2) (2022-11-29)

**Note:** Version bump only for package @zthun/janitor

## [13.0.1](https://github.com/zthun/janitor/compare/v13.0.0...v13.0.1) (2022-10-01)

### Bug Fixes

- update lint-janitor peer dependency
  ([5cea3ef](https://github.com/zthun/janitor/commit/5cea3ef0d79b6f49d236e5bd724275b7148c45a2))

## [13.0.0](https://github.com/zthun/janitor/compare/v12.0.0...v13.0.0) (2022-09-28)

### ⚠ BREAKING CHANGES

- prettier printWidth is now 120 down from 256
- added support for the eslint-import plugin

### Features

- added support for the eslint-import plugin
  ([42f91e7](https://github.com/zthun/janitor/commit/42f91e7b6f91ede6ef4dfd8915b5de66c2c74e6a))
- adding eslint-plugin-import as a dependency
  ([1625ac7](https://github.com/zthun/janitor/commit/1625ac78a3bf4b0acea1df3296d6da6867c2d64e))
- prettier printWidth is now 120 down from 256
  ([c363685](https://github.com/zthun/janitor/commit/c363685d926b71ea3c609d5d460621fa9331e7b0))

## [12.0.0](https://github.com/zthun/janitor/compare/v11.2.1...v12.0.0) (2022-09-28)

### ⚠ BREAKING CHANGES

- updated all dependencies to their latest versions

### Build System

- updated all dependencies to their latest versions
  ([d83fb0d](https://github.com/zthun/janitor/commit/d83fb0ded574e7f8d6052d0cb6d6635a36fc0e96))

### [11.2.1](https://github.com/zthun/janitor/compare/v11.2.0...v11.2.1) (2022-05-21)

**Note:** Version bump only for package @zthun/linting

## [11.2.0](https://github.com/zthun/janitor/compare/v11.1.1...v11.2.0) (2022-01-30)

### Features

- added a shared config for react based projects
  ([07c6f39](https://github.com/zthun/janitor/commit/07c6f3965a0f93ca2dd9f0cc43338fd3755e281c))
- added eslint-react
  ([04e788a](https://github.com/zthun/janitor/commit/04e788ad412e228806751e95c8a90a6d389f3209))
- adding eslint-react to the default installs
  ([7404481](https://github.com/zthun/janitor/commit/74044816c6c9e29523e91b73ae86343c6c3aede3))
- updated markdownlint to 0.25.x
  ([88a4213](https://github.com/zthun/janitor/commit/88a421300886ef8bd0bd5f0d1aa2b554ab849b47))

### Bug Fixes

- globs that have duplicates should no longer report double the count
  ([28ddc8f](https://github.com/zthun/janitor/commit/28ddc8fb2e88ce81e6fe45b5a8712bd49fbbc4bf))
- markdownlint dependency should now use ~
  ([36f46cc](https://github.com/zthun/janitor/commit/36f46cc3c4d065d1a554f81e4c1db11d20ca4165))
- quotes should now allow template literals
  ([49fbdd3](https://github.com/zthun/janitor/commit/49fbdd3fe53ac5dda019522c928cef0f64c0abca))

### [11.1.1](https://github.com/zthun/janitor/compare/v11.1.0...v11.1.1) (2021-12-22)

### Bug Fixes

- better package information
  ([8175113](https://github.com/zthun/janitor/commit/8175113d1df0989f9328d7d80ad94d5d6ad573dd))

## [11.1.0](https://github.com/zthun/janitor/compare/v11.0.0...v11.1.0) (2021-12-22)

### Features

- added lint-janitor config
  ([51a8fc0](https://github.com/zthun/janitor/commit/51a8fc065e40317b04cda045998ebf19898ca73d))
- update htmlhint to 1.0.0
  ([a5bee76](https://github.com/zthun/janitor/commit/a5bee764a945e0ea0c62b4e81ed9673e4dca6336))

## [11.0.0](https://github.com/zthun/janitor/compare/v10.2.0...v11.0.0) (2021-10-20)

### ⚠ BREAKING CHANGES

- updated cspell to the latest version
- updated to markdownlint 0.24
- updated to latest linters
- updated to eslint 8

### Features

- added vscode extension skeleton
  ([bcda403](https://github.com/zthun/janitor/commit/bcda4037679187a62253bb8759d598c0b682df31))
- updated cspell to the latest version
  ([ee1a534](https://github.com/zthun/janitor/commit/ee1a53447787137c3bf2cf87d4476d96ccfecea8))
- updated to eslint 8
  ([bc261c8](https://github.com/zthun/janitor/commit/bc261c8b71585909771a0c368990e22b963294d6))
- updated to latest linters
  ([dab8404](https://github.com/zthun/janitor/commit/dab8404554dd111e8577b8a66628fe3d0267281c))
- updated to markdownlint 0.24
  ([049d5a6](https://github.com/zthun/janitor/commit/049d5a6c5e0cad5a70b225830edc2120b27e4c0d))

### Bug Fixes

- typedoc documentation should now properly generate
  ([d9bc7cc](https://github.com/zthun/janitor/commit/d9bc7ccade532025e14bb02c98adab75b8809851))

## [10.2.0](https://github.com/zthun/janitor/compare/v10.1.3...v10.2.0) (2021-06-23)

### Features

- update html hint to 0.15
  ([b9c03e9](https://github.com/zthun/janitor/commit/b9c03e96e59644cf89e584d062e5c963b74b7fe3))

### [10.1.3](https://github.com/zthun/janitor/compare/v10.1.2...v10.1.3) (2021-05-27)

### Bug Fixes

- updated the readme to be more mobile and browser friendly
  ([4294212](https://github.com/zthun/janitor/commit/4294212d09e597d962cd4e07a97a5972375c9080))

### [10.1.2](https://github.com/zthun/janitor/compare/v10.1.1...v10.1.2) (2021-05-27)

**Note:** Version bump only for package @zthun/linting

### [10.1.1](https://github.com/zthun/janitor/compare/v10.1.0...v10.1.1) (2021-05-09)

### Bug Fixes

- the icon should now appear visible on dark backgrounds
  ([ac57418](https://github.com/zthun/janitor/commit/ac57418e8b010c8a3e838485de1e0361dd181461))

# [10.1.0](https://github.com/zthun/janitor/compare/v10.0.0...v10.1.0) (2021-05-08)

### Features

- it is now possible to exclude globs from the list
  ([995c7b7](https://github.com/zthun/janitor/commit/995c7b730b1ad6a360b632108595c5833ee32fdb))

# [10.0.0](https://github.com/zthun/janitor/compare/v9.0.0...v10.0.0) (2021-05-08)

### Bug Fixes

- markdownlint will now properly load .markdownlint.json
  ([eefbd03](https://github.com/zthun/janitor/commit/eefbd0383346a5e7a729bb276e0735075b23503a))
- removed logging requirement
  ([6bbbf3a](https://github.com/zthun/janitor/commit/6bbbf3ad574dba7f1c959219adac0bb324620dfb))
- travis build migration to yarn
  ([8468b10](https://github.com/zthun/janitor/commit/8468b10954e046d054fbe1765ae5bfb326874ab1))

### Code Refactoring

- moving json linter into content
  ([83795c9](https://github.com/zthun/janitor/commit/83795c90ba80ba119e15011d83a6d0020b7937c4))
- move file lint report into linter
  ([09b6772](https://github.com/zthun/janitor/commit/09b677217f42ec4d0c5a71e210dfd74436f3aa78))
- move file lint to linters
  ([0c8b761](https://github.com/zthun/janitor/commit/0c8b761fb6d5f0e2471024e6297c63f8b5314a14))
- move html to content folder
  ([84eea52](https://github.com/zthun/janitor/commit/84eea52498f0c86bfa9421b429a9e7db8bfe557a))
- move yaml to content
  ([6759df5](https://github.com/zthun/janitor/commit/6759df5e7345300e0e7f18a678b8261d29aebd05))
- moved markdown lint to linter
  ([8b3de5a](https://github.com/zthun/janitor/commit/8b3de5acd705294fb84f082f461481c1e2feab64))
- moved silent lint to linter
  ([44e6932](https://github.com/zthun/janitor/commit/44e69323dbf00c2dd7a73dc04498cb7ab5d21439))
- moving eslint to linteres
  ([8f7ee7e](https://github.com/zthun/janitor/commit/8f7ee7e5c7e61cb5f85491f82768d59b63482030))
- moving style lint into linters
  ([ac22375](https://github.com/zthun/janitor/commit/ac2237537fed9be7dbf0c72835ec4c69142c5716))

### Features

- added code of conduct
  ([7f1535f](https://github.com/zthun/janitor/commit/7f1535f23d2dfeead7def3e0af9e1b6269d43813))
- added issue templates
  ([8e1bc13](https://github.com/zthun/janitor/commit/8e1bc13212e3b159af298e9917c47610cf592076))
- added prettier check support
  ([83bf62e](https://github.com/zthun/janitor/commit/83bf62eefc68629142dd134ce60cd7ef8cb5cd46))
- added shared configuration for htmlhint
  ([9bb3800](https://github.com/zthun/janitor/commit/9bb38004d9f3b5e7d427e815dedc677b41d9a449))
- added shared markdownlint config
  ([0a4f3ad](https://github.com/zthun/janitor/commit/0a4f3adc034cb1e3ecec478f1a32b5eb0a18824f))
- added shared stylelint-config
  ([9e39267](https://github.com/zthun/janitor/commit/9e39267f4edfeb5ecdaabefa27243f2c574e6408))
- added spelling lint support
  ([9053a70](https://github.com/zthun/janitor/commit/9053a70699cb1d031268d5ce21768db0b24234d7))
- added support for cosmiconfig based config reads
  ([c7f6a4c](https://github.com/zthun/janitor/commit/c7f6a4cfef4699a58e7c7c3a37f724b362b27f96))
- adding icon
  ([6934429](https://github.com/zthun/janitor/commit/693442911bba777ead403edba240022ead3e5ff9))
- adding shaed prettier config
  ([36f01fc](https://github.com/zthun/janitor/commit/36f01fc3a8cfedfb6d490a438191fc819f057f32))
- better icon
  ([f3c19d1](https://github.com/zthun/janitor/commit/f3c19d1539918df470943e2718433a62ddecda8c))
- file linting should now discover config files
  ([9a4282d](https://github.com/zthun/janitor/commit/9a4282ddeaebd38377505c54719b791317a6d756))
- removed dead code
  ([c0f33f9](https://github.com/zthun/janitor/commit/c0f33f9cfaf3f371545de664597b742fba54be2a))
- removed publish lint files
  ([848554b](https://github.com/zthun/janitor/commit/848554bca0b6964272265632abb0eb8bd10edbfe))
- silent lint can now take the resolve argument
  ([1718a2e](https://github.com/zthun/janitor/commit/1718a2e76ef97e6fd595f481a8d827c6827a9a87))
- the config reader can now take additional paths plus the standards
  ([1eea5bf](https://github.com/zthun/janitor/commit/1eea5bfe231e9b6a9f0eeee271d3e232838a1e1a))
- the cosmiconfig reader now supports module configs
  ([fbe0c65](https://github.com/zthun/janitor/commit/fbe0c6594c0c934413a42d27e4b13e83a709c076))
- the default paths for eslint and stylelint now run through each respective
  linter
  ([fb60cf8](https://github.com/zthun/janitor/commit/fb60cf8e4bc8a23ffb36e0e88224db59c4acfa49))
- the linters now look at the root of the repository
  ([901622e](https://github.com/zthun/janitor/commit/901622e07f231016c8f49a998e98b33ab36c8cd6))
- the spelling linter should now fail with issues
  ([52daeb8](https://github.com/zthun/janitor/commit/52daeb8f7b134e9b89533670f0d4d6c505269725))
- updated documentation and the config now requires typescript
  ([0956bed](https://github.com/zthun/janitor/commit/0956bed1f3c1f1a8a81296e701b34f38fc194729))
- You can now use node paths in the lint janitor config for stylelint
  ([8f829c3](https://github.com/zthun/janitor/commit/8f829c331367e1b63c323bce745d7f10c1e3fe39))
- You can now use node paths to the eslintConfig in the lint janitor config
  ([f835d3b](https://github.com/zthun/janitor/commit/f835d3b3c82566d6556c1b4b47d386bd37e7f723))
- you can simply use [@zthun](https://github.com/zthun) in extends to get all
  configuration
  ([fdb8354](https://github.com/zthun/janitor/commit/fdb8354e5589ae780ee27fdedd4ef122062b2aec))

### BREAKING CHANGES

- ZFileReportLint has been renamed to ZLinterReport
- ZFileLint has been renamed to ZLinterFile
- ZMarkdownLint has been renamed to ZLinterMarkdown
- ZStyleLint has been renamed to ZLinterStyle
- ZSilentLint has been renamed to ZLinterSilent
- ZYamlLint has been renamed to ZContentLinterYaml
- ZJsonLint has been renamed to ZContentLinterJson
- ZHtmlHint has been renamed to ZContentLinterHtml
- ZEsLint has been renamed to ZLinterEs
- These have been moved to shared configuration packages

MIGRATION: Use @zthun/eslint-config @zthun/htmlhint-config
@zthun/markdownlint-config @zthun/stylelint-config instead

- The following are no longer exported IZConfigParser ZConfigJsonParser
  ZConfigReader

MIGRATION: Just use ZConfigCosmicReader

- ZLintJanitor no longer exports DefaultHtmlHintConfig or
  DefaultMarkdownLintConfig as these will be removed.

This also add ZConfigCosmicReader and ZConfigExtender.

MIGRATION: Use null instead

- You must now have the appropriate configuration at the root of your project.

MIGRATION: You should create your own shared configuration based on the eslint,
stylelint, htmlhind, and markdownlint standards.
