declare namespace gdjs {
    class Inventory {
        _items: any;
        constructor();
        clear(): void;
        has(itemName: any): boolean;
        count(itemName: any): any;
        add(itemName: any): boolean;
        setCount(itemName: any, count: any): void;
        isFull(itemName: any): boolean;
        remove(itemName: any): boolean;
        setMaximum(itemName: any, maxCount: any): void;
        setUnlimited(itemName: any, enable: any): void;
        _makeItemEntry(itemName: any): void;
        equip(itemName: any, equip: any): boolean;
        isEquipped(itemName: any): boolean;
        getAllItems(): any;
    }
}
