# Local Development

## Prerequisites

Host OS Services

-   Docker

Host OS Binaries

-   make [https://www.gnu.org/software/make/](https://www.gnu.org/software/make/)
-   ddev [https://ddev.readthedocs.io/en/latest/](https://ddev.readthedocs.io/en/latest/)

## Setup

Go to Bitwarden, and add the contents of "<project-name> env" to a local `.env` file.

Run `make install`.

This command will:
- Spin up the DDEV project (`ddev start`).
- Run an initial build of frontend assets (js and styles).
- Bootstrap CraftCMS with a default "triptych" user. You can find login credentials for this user in Bitwarden

## Commands

`make up`

1. Checks if ddev is running
2. Starts ddev project
3. Installs composer dependencies.
4. Installs node dependencies.

`make build`

1. Runs `make up`
2. Runs `ddev exec yarn build`.
3. Runs `node viteDevServerToggle.js 0 && vite build` from within container. This will update the `USE_VITE_DEV_SERVER` environement variable stored in `.env`. There's no need to manage that variable yourself. Aftwards, vite builds production ready bundles of js/sass assets.

`make dev`

1. Runs `make up`
2. Runs `ddev yarn dev` which starts the vite dev server. Under the hood, yarn is running `node emptyDistDir.js && node viteDevServerToggle.js 1 && vite --host`. This cleans the `/web/dist` directory, sets the appropriate value for `USE_VITE_DEV_SERVER`, removes trailing slash from `PRIMARY_SITE_URL`, then launches the vite dev server running on the Docker container as host.

`make install`

1. Runs `make up`
2. Runs `make build`
3. Runs install commands for CraftCMS via the CLI
	- `ddev craft setup/security-key`
	- `ddev craft setup/db-creds --interactive=0 --database=db --user=db --password=db`
	- `ddev craft install --interactive=0 --email=${EMAIL} --username=${USERNAME} --password=${PASSWORD} --siteName=${SITENAME} --siteUrl=${PRIMARY_SITE_URL}`
	- `ddev craft project-config/apply`

## Using NodeJS

Seeing a `package.json` file in the root of this project may tempt to you run node processes on your host machine. (e.g `yarn add ...`)

**DON'T DO IT! YOU'RE GONNA HAVE A BAD TIME!**

Instead, only run node processes from within a ddev docker container. To do that, make sure your ddev environement is running with `make up`, then you can install any node packages you need with `ddev yarn add <your-package-name>`.

## VS Code Extensions
When you first open this project, VS Code should prompt you to install recommended extensions. **DO IT**. Especially make sure you install the `mblode.twig-language-2` extension, sense this will be the default formatter for twig files in this project. If you accidentally skip the prompt to install extensions, you can find all the extensions IDs you need to search for yourself by looking in `./.vscode/extensions.json`.

## Frontend
This project has opinionated lint rules for writing Typescript. **Don't worry about fighting them**. VS Code will auto fix lint errors for you on save. If you encounter a rule that you feel needs to be changed, bring it up to the team, and then we can discuss whether or not we should add an exception/modification to the rules in the `.eslintrc.cjs` file. More than likely, if you encounter something that forces you to deviate from the lint rules, just use eslint ignore comments.

E.g.
```ts
// eslint-disable-next-line
let foo = "bar";

// or
/* eslint-disable */
let bar = "bazz"

// ... more code you probably shouldn't be writing, but you gotta get this done...

/* eslint-enable */
```

## Importing Content

We have installed the Zen plugin so that we can easily import/export content between environments. Files have been attached to bitwarden under "RTC Zen Content". To import, log into the CMS and click on "Zen" on the sidebar. There should be a section on the left to import the zip file.