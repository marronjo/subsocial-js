[![subsocialjs](https://img.shields.io/badge/subsocial-js-pink?style=flat-square)](https://subsocial.network/)
![license](https://img.shields.io/badge/License-GPL%3.0-blue?logo=gpl&style=flat-square)
[![npm](https://img.shields.io/npm/v/@subsocial/api?logo=npm&style=flat-square)](https://www.npmjs.com/package/@subsocial/api)

# Subsocial API by [DappForce](https://github.com/dappforce)

JavaScript API wrappers for Substrate and IPFS specific to Subsocial blockchain.

## Install

Using npm:

```bash
npm i @subsocial/api
```

Using yarn:

```bash
yarn add @subsocial/api
```

NOTE:

To run this API you need to have [Substrate](https://substrate.dev/en/) node, [IPFS](https://ipfs.io/) node
and off-chain app running locally, suggested URLs are below

## Getting Started :hammer:

```javascript
import { SubSocialApi } from "@subsocial/api";
import { getApi } from //SUBSTRATE CONNECT?
import BN from 'bn.js';

//local URLs
const ipfsNodeUrl = 'http://localhost:8080'
const offchainUrl = 'http://localhost:3001'

//connect to substrate
const substrateApi = await getApi();

//make connection to SubSocial
const api = new SubsocialApi({ substrateApi, ipfsNodeUrl, offchainUrl });

//generate spaceID and find specified space
const spaceId = new BN(1)
const space = await api.findSpace(spaceId);

//prints space information to console
console.log('Found space:', { ...space });
```

## License

Subsocial is [GPL 3.0](./LICENSE) licensed. :page_facing_up:
