# Changelog

All notable changes to this project will be documented in this file.

## [8.0.0] - UNRELEASED

### Added

- Added support for linting less, css, sass, scss and other style files using style-lint.
- Added support for linting markdown files using markdownlint.

### Changed

- [BREAKING] - ZLint is now ZLintJanitor
- [MIGRATION] - Replace all instance of ZLint, IZLintArgs, and IZLintOptions with ZLintJanitor, IZLintJanitorArgs, and IZLintJanitorOptions respectively.
- [BREAKING] - ZSilentLinter is now ZSilentLint.
- [MIGRATION] - Replace all instance of ZSilentLinter with ZSilentLint.
- [BREAKING] - Renamed package to @zthun/lint-janitor.
- [MIGRATION] - Uninstall @zthun/web-styles and install @zthun/lint-janitor instead.
- [BREAKING] - Renamed the application executable to lint-janitor.
- [MIGRATION] - Change zlint to lint-janitor and all .zlint based files to lint-janitor.
- Fixed a bug where the config.js based config was not loading.

### Removed

- [BREAKING] - Ts file globs are no longer supported in the config file.
- [MIGRATION] - Use esFiles instead.
- [BREAKING] - Sass file globs are no longer supported in the config file.
- [MIGRATION] - Use style files instead.

## [7.1.1] - 2019-08-22

### Changed

- Updated dependencies to fix a critical security vulnerability.
- Acorn is now a hard dependency.

## [7.1.0] - 2019-05-02

### Added

- Added support for a .zlintrc config file
- Added support for a .zlintrc.json config file
- Added support for a .zlintrc.js config file
- Added support for a .zlintrc.config.js config file.

### Changed

- Installed latest dependencies

## [7.0.2] - 2019-04-28

### Changed

- Fixed a bug with the internal .eslintrc where spaces were forbidden in curly braces.

## [7.0.1] - 2019-04-26

### Changed

- Updated all dependencies to the latest versions to resolve security errors.

## [7.0.0] - 2019-02-25

### Changed

- Updated all dependencies to the latest versions
- Updated the typescript rule set to remove rules that match the recommended.
- Fixed a bug in the tslint phase which caused the linter to not look at the recommended rules.
- The globstar pattern should now reflect at the root directory.

### Removed

- Removed the IZEsLintEngineFactory interface.
- Removed the ZEsLintEngineFactory class.
- Removed the IZTsLinterFactory interface.
- Removed the ZTsLinterFactory class.

## [6.1.1] - 2018-10-28

### Changed

- Fixed the package index exports to include ts lint source.

## [6.1.0] - 2018-10-28

### Added

- Added the zlint binary command which smart lints your entire project using one command and one config file.

## [6.0.0] - 2018-10-20

### Added

- Added changelog tracking

### Changed

- Updated eslint to 5.7.0
- Updated htmlhint to 0.10.1
- Updated tslint to 5.11.0
- Updated typescript to 3.1.3

### Removed

- Removed the lint/.sasslint.yml file and renamed it to the standard lint/.sass-lint.yml file
