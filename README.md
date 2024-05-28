<a href="https://www.nylas.com/">
    <img src="https://brand.nylas.com/assets/downloads/logo_horizontal_png/Nylas-Logo-Horizontal-Blue_.png" alt="Aimeos logo" title="Aimeos" align="right" height="60" />
</a>

# Nylas Node.js SDK (Legacy/API v2)

This is the legacy version of the Nylas Node.js SDK, which supports the Nylas API v2. This version of the SDK is currently in maintenance mode and is supported for the purpose of assisting with migration to the new API v3. We recommend migrating and using the current [Nylas Node.js SDK](https://www.github.com/nylas/nylas-nodejs) for the latest and greatest features.

## ⚙️ Install

To run the Nylas Node SDK, you will first need to have [Node](https://nodejs.org/en/download/) and [npm](https://www.npmjs.com/get-npm) installed on your machine.

Then, head to the nearest command line and run the following:
`npm install nylas`

Alternatively, if you prefer to use [Yarn](https://yarnpkg.com/en/), you can install the Nylas Node SDK with `yarn add nylas`

To install this package from source, clone this repo and run `npm install` from inside the project directory.

```bash
git clone https://github.com/nylas/nylas-nodejs.git
cd nylas-nodejs
npm install
```

## ⚡️ Usage

Every resource (i.e., messages, events, contacts) is accessed via an instance of `Nylas`. Before making any requests, be sure to call `config` and initialize the `Nylas` instance with your `clientId` and `clientSecret`. Then, call `with` and pass it your `accessToken`. The `accessToken` allows `Nylas` to make requests for a given account's resources.

```javascript
const Nylas = require('nylas');

Nylas.config({
  clientId: CLIENT_ID,
  clientSecret: CLIENT_SECRET,
});

const nylas = Nylas.with(ACCESS_TOKEN);
```

Then, you can use Nylas to access information about a user's account:
```javascript
nylas.threads.list({}).then(threads => {
  console.log(threads.length);
});
```

For more information about how to use the Nylas Node SDK, [take a look at our quickstart guide](https://developer.nylas.com/docs/developer-tools/sdk/node-sdk/).

## 💙 Contributing

Please refer to [Contributing](Contributing.md) for information about how to make contributions to this project. We welcome questions, bug reports, and pull requests.

## 📝 License

This project is licensed under the terms of the MIT license. Please refer to [LICENSE](LICENSE.txt) for the full terms. 


