declare namespace gdjs {
    class PanelSpriteRuntimeObjectPixiRenderer {
        _object: gdjs.PanelSpriteRuntimeObject;
        /**
         * The _wrapperContainer must be considered as the main container of this object
         * All transformations are applied on this container
         * See updateOpacity for more info why.
         */
        _wrapperContainer: PIXI.Container;
        /**
         * The _spritesContainer is used to create the sprites and apply cacheAsBitmap only.
         */
        _spritesContainer: PIXI.Container;
        _centerSprite: PIXI.Sprite | PIXI.TilingSprite;
        _borderSprites: Array<PIXI.Sprite | PIXI.TilingSprite>;
        _wasRendered: boolean;
        _textureWidth: number;
        _textureHeight: number;
        constructor(runtimeObject: gdjs.PanelSpriteRuntimeObject, runtimeScene: gdjs.RuntimeScene, textureName: string, tiled: boolean);
        getRendererObject(): PIXI.Container;
        ensureUpToDate(): void;
        updateOpacity(): void;
        updateAngle(): void;
        updatePosition(): void;
        _updateLocalPositions(): void;
        _updateSpritesAndTexturesSize(): void;
        setTexture(textureName: any, runtimeScene: any): void;
        updateWidth(): void;
        updateHeight(): void;
        setColor(rgbColor: any): void;
        getColor(): string;
        getTextureWidth(): number;
        getTextureHeight(): number;
    }
    export const PanelSpriteRuntimeObjectRenderer: typeof PanelSpriteRuntimeObjectPixiRenderer;
    export type PanelSpriteRuntimeObjectRenderer = PanelSpriteRuntimeObjectPixiRenderer;
    export {};
}
