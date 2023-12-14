declare function makePlatformerTestRuntimeScene(timeDelta?: number): any;
declare function addPlatformObject(runtimeScene: any): any;
declare function addUpSlopePlatformObject(runtimeScene: any): any;
declare function addDownSlopePlatformObject(runtimeScene: any): any;
declare function addTunnelPlatformObject(runtimeScene: any): any;
/**
 * @returns A platform with 2 hitboxes that can act as a floor and a wall at
 * the same time.
 * It can happen when a tile map collision mask object is used because all
 * the platforms are part of the same object instance.
 */
declare function addFloorAndWallPlatformObject(runtimeScene: any): any;
declare function addJumpThroughPlatformObject(runtimeScene: any): any;
declare function addLadderObject(runtimeScene: any): any;
