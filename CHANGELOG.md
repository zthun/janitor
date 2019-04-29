# Changelog
All notable changes to this project will be documented in this file.

## [7.0.2] - 2019-04-28
- Fixed a bug with the internal .eslintrc where spaces were forbidden in curly braces.

## [7.0.1] - 2019-04-26
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
