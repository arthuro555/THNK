declare namespace gdjs {
    type LightObjectDataType = {
        /** The base parameters of light object. */
        content: {
            /** The radius of light object. */
            radius: number;
            /** A string representing color in hexadecimal format. */
            color: string;
            /** A string representing the name of texture used for light object. */
            texture: string;
            /** true if the light objects shows debug graphics, false otherwise. */
            debugMode: boolean;
        };
    };
    type LightObjectData = ObjectData & LightObjectDataType;
    /**
     * Displays a Light object.
     */
    class LightRuntimeObject extends gdjs.RuntimeObject {
        _radius: number;
        /** color in format [r, g, b], where each component is in the range [0, 255] */
        _color: integer[];
        _debugMode: boolean;
        _texture: string;
        _obstaclesManager: gdjs.LightObstaclesManager;
        _renderer: gdjs.LightRuntimeObjectRenderer;
        _runtimeScene: gdjs.RuntimeScene;
        constructor(runtimeScene: gdjs.RuntimeScene, lightObjectData: LightObjectData);
        static hexToRGBColor(hex: any): number[];
        getRendererObject(): PIXI.Mesh | null | PIXI.Container;
        updateFromObjectData(oldObjectData: LightObjectData, newObjectData: LightObjectData): boolean;
        updatePreRender(): void;
        /**
         * Get the radius of the light object.
         * @returns radius of the light object.
         */
        getRadius(): number;
        /**
         * Set the radius of the light object.
         */
        setRadius(radius: number): void;
        /**
         * Get the height of the light object.
         * @returns height of light object.
         */
        getHeight(): float;
        /**
         * Get the width of the light object.
         * @returns width of light object.
         */
        getWidth(): float;
        /**
         * Get the x co-ordinate of the top-left vertex/point of light object.
         * @returns x co-ordinate of the top-left vertex/point.
         */
        getDrawableX(): float;
        /**
         * Get the y co-ordinate of the top-left vertex/point of light object.
         * @returns y co-ordinate of the top-left vertex/point.
         */
        getDrawableY(): float;
        /**
         * Get the color of the light object as a "R;G;B" string.
         * @returns the color of light object in "R;G;B" format.
         */
        getColor(): string;
        /**
         * Set the color of the light object in format "R;G;B" string, with components in the range of [0-255].
         */
        setColor(color: string): void;
        /**
         * Get the light obstacles manager.
         * @returns the light obstacles manager.
         */
        getObstaclesManager(): gdjs.LightObstaclesManager;
        /**
         * Returns true if the light shows debug graphics, false otherwise.
         * @returns true if debug mode is activated.
         */
        getDebugMode(): boolean;
        /**
         * Returns the path of texture resource.
         * @returns the path of texture.
         */
        getTexture(): string;
    }
}
