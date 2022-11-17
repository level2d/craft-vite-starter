# Local Development

## Prerequisites
Host OS Services
- Docker

Host OS Binaries
- make [https://www.gnu.org/software/make/](https://www.gnu.org/software/make/)
- ddev [https://ddev.readthedocs.io/en/latest/](https://ddev.readthedocs.io/en/latest/)

## Setup
Run `make install` and follow all prompts

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
1. Runs `make up` then `make build`
2. Runs `ddev exec yarn dev` which starts the vite dev server. Under the hood, yarn is running `node emptyDistDir.js && node viteDevServerToggle.js 1 && vite --host`. This cleans the `/web/dist` directory, sets the appropriate value for `USE_VITE_DEV_SERVER`, then launches the vite dev server running on the Docker container as host.

`make install`
1. Runs `make up`
2. Runs `make build`
3. Runs `ddev php craft` install commands and takes you through the craft cms cli installer

## Using NodeJS
Seeing a `package.json` file in the root of this project may tempt to you run node processes 
on your host machine. (e.g `yarn add ...`)

**DON'T DO IT! YOU'RE GONNA HAVE A BAD TIME!**  

Instead, only run node processes from within a ddev docker container. To do that, make sure your ddev environement is running with `make up`, then you can install any node packages you need with `ddev yarn add <your-package-name>`.
