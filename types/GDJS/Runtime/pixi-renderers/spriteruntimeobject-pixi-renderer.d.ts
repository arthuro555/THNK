declare namespace gdjs {
    /**
     * The renderer for a gdjs.SpriteRuntimeObject using Pixi.js.
     */
    class SpriteRuntimeObjectPixiRenderer {
        _object: gdjs.SpriteRuntimeObject;
        _spriteDirty: boolean;
        _textureDirty: boolean;
        _sprite: PIXI.Sprite;
        _cachedWidth: float;
        _cachedHeight: float;
        /**
         * @param runtimeObject The object
         * @param instanceContainer The scene
         */
        constructor(runtimeObject: gdjs.SpriteRuntimeObject, instanceContainer: gdjs.RuntimeInstanceContainer);
        reinitialize(runtimeObject: gdjs.SpriteRuntimeObject, instanceContainer: gdjs.RuntimeInstanceContainer): void;
        getRendererObject(): import("pixi.js").Sprite;
        /**
         * Update the internal PIXI.Sprite position, angle...
         */
        _updatePIXISprite(): void;
        /**
         * Call this to make sure the sprite is ready to be rendered.
         */
        ensureUpToDate(): void;
        /**
         * Update the internal texture of the PIXI sprite.
         */
        updateFrame(animationFrame: any): void;
        update(): void;
        updateX(): void;
        updateY(): void;
        updateAngle(): void;
        updateOpacity(): void;
        updateVisibility(): void;
        setColor(rgbColor: any): void;
        getColor(): string;
        getWidth(): float;
        getHeight(): float;
        getUnscaledWidth(): float;
        getUnscaledHeight(): float;
        static getAnimationFrame(imageManager: gdjs.PixiImageManager, imageName: string): import("pixi.js").Texture<import("pixi.js").Resource>;
        static getAnimationFrameWidth(pixiTexture: PIXI.Texture): number;
        static getAnimationFrameHeight(pixiTexture: PIXI.Texture): number;
    }
    const SpriteRuntimeObjectRenderer: typeof SpriteRuntimeObjectPixiRenderer;
    type SpriteRuntimeObjectRenderer = SpriteRuntimeObjectPixiRenderer;
}
