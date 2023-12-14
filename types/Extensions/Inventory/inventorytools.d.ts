declare namespace gdjs {
    interface RuntimeGame {
        inventories: {
            [name: string]: gdjs.Inventory;
        };
    }
    class InventoryManager {
        static get(instanceContainer: gdjs.RuntimeInstanceContainer, name: string): gdjs.Inventory;
    }
    namespace evtTools {
        namespace inventory {
            const add: (instanceContainer: gdjs.RuntimeInstanceContainer, inventoryName: string, name: string) => boolean;
            const remove: (instanceContainer: gdjs.RuntimeInstanceContainer, inventoryName: string, name: string) => boolean;
            const count: (instanceContainer: gdjs.RuntimeInstanceContainer, inventoryName: string, name: string) => any;
            const maximum: (instanceContainer: gdjs.RuntimeInstanceContainer, inventoryName: string, name: string) => any;
            const has: (instanceContainer: gdjs.RuntimeInstanceContainer, inventoryName: string, name: string) => boolean;
            const setMaximum: (instanceContainer: gdjs.RuntimeInstanceContainer, inventoryName: string, name: string, maxCount: number) => void;
            const setUnlimited: (instanceContainer: gdjs.RuntimeInstanceContainer, inventoryName: string, name: string, enable: boolean) => void;
            const isFull: (instanceContainer: gdjs.RuntimeInstanceContainer, inventoryName: string, name: string) => boolean;
            const equip: (instanceContainer: gdjs.RuntimeInstanceContainer, inventoryName: string, name: string, equip: boolean) => boolean;
            const isEquipped: (instanceContainer: gdjs.RuntimeInstanceContainer, inventoryName: string, name: string) => boolean;
            const serializeToVariable: (instanceContainer: gdjs.RuntimeInstanceContainer, inventoryName: string, variable: gdjs.Variable) => void;
            const unserializeFromVariable: (instanceContainer: gdjs.RuntimeInstanceContainer, inventoryName: string, variable: gdjs.Variable) => void;
        }
    }
}
