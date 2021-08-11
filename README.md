# FlagClicked

FlagClicked's main repository. This is currently in the works - it will change regularly.
FlagClicked is a Nuxt.js-based application using MongoDB

## Build Setup

2 things you need before being installed on your computer before beginning:

#### Node.js and npm (npm is included with node)

https://nodejs.org/en/download/current/

### MongoDB
We use mongodb to store data (our database)
https://www.mongodb.com/try/download/community

If you don't want to install MongoDB: Use the free MongoDB atlas plan.

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
# yarn is the same thing as yarn install
yarn
```

then run one of the following commands:

```bash
# Developing
yarn dev

# build for production and launch server
yarn build
yarn start
```

If you get an error that says something like:

> File \_\_ cannot be loaded because running scripts is disabled on this system

run the following script, then try again.

```powershell
set-ExecutionPolicy RemoteSigned -Scope CurrentUser
```

For detailed explanation on how things work, checkout the [Nuxt.js docs](https://nuxtjs.org).
