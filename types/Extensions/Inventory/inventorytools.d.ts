declare namespace gdjs {
    class InventoryManager {
        static get(runtimeScene: any, name: any): gdjs.Inventory;
    }
    namespace evtTools {
        namespace inventory {
            const add: (runtimeScene: any, inventoryName: any, name: any) => boolean;
            const remove: (runtimeScene: any, inventoryName: any, name: any) => boolean;
            const count: (runtimeScene: any, inventoryName: any, name: any) => any;
            const has: (runtimeScene: any, inventoryName: any, name: any) => boolean;
            const setMaximum: (runtimeScene: any, inventoryName: any, name: any, maxCount: any) => void;
            const setUnlimited: (runtimeScene: any, inventoryName: any, name: any, enable: any) => void;
            const isFull: (runtimeScene: any, inventoryName: any, name: any) => boolean;
            const equip: (runtimeScene: any, inventoryName: any, name: any, equip: any) => boolean;
            const isEquipped: (runtimeScene: any, inventoryName: any, name: any) => boolean;
            const serializeToVariable: (runtimeScene: any, inventoryName: string, variable: gdjs.Variable) => void;
            const unserializeFromVariable: (runtimeScene: any, inventoryName: string, variable: gdjs.Variable) => void;
        }
    }
}
