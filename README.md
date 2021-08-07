# FlagClicked

FlagClicked's main repository. This is currently in the works - it will change regularly.
This frontend is built with Nuxt.js (a vue framework).
The backend can be found [here](https://github.com/FlagClicked/Backend).

## Build Setup

First, make sure you have yarn installed.
```bash
yarn --version
```
If you get an error from this script, then run the following:
```bash
npm install --global yarn
```
Once yarn is installed, you can run this with one of these three commands.
```bash
# Developing
yarn install
yarn run dev

# build for production and launch server
yarn run build
yarn start

# generate static project
yarn run generate
```
If you get an error that says something like:
> File __ cannot be loaded because running scripts is disabled on this system

run the following script, then try again.
```bash
set-ExecutionPolicy RemoteSigned -Scope CurrentUser 
```


For detailed explanation on how things work, checkout [Nuxt.js docs](https://nuxtjs.org).
