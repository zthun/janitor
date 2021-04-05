# Janitor

A janitor (American English, Scottish English), custodian, porter, cleaner or caretaker is a person who cleans and maintains buildings such as hospitals, schools, and residential accommodations ([Wikipedia](https://en.wikipedia.org/wiki/Janitor)).

When we talk about code cleanliness, we usually are referring to coding styles and formats the keep coding projects understandable to those who work on them.

It is not only important that your code works, but it is also important that your code is somewhat clean. This leads to less bugs, less complaints, and less rot.

This repository contains series of tools and configurations that help with code cleanliness. By keeping our code clean and consistent, we can focus on writing high quality working code without worrying about how it looks.

## Projects

- [@zthun/lint-janitor](packages/lint-janitor)
  - An aggregate linter that keeps the total number of lint applications in check.
- [@zthun/eslint-config](packages/eslint-config)
  - A shared configuration for eslint for @zthun scoped projects.
- [@zthun/htmlhint-config](packages/htmlhint-config)
  - A shared configuration for htmlhint for @zthun scoped projects.
  - Not standard however, and not fully supported by the htmlhint application.
- [@zthun/markdownlint-config](packages/markdownlint-config)
  - A shared configuration for markdownlint for @zthun scoped projects
- [@zthun/prettier-config](packages/prettier-config)
  - A shared formatting configuration for @zthun scoped projects.
- [@zthun/stylelint-config](packages/stylelint-config)
  - A shared configuration for stylelint for @zthun scoped projects.

## Contributions

See [Contributing](Contributions.md) for info on how to contribute.
