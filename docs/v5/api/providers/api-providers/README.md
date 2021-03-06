-----

Documentation: [html](https://docs.ethers.io/)

-----

API Providers
=============

EtherscanProvider
-----------------

#### **new ***ethers* . *providers* . **EtherscanProvider**( [ network = "homestead" , [ apiKey ] ] )

Create a new **EtherscanProvider** connected to *network* with the optional *apiKey*.

The *network* may be specified as a **string** for a common network name, a **number** for a common chain ID or a [Network Object]provider-(network).

If no *apiKey* is provided, a shared API key will be used, which may result in reduced performance and throttled requests. It is highly recommended for production, you register with [Etherscan](https://etherscan.io) for your own API key.


#### Note: Default API keys

If no *apiKey* is provided, a shared API key will be used, which may result in reduced performance and throttled requests.

It is highly recommended for production, you register with [Etherscan](https://etherscan.io) for your own API key.


#### **Supported Networks**

- Homestead (Mainnet) 
- Ropsten (proof-of-work testnet) 
- Rinkeby (proof-of-authority testnet) 
- Gorli (clique testnet) 
- Kovan (proof-of-authority testnet) 




```javascript
// <hide>
const EtherscanProvider = ethers.providers.EtherscanProvider;
const apiKey = "...";
// </hide>

// Connect to mainnet (homestead)
provider = new EtherscanProvider();

// Connect to rinkeby testnet (these are equivalent)
provider = new EtherscanProvider("rinkeby");
provider = new EtherscanProvider(4);

const network = ethers.providers.getNetwork("rinkeby");
// <hide>
delete network._defaultProvider;
network
// </hide>
//!

provider = new EtherscanProvider(network);

// Connect to mainnet (homestead) with an API key
provider = new EtherscanProvider(null, apiKey);
provider = new EtherscanProvider("homestead", apiKey);
```

#### *provider* . **getHistory**( address ) => *Array< History >*

@TODO... Explain


PocketGatewayProvider
---------------------

#### **new ***ethers* . *providers* . **PocketGatewayProvider**( [ network = "homestead" , [ apiKey ] ] )

Create a new **PocketGatewayProvider** connected to *network* with the optional *apiKey*.

The *network* may be specified as **string** for a common network name, a **number** for a common chain ID or a [Network Object]provider-(network).

Depending on how you configure your Application in the Pocket Network Gateway the *apiKey* can be one of:

- **string**: In this case this will be assumed to be the `applicationID` property of your application. 
- **object**: In this case you will be required one of the following combinations: 
- `applicationID`: If you only specify this property this will have the same effect as passing it as a **string**. 
- `applicationID` and `applicationSecretKey`: If you specify the `applicationSecretKey`, you also need to specify the `applicationID` property. 
- `applicationOrigin`: By specifying this property you are setting the `Origin` header in your request (remember that browsers will swap this header based on the actual origin of the website loaded). 
- `applicationUserAgent`: By specifying this property you are setting the `User-Agent` header in your request. 
- `endpointType`: By specifying this property you can select to connect via the Pocket Gateway Single Application endpoint or a Load Balancer Endpoint (defaults to Load Balancer) 



The *network* and *apiKey* are specified the same as [the constructor](/v5/api/providers/api-providers/#PocketGatewayProvider).


#### Note: Default API keys

In the event of the *apiKey* not being present in the constructor, a shared ApplicationID will be provided, which has the capacity of sending up to 10 million requests per day (417,500 per hour) for Ethereum Mainnet, for Ropsten, Rinkeby and Gorli there's a shared capacity of 1 million requests per day each (41,750 per hour).

For production applications it is highly recommended to register your application on the [Pocket Gateway](https://pokt.network/pocket-gateway-ethereum-mainnet/) for your own API key.


#### **Supported Networks**

- Homestead (Mainnet Full nodes (non-Archival Nodes)) 
- Ropsten (proof-of-work testnet) 
- Rinkeby (proof-of-authority testnet) 
- Gorli (clique testnet) 




```javascript
// <hide>
const PocketGatewayProvider = ethers.providers.PocketGatewayProvider;
const applicationId = "...";
const applicationSecretKey = "...";
const applicationOrigin = "...";
const applicationUserAgent = "...";
// Endpoint Type can be either application or loadbalancer
const endpointType = "...";
// </hide>

// Connect to mainnet (homestead)
provider = new PocketGatewayProvider();

// Connect to mainnet with a Project ID (these are equivalent)
provider = new PocketGatewayProvider(null, applicationId);
provider = new PocketGatewayProvider("homestead", applicationId);

// Connect to mainnet with a Project ID and Project Secret
provider = new PocketGatewayProvider("homestead", {
    applicationId: applicationId,
    applicationSecretKey: applicationSecretKey,
    applicationOrigin: applicationOrigin,
    applicationUserAgent: applicationUserAgent,
    endpointType: endpointType
});
```

InfuraProvider
--------------

#### **new ***ethers* . *providers* . **InfuraProvider**( [ network = "homestead" , [ apiKey ] ] )

Create a new **InfuraProvider** connected to *network* with the optional *apiKey*.

The *network* may be specified as a **string** for a common network name, a **number** for a common chain ID or a [Network Object]provider-(network).

The *apiKey* can be a **string** Project ID or an **object** with the properties `projectId` and `projectSecret` to specify a [Project Secret](https://infura.io/docs/gettingStarted/authentication) which can be used on non-public sources (like on a server) to further secure your API access and quotas.


#### *InfuraProvider* . **getWebSocketProvider**( [ network [ , apiKey ] ] ) => *[WebSocketProvider](/v5/api/providers/other/#WebSocketProvider)*

Create a new [WebSocketProvider](/v5/api/providers/other/#WebSocketProvider) using the INFURA web-socket endpoint to connect to *network* with the optional *apiKey*.

The *network* and *apiKey* are specified the same as [the constructor](/v5/api/providers/api-providers/#InfuraProvider).


#### Note: Default API keys

If no *apiKey* is provided, a shared API key will be used, which may result in reduced performance and throttled requests.

It is highly recommended for production, you register with [INFURA](https://infura.io) for your own API key.


#### **Supported Networks**

- Homestead (Mainnet) 
- Ropsten (proof-of-work testnet) 
- Rinkeby (proof-of-authority testnet) 
- Gorli (clique testnet) 
- Kovan (proof-of-authority testnet) 




```javascript
// <hide>
const InfuraProvider = ethers.providers.InfuraProvider;
const projectId = "...";
const projectSecret = "...";
// </hide>

// Connect to mainnet (homestead)
provider = new InfuraProvider();

// Connect to the ropsten testnet
// (see EtherscanProvider above for other network examples)
provider = new InfuraProvider("ropsten");

// Connect to mainnet with a Project ID (these are equivalent)
provider = new InfuraProvider(null, projectId);
provider = new InfuraProvider("homestead", projectId);

// Connect to mainnet with a Project ID and Project Secret
provider = new InfuraProvider("homestead", {
    projectId: projectId,
    projectSecret: projectSecret
});

// Connect to the INFURA WebSocket endpoints with a WebSocketProvider
provider = InfuraProvider.getWebSocketProvider()
// <hide>
provider.destroy();
// </hide>
```

AlchemyProvider
---------------

#### **new ***ethers* . *providers* . **AlchemyProvider**( [ network = "homestead" , [ apiKey ] ] )

Create a new **AlchemyProvider** connected to *network* with the optional *apiKey*.

The *network* may be specified as a **string** for a common network name, a **number** for a common chain ID or a [Network Object](/v5/api/providers/types/#providers-Network).


#### Note: Default API keys

If no *apiKey* is provided, a shared API key will be used, which may result in reduced performance and throttled requests.

It is highly recommended for production, you register with [Alchemy](https://alchemyapi.io) for your own API key.


#### **Supported Networks**

- Homestead (Mainnet) 
- Ropsten (proof-of-work testnet) 
- Rinkeby (proof-of-authority testnet) 
- Gorli (clique testnet) 
- Kovan (proof-of-authority testnet) 




```javascript
// <hide>
const AlchemyProvider = ethers.providers.AlchemyProvider;
const apiKey = "...";
// </hide>

// Connect to mainnet (homestead)
provider = new AlchemyProvider();

// Connect to the ropsten testnet
// (see EtherscanProvider above for other network examples)
provider = new AlchemyProvider("ropsten");

// Connect to mainnet with an API key (these are equivalent)
provider = new AlchemyProvider(null, apiKey);
provider = new AlchemyProvider("homestead", apiKey);

// Connect to the Alchemy WebSocket endpoints with a WebSocketProvider
provider = AlchemyProvider.getWebSocketProvider()
// <hide>
provider.destroy();
// </hide>
```

CloudflareProvider
------------------

#### **new ***ethers* . *providers* . **CloudflareProvider**( )

Create a new **CloudflareProvider** connected to mainnet (i.e. "homestead").


#### **Supported Networks**

- Homestead (Mainnet) 




```javascript
// <hide>
const CloudflareProvider = ethers.providers.CloudflareProvider;
// </hide>

// Connect to mainnet (homestead)
provider = new CloudflareProvider();
```

