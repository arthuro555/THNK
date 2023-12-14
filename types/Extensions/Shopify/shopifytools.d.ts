declare namespace gdjs {
    interface RuntimeGame {
        shopifyClients: {
            [name: string]: any;
        };
    }
    class ShopifyClientsManager {
        static set(instanceContainer: gdjs.RuntimeInstanceContainer, name: string, shopifyClient: any): void;
        static get(instanceContainer: gdjs.RuntimeInstanceContainer, name: string): any;
    }
    namespace evtTools {
        namespace shopify {
            const buildClient: (instanceContainer: gdjs.RuntimeInstanceContainer, name: string, domain: string, appId: string, accessToken: string) => void;
            const getCheckoutUrlForProduct: (instanceContainer: gdjs.RuntimeInstanceContainer, name: string, productId: string, quantity: number, variantIndex: number, successVariable: gdjs.Variable, errorVariable: gdjs.Variable) => void;
        }
    }
}
