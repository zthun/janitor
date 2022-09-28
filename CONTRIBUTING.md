# Contributing

Thanks for taking the time to contribute! Generally, the big secret of this project is that it is mostly done as a
hobby. There is no big intention to make lint janitor the code cleanliness standard and anyone who uses it would just
have to find it useful. It is not marketed or advertised; a good product should sell itself. However, at the minimum,
people would need to know about it, so unless you are looking to make code contributions, the minimum contribution that
ANYONE can make is to let their friends know about a tool that they found helpful and provided value.

However, if you are looking to make code contributions to this repository, then this document should get you set up.

## Deployment

The point of this repository is to deploy out NPM packages. Everything here is deployed to the public
[NPM](https://npmjs.org) repository.

The intention of this is to use these packages locally so other users will be doing npm installs of individual packages
to their own repositories.

## Environment

In order to build the janitor repo, you are going to need [Node](https://nodejs.org/en/),
[Yarn](https://classic.yarnpkg.com/lang/en/), and an IDE of your choice. We generally recommend
[VisualStudio Code](https://code.visualstudio.com/) as that one has the most plugins and support to do everything you
will need. There are a couple of extensions that are highly recommended to install.

- [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
- [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
- [MarkdownLint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint)
- [Prettier](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
- [Stylelint](https://marketplace.visualstudio.com/items?itemName=stylelint.vscode-stylelint)

You'll also probably want a way to run jest based unit tests in your IDE, so it is recommended to choose one of the
following extensions.

- [Jest](https://marketplace.visualstudio.com/items?itemName=Orta.vscode-jest)
- [Jest Runner](https://marketplace.visualstudio.com/items?itemName=firsttris.vscode-jest-runner)

## Build and Debug

The following series of commands will check out and build all packages.

```sh
git clone https://github.com/zthun/janitor
yarn install
yarn make
```

If you want to step into the debugger for the lint janitor, this repository comes with the appropriate vscode
launch.json configurations to start debugging. Simply hit the run button under Launch Lint Janitor, set your breakpoints
and away you go.

## Test

Unit testing is done using jest and code coverage thresholds are set to 100%. This is done on purpose to reduce the
noise of missing tests. If you MUST write something that cannot have unit tests, then please add the istanbul ignore
pragma to the file and add a comment on why it cannot be tested.

To run the unit tests, use the following series of commands.

```sh
yarn test
```

## Versioning

This repository uses conventional commits to determine the next version to publish. Make sure before you make any
commits that you [follow this standard](https://www.conventionalcommits.org/en/v1.0.0/).

## Pull Request

Fork this repository, make any changes you need and then create a pull request from your fork. From the above samples,
you'll want to change the git clone command to point to your local repository fork. See the
[pull request template](.github/pull_request_template.md) for more information and checks to make.
