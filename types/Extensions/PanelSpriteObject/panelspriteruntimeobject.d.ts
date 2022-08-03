declare namespace gdjs {
    type PanelSpriteObjectDataType = {
        /** The right margin */
        rightMargin: number;
        /** The left margin */
        leftMargin: number;
        /** The top margin */
        topMargin: number;
        /** The bottom margin */
        bottomMargin: number;
        /** Are the central part and borders tiled? */
        tiled: boolean;
        /** The object width */
        width: number;
        /** The object height */
        height: number;
        /** The name of the resource containing the texture to use */
        texture: string;
    };
    type PanelSpriteObjectData = ObjectData & PanelSpriteObjectDataType;
    /**
     * The PanelSpriteRuntimeObject displays a tiled texture.
     */
    class PanelSpriteRuntimeObject extends gdjs.RuntimeObject {
        _rBorder: integer;
        _lBorder: integer;
        _tBorder: integer;
        _bBorder: integer;
        _tiled: boolean;
        opacity: float;
        _width: float;
        _height: float;
        _renderer: gdjs.PanelSpriteRuntimeObjectRenderer;
        /**
         * @param runtimeScene The scene the object belongs to.
         * @param panelSpriteObjectData The initial properties of the object
         */
        constructor(runtimeScene: gdjs.RuntimeScene, panelSpriteObjectData: PanelSpriteObjectData);
        updateFromObjectData(oldObjectData: PanelSpriteObjectData, newObjectData: PanelSpriteObjectData): boolean;
        getRendererObject(): PIXI.Container;
        onDestroyFromScene(runtimeScene: any): void;
        update(runtimeScene: gdjs.RuntimeScene): void;
        /**
         * Initialize the extra parameters that could be set for an instance.
         */
        extraInitializationFromInitialInstance(initialInstanceData: InstanceData): void;
        /**
         * Set the x position of the panel sprite.
         * @param x The new x position in pixels.
         */
        setX(x: float): void;
        /**
         * Set the y position of the panel sprite.
         * @param y The new y position in pixels.
         */
        setY(y: float): void;
        /**
         * Set the texture of the panel sprite.
         * @param textureName The name of the texture.
         * @param runtimeScene The scene the object lives in.
         */
        setTexture(textureName: string, runtimeScene: gdjs.RuntimeScene): void;
        /**
         * Set the angle of the panel sprite.
         * @param angle The new angle in degrees.
         */
        setAngle(angle: float): void;
        /**
         * Get the width of the panel sprite in pixels
         * @return The width in pixels
         */
        getWidth(): float;
        /**
         * Get the height of the panel sprite in pixels
         * @return The height in pixels
         */
        getHeight(): float;
        /**
         * Set the width of the panel sprite.
         * @param width The new width in pixels.
         */
        setWidth(width: float): void;
        /**
         * Set the height of the panel sprite.
         * @param height The new height in pixels.
         */
        setHeight(height: float): void;
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
         * Change the tint of the panel sprite object.
         *
         * @param rgbColor The color, in RGB format ("128;200;255").
         */
        setColor(rgbColor: string): void;
        /**
         * Get the tint of the panel sprite object.
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
