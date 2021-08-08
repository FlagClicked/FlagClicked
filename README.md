# FlagClicked

FlagClicked's main repository. This is currently in the works - it will change regularly.
This frontend is built with Nuxt.js (a vue framework).
The backend can be found [here](https://github.com/FlagClicked/Backend).

## Build Setup

2 things you need before being installed on your computer before beginning.

#### npm

https://nodejs.org/en/download/current/

### MongoDB

https://www.mongodb.com/try/download/community

Then, make sure you have yarn installed.

```bash
yarn --version
```

If you get an error from this script, then run the following:

```bash
npm install --global yarn
```

Once yarn is installed, run:

```bash
yarn install
```

then run one of the following commands:

```bash
# Developing
yarn run dev

# build for production and launch server
yarn run build
yarn start

# generate static project
yarn run generate
```

If you get an error that says something like:

> File \_\_ cannot be loaded because running scripts is disabled on this system

run the following script, then try again.

```bash
set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).
