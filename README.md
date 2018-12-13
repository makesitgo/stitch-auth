# stitch auth

[mongodb stitch](https://docs.mongodb.com/stitch/) provides many features to help people connect their applications with their data.  this repo will focus on building dynamic websites without the use of a dedicated backend server.

the goal of this exercise is to have a simple browser app which includes an unprotected landing page, a login page, and a protected home page.  users will be able to sign up using an email/password and then use those credentials for subsequent visits.

## walkthrough

if you would like to follow along step-by-step, the rest of this readme will attempt to guide you through this repo as it was being written for the first time.  feel free to skip these sections and move along to the code.

### the setup

first thing's first, create a package.json using `npm init` (or however you'd like).

this simple webapp will be written in typescript and run using just `webpack-dev-server`.  to set that up, let's add the required dependencies with

```
yarn add --dev typescript tslib ts-loader webpack webpack-cli webpack-dev-server style-loader css-loader less less-loader file-loader uglifyjs-webpack-plugin @types/webpack-env
```

in addition to adding the dependencies, we'll need both `tsconfig.json` and `webpack.config.js` files.  refer to those above for suggested configurations, but feel free to adjust those as you see fit.

> NOTE: in `tsconfig.json`, the { "importHelpers": true } flag works in concert with the `tslib` dependency downloaded earlier.

before we dive in with react and the rest of the frameworks that will be leveraged in this example, let's finish off the basic setup by creating the `index.html` file.  you'll notice in the one above, a favicon is referenced, so take care to provide your own or omit that altogether.

### basic react

let's add the required dependencies first:

```
yarn add react react-dom
yarn add --dev @types/node @types/react @types/react-dom react-hot-loader
```

then simplest form of `index.tsx` to prove we are up and running could look like:

```ts
import React from 'react';
import { render } from 'react-dom';
import { AppContainer } from 'react-hot-loader';

require('../static/favicon.ico');
require('../static/main.less');

const renderApp = () => render(
  <AppContainer>
    <div>welcome to stitch auth!</div>
  </AppContainer>,
  document.getElementById('root')
);

renderApp();
```

### welcome stitch

first let's bring in the dependency:

```
yarn add mongodb-stitch-browser-sdk bson
yarn add --dev @types/bson
```

> NOTE: the BSON library may not technically be needed for the sole purposes of this repo, but it is nice to once you start reading/writing data to mongodb atlas.

did you create a stitch app yet?  at this point, to initialize the client, you'll need to provide the stitch app id.  if you have not yet done so, head over to https://cloud.mongodb.com to create one.

at that point, the way you would instantiate the stitch client is with:

```ts
const stitch = Stitch.initializeDefaultAppClient(STITCH_APP_ID);
```

### react router, redux, and thunks

before we get to doing anything truly interesting, it will be nice to set up the rest of the boilerplate required to bootstrap the webapp with frameworks capable of letting us manage state, execute async actions, and navigate around through various pages.  this walkthrough will breeze through it, simply calling out dependencies and what their purposes are.

for state management, redux is the choice.  alongside that will be redux-thunk to facilitate the execution of asynchronous actions (something the stitch client exposes plenty of).  for the state mutations themselves, some folks opt to use `immutable.js`, but this repo will instead use `immer` (nothing is fine too).  with typescript invvolved, there will also be a few libraries included that help create actions, thunks, and reducers while preserving type safety.

for routing, the standard `react-router` and `react-router-dom` will be used alongside `connected-react-router` (which then brings it into redux state).  here are the appropriate yarn commands:

```
yarn add redux redux-thunk redux-logger react-redux immer typescript-fsa typescript-fsa-reducers typescript-fsa-redux-thunk react-router react-router-dom connected-react-router history
yarn add --dev @types/history @types/react-redux @types/react-router-dom @types/react-router-redux
```
