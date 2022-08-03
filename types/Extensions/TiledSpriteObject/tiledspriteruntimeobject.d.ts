declare namespace gdjs {
    /** Initial properties for a Tiled Sprite object */
    type TiledSpriteObjectDataType = {
        /** Default width of the object, if the instance has no custom width. */
        width: number;
        /** Default height of the object, if the instance has no custom height. */
        height: number;
        texture: string;
    };
    type TiledSpriteObjectData = ObjectData & TiledSpriteObjectDataType;
    /**
     * The TiledSpriteRuntimeObject displays a tiled texture.
     */
    class TiledSpriteRuntimeObject extends gdjs.RuntimeObject {
        _xOffset: float;
        _yOffset: float;
        opacity: float;
        _width: float;
        _height: float;
        _renderer: gdjs.TiledSpriteRuntimeObjectRenderer;
        /**
         * @param runtimeScene The scene the object belongs to.
         * @param tiledSpriteObjectData The initial properties of the object
         */
        constructor(runtimeScene: gdjs.RuntimeScene, tiledSpriteObjectData: TiledSpriteObjectData);
        updateFromObjectData(oldObjectData: any, newObjectData: any): boolean;
        getRendererObject(): PIXI.TilingSprite;
        onDestroyFromScene(runtimeScene: any): void;
        /**
         * Initialize the extra parameters that could be set for an instance.
         */
        extraInitializationFromInitialInstance(initialInstanceData: InstanceData): void;
        /**
         * Set the X position of the Tiled Sprite object.
         * @param x The new X position.
         */
        setX(x: float): void;
        /**
         * Set the Y position of the Tiled Sprite object.
         * @param y The new Y position.
         */
        setY(y: float): void;
        /**
         * Assign a new texture to the Tiled Sprite object.
         * @param textureName The name of the image texture ressource.
         * @param runtimeScene The scene in which the texture is used.
         */
        setTexture(textureName: string, runtimeScene: gdjs.RuntimeScene): void;
        /**
         * Set the angle of the Tiled Sprite object.
         * @param angle The new angle.
         */
        setAngle(angle: float): void;
        /**
         * Get the width of the Tiled Sprite object.
         * @returns The width of the Tiled Sprite object
         */
        getWidth(): float;
        /**
         * Get the height of the Tiled Sprite object.
         * @returns The height of the Tiled Sprite object
         */
        getHeight(): float;
        /**
         * Set the width of the Tiled Sprite object.
         * @param width The new width.
         */
        setWidth(width: float): void;
        /**
         * Set the height of the Tiled Sprite object.
         * @param height The new height.
         */
        setHeight(height: float): void;
        /**
         * Set the size of the Tiled Sprite object.
         * @param width The new width.
         * @param height The new height.
         */
        setSize(width: float, height: float): void;
        /**
         * Set the offset on the X-axis when displaying the image of the Tiled Sprite object.
         * @param xOffset The new offset on the X-axis.
         */
        setXOffset(xOffset: number): void;
        /**
         * Set the offset on the Y-axis when displaying the image of the Tiled Sprite object.
         * @param yOffset The new offset on the Y-axis.
         */
        setYOffset(yOffset: number): void;
        /**
         * Get the offset on the X-axis of the Tiled Sprite object.
         * @returns The offset on the X-axis
         */
        getXOffset(): number;
        /**
         * Get the offset on the Y-axis of the Tiled Sprite object.
         * @returns The offset on the Y-axis
         */
        getYOffset(): number;
        /**
         * Change the transparency of the object.
         * @param opacity The new opacity, between 0 (transparent) and 255 (opaque).
         */
        setOpacity(opacity: float): void;
        /**
         * Get the transparency of the object.
         * @return The opacity, between 0 (transparent) and 255 (opaque).
         */
        getOpacity(): number;
        /**
         * Change the tint of the tiled sprite object.
         *
         * @param rgbColor The color, in RGB format ("128;200;255").
         */
        setColor(rgbColor: string): void;
        /**
         * Get the tint of the tiled sprite object.
         *
         * @returns The color, in RGB format ("128;200;255").
         */
        getColor(): string;
        /**
         * Get scale of the tiled sprite object.
         */
        getScale(): float;
        /**
         * Get x-scale of the tiled sprite object.
         */
        getScaleX(): float;
        /**
         * Get y-scale of the tiled sprite object.
         */
        getScaleY(): float;
        /**
         * Set the tiled sprite object scale.
         * @param newScale The new scale for the tiled sprite object.
         */
        setScale(newScale: float): void;
        /**
         * Set the tiled sprite object x-scale.
         * @param newScale The new x-scale for the tiled sprite object.
         */
        setScaleX(newScale: float): void;
        /**
         * Set the tiled sprite object y-scale.
         * @param newScale The new y-scale for the tiled sprite object.
         */
        setScaleY(newScale: float): void;
    }
}
