"use strict";

import { Network } from "@ethersproject/networks";
import { ConnectionInfo } from "@ethersproject/web";

import { Logger } from "@ethersproject/logger";
import { version } from "./_version";
const logger = new Logger(version);

import { UrlJsonRpcProvider } from "./url-json-rpc-provider";

const defaultApplicationId = "5f3ab133f7ca96c59972ff51"
const defaultLoadBalancer = "5f7c8e5edb07b3eabd388511"

enum EndpointType {
    LoadBalancer = "LoadBalancer",
    Application = "Application"
}

export class PocketGatewayProvider extends UrlJsonRpcProvider {
    
    static getApiKey(apiKey: any): any {
        let apiKeyObj = PocketApiKeyObject.build(apiKey);
        return apiKeyObj;
    }

    static getUrl(network: Network, apiKey: any): ConnectionInfo {
        let host: string = null;
        switch (network ? network.name : "unknown") {
            case "homestead":
                host = "eth-mainnet.gateway.pokt.network";
                break;
            default:
                logger.throwError("unsupported network", Logger.errors.INVALID_ARGUMENT, {
                    argument: "network",
                    value: network
                });
        }

        const connection: ConnectionInfo = {
            url: PocketApiKeyObject.getUrl(apiKey, host),
        };

        // Initialize empty headers
        connection.headers = {}

        // Apply application secret key
        if (apiKey.applicationSecretKey != null) {
            connection.user = "";
            connection.password = apiKey.applicationSecretKey
        }

        return connection;
    }

    isCommunityResource(): boolean {
        return (this.applicationId === defaultApplicationId);
    }
}

export class PocketApiKeyObject {
    clientID: string = defaultLoadBalancer;
    endpointType: string = EndpointType.LoadBalancer;
    applicationSecretKey: string = null;
    applicationOrigin: string = null;
    applicationUserAgent: string = null;

    static build(apiKey: any): PocketApiKeyObject {
        if(apiKey == null)
            return new PocketApiKeyObject();

        var apiKeyObj = new PocketApiKeyObject();
        
        // Parse Origin
        if (typeof (apiKey.applicationOrigin) === "string") {
            apiKeyObj.applicationOrigin = apiKey.applicationOrigin;
        }
        // Parse User Agent
        if (typeof (apiKey.applicationUserAgent) === "string") {
            apiKeyObj.applicationUserAgent = apiKey.applicationUserAgent;
        }

        if (typeof (apiKey.endpointType) === "string") {
            switch (apiKey.endpointType.toLowerCase()) {
                case "application":
                    apiKeyObj.endpointType = EndpointType.Application
                    apiKeyObj.clientID = defaultApplicationId;
                    break;
                default:
                    apiKeyObj.endpointType = EndpointType.LoadBalancer
                    apiKeyObj.clientID = defaultLoadBalancer;
                    break;
            }
        }

        switch (true) {
            case typeof (apiKey) === "string":
                apiKeyObj.clientID = apiKey;
                break;
            case apiKey.applicationSecretKey != null:
                logger.assertArgument((typeof (apiKey.clientID) === "string"), "applicationSecretKey requires an clientID", "clientID", apiKey.clientID);
                logger.assertArgument((typeof (apiKey.applicationSecretKey) === "string"), "invalid applicationSecretKey", "applicationSecretKey", "[*********]");
                apiKeyObj.clientID = apiKey.clientID;
                apiKeyObj.applicationSecretKey = apiKey.applicationSecretKey;
                break;
            case apiKey.clientID:
                apiKeyObj.clientID = apiKey;
                break;
        }

        return apiKeyObj;
    }
    
    static getUrl(apiKey: any, host: string): string {
        var url: string = ("https:/" + "/" + host + "/v1/lb/" + apiKey.clientID)

        if (typeof (apiKey.endpointType) === "string" && apiKey.endpointType.toLowerCase() === "application") {
            url = ("https:/" + "/" + host + "/v1/" + apiKey.clientID)
        }

        return url
    }
}
