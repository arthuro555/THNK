/**
 * The `gdjs` namespace contains all classes and objects of the game engine.
 * @namespace gdjs
 */
declare namespace gdjs {
    /**
     * Contains functions used by events (this is a convention only, functions can actually
     * be anywhere).
     * @namespace
     * @memberOf gdjs
     */
    export namespace evtTools {
    }
    export const objectsTypes: Hashtable<typeof RuntimeObject>;
    export const behaviorsTypes: Hashtable<typeof RuntimeBehavior>;
    type RuntimeSceneCallback = (runtimeScene: gdjs.RuntimeScene) => void;
    type RuntimeSceneRuntimeObjectCallback = (runtimeScene: gdjs.RuntimeScene, runtimeObject: gdjs.RuntimeObject) => void;
    export const callbacksFirstRuntimeSceneLoaded: Array<RuntimeSceneCallback>;
    export const callbacksRuntimeSceneLoaded: Array<RuntimeSceneCallback>;
    export const callbacksRuntimeScenePreEvents: Array<RuntimeSceneCallback>;
    export const callbacksRuntimeScenePostEvents: Array<RuntimeSceneCallback>;
    export const callbacksRuntimeScenePaused: Array<RuntimeSceneCallback>;
    export const callbacksRuntimeSceneResumed: Array<RuntimeSceneCallback>;
    export const callbacksRuntimeSceneUnloading: Array<RuntimeSceneCallback>;
    export const callbacksRuntimeSceneUnloaded: Array<RuntimeSceneCallback>;
    export const callbacksObjectDeletedFromScene: Array<RuntimeSceneRuntimeObjectCallback>;
    /** Base64 encoded logo of GDevelop for the splash screen. */
    export let gdevelopLogo: string;
    /**
     * Convert a RGB object to a Hex string.
     *
     * No "#" or "0x" are added.
     * @param r Red
     * @param g Green
     * @param b Blue
     */
    export const rgbToHex: (r: integer, g: integer, b: integer) => string;
    /**
     * Convert a Hex string to an RGB color array [r, g, b], where each component is in the range [0, 255].
     *
     * @param {string} hex Color hexadecimal
     */
    export const hexToRGBColor: (hexString: string) => [number, number, number];
    /**
     * Convert a RGB string ("rrr;ggg;bbb") or a Hex string ("#rrggbb") to a RGB color array ([r,g,b] with each component going from 0 to 255).
     * @param value The color as a RGB string or Hex string
     */
    export const rgbOrHexToRGBColor: (value: string) => [number, number, number];
    /**
     * Convert a RGB string ("rrr;ggg;bbb") or a Hex string ("#rrggbb") to a RGB color number.
     * @param rgbOrHexString The color as a RGB string or Hex string
     */
    export const rgbOrHexStringToNumber: (rgbOrHexString: string) => integer;
    /**
     * Convert a RGB object to a Hex number.
     * @param r Red
     * @param g Green
     * @param b Blue
     */
    export const rgbToHexNumber: (r: integer, g: integer, b: integer) => integer;
    /**
     * Convert a Hex number to a RGB color array([r,g,b] with each component going from 0 to 255).
     * @param hex Hex color
     */
    export const hexNumberToRGB: (hexNumber: number) => {
        r: integer;
        g: integer;
        b: integer;
        a: integer;
    };
    /**
     * Get a random integer between 0 and max.
     * @param max The maximum value (inclusive).
     */
    export const random: (max: float) => float;
    /**
   * Get a random integer between min and max.
   * @param min The minimum value (inclusive).
   * @param max The maximum value (inclusive).
  
   */
    export const randomInRange: (min: float, max: float) => float;
    /**
     * Get a random float in the range 0 to less than max (inclusive of 0, but not max).
     * @param max The maximum value (exclusive).
     */
    export const randomFloat: (max: float) => float;
    /**
     * Get a random float between min and max
     * @param min The minimum value (inclusive).
     * @param max The maximum value (exclusive).
     * @returns {number}
     */
    export const randomFloatInRange: (min: float, max: float) => float;
    /**
     * Get a random number between min and max in steps
     * @param min The minimum value (inclusive).
     * @param max The maximum value (inclusive).
     * @param step The interval between each value.
     * @returns {number}
     */
    export const randomWithStep: (min: float, max: float, step: float) => float;
    /**
     * Convert an angle in degrees to radians.
     * @param angleInDegrees The angle in degrees.
     */
    export const toRad: (angleInDegrees: float) => float;
    /**
     * Convert an angle in radians to degrees.
     * @param angleInRadians The angle in radians.
     */
    export const toDegrees: (angleInRadians: float) => float;
    /**
     * Register a runtime object (class extending {@link gdjs.RuntimeObject}) that can be used in a scene.
     *
     * The name of the type of the object must be complete, with the namespace if any. For
     * example, if you are providing a Text object in the TextObject extension, the full name
     * of the type of the object is "TextObject::Text".
     *
     * @param objectTypeName The name of the type of the Object.
     * @param Ctor The constructor of the Object.
     */
    export const registerObject: (objectTypeName: string, Ctor: typeof gdjs.RuntimeObject) => void;
    /**
     * Register a runtime behavior (class extending {@link gdjs.RuntimeBehavior}) that can be used by a
     * {@link gdjs.RuntimeObject}.
     *
     * The type of the behavior must be complete, with the namespace of the extension. For
     * example, if you are providing a Draggable behavior in the DraggableBehavior extension,
     * the full name of the type of the behavior is "DraggableBehavior::Draggable".
     *
     * @param behaviorTypeName The name of the type of the behavior.
     * @param Ctor The constructor of the Object.
     */
    export const registerBehavior: (behaviorTypeName: string, Ctor: typeof gdjs.RuntimeBehavior) => void;
    /**
     * Register a function to be called when the first {@link gdjs.RuntimeScene} is loaded, after
     * resources loading is done. This can be considered as the "start of the game".
     *
     * @param callback The function to be called.
     */
    export const registerFirstRuntimeSceneLoadedCallback: (callback: RuntimeSceneCallback) => void;
    /**
     * Register a function to be called when a scene is loaded.
     * @param callback The function to be called.
     */
    export const registerRuntimeSceneLoadedCallback: (callback: RuntimeSceneCallback) => void;
    /**
     * Register a function to be called each time a scene is stepped (i.e: at every frame),
     * before events are run.
     * @param callback The function to be called.
     */
    export const registerRuntimeScenePreEventsCallback: (callback: RuntimeSceneCallback) => void;
    /**
     * Register a function to be called each time a scene is stepped (i.e: at every frame),
     * after events are run and before rendering.
     * @param callback The function to be called.
     */
    export const registerRuntimeScenePostEventsCallback: (callback: RuntimeSceneCallback) => void;
    /**
     * Register a function to be called when a scene is paused.
     * @param callback The function to be called.
     */
    export const registerRuntimeScenePausedCallback: (callback: RuntimeSceneCallback) => void;
    /**
     * Register a function to be called when a scene is resumed.
     * @param callback The function to be called.
     */
    export const registerRuntimeSceneResumedCallback: (callback: RuntimeSceneCallback) => void;
    /**
     * Register a function to be called when a scene unload started. This is
     * before the object deletion and renderer destruction. It is safe to
     * manipulate these. It is **not** be safe to release resources as other
     * callbacks might do operations on objects or the scene.
     *
     * @param callback The function to be called.
     */
    export const registerRuntimeSceneUnloadingCallback: (callback: RuntimeSceneCallback) => void;
    /**
     * Register a function to be called when a scene is unloaded. The objects
     * and renderer are now destroyed - it is **not** safe to do anything apart
     * from releasing resources.
     *
     * @param callback The function to be called.
     */
    export const registerRuntimeSceneUnloadedCallback: (callback: RuntimeSceneCallback) => void;
    /**
     * Register a function to be called when an object is deleted from a scene.
     * @param callback The function to be called.
     */
    export const registerObjectDeletedFromSceneCallback: (callback: RuntimeSceneRuntimeObjectCallback) => void;
    /**
     * Unregister a callback.
     * This should not be used apart from the code generated from extensions
     * events functions, to handle hot-reloading.
     * In any other case, a callback should be registered once, and only once.
     *
     * @internal
     */
    export const _unregisterCallback: (callback: unknown) => void;
    /**
     * Keep this function until we're sure now client is using it anymore.
     * @deprecated
     * @private
     */
    export const registerGlobalCallbacks: () => void;
    /**
     * Get the constructor of an object.
     *
     * @param name The name of the type of the object.
     */
    export const getObjectConstructor: (name: string) => typeof gdjs.RuntimeObject;
    /**
     * Get the constructor of a behavior.
     *
     * @param name The name of the type of the behavior.
     */
    export const getBehaviorConstructor: (name: string) => typeof gdjs.RuntimeBehavior;
    /**
     * Create a static array that won't need a new allocation each time it's used.
     * @param owner The owner of the Array.
     */
    export const staticArray: (owner: any) => Array<any>;
    /**
     * Create a second static array that won't need a new allocation each time it's used.
     * @param owner The owner of the Array.
     */
    export const staticArray2: (owner: any) => Array<any>;
    /**
     * Create a static object that won't need a new allocation each time it's used.
     * @param owner The owner of the Array.
     */
    export const staticObject: (owner: any) => Object;
    /**
     * Return a new array of objects that is the concatenation of all the objects passed
     * as parameters.
     * @param objectsLists
     * @returns {Array}
     */
    export const objectsListsToArray: (objectsLists: Hashtable<RuntimeObject>) => Array<RuntimeObject>;
    /**
     * Copy the element for the first array into the second array, so that
     * both array contains the same elements.
     * @param src The source array
     * @param dst The destination array
     */
    export const copyArray: <T>(src: T[], dst: T[]) => void;
    interface MakeUUID {
        (): string;
        hex?: string[];
    }
    /**
     * Generate a UUID v4.
     * @returns The generated UUID.
     */
    export const makeUuid: MakeUUID;
    /**
     * See https://floating-point-gui.de/errors/comparison/
     * @param a
     * @param b
     * @param epsilon the relative margin error
     * @returns true when a and b are within a relative margin error.
     */
    export const nearlyEqual: (a: float, b: float, epsilon: float) => boolean;
    export {};
}
