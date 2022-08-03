declare namespace gdjs {
    class ShopifyClientsManager {
        static set(runtimeScene: any, name: any, shopifyClient: any): void;
        static get(runtimeScene: any, name: any): any;
    }
    namespace evtTools {
        namespace shopify {
            const buildClient: (runtimeScene: any, name: any, domain: any, appId: any, accessToken: any) => void;
            const getCheckoutUrlForProduct: (runtimeScene: any, name: any, productId: any, quantity: any, variantIndex: any, successVariable: any, errorVariable: any) => void;
        }
    }
}
