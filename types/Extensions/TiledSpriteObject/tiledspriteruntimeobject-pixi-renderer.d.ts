declare namespace gdjs {
    class TiledSpriteRuntimeObjectPixiRenderer {
        _object: gdjs.TiledSpriteRuntimeObject;
        _tiledSprite: PIXI.TilingSprite;
        constructor(runtimeObject: gdjs.TiledSpriteRuntimeObject, runtimeScene: gdjs.RuntimeScene, textureName: string);
        getRendererObject(): PIXI.TilingSprite;
        updateOpacity(): void;
        updatePosition(): void;
        setTexture(textureName: any, runtimeScene: any): void;
        updateAngle(): void;
        getWidth(): float;
        getHeight(): float;
        setWidth(width: any): void;
        setHeight(height: any): void;
        updateXOffset(): void;
        updateYOffset(): void;
        setColor(rgbColor: any): void;
        getColor(): string;
        getTextureWidth(): number;
        getTextureHeight(): number;
    }
    export const TiledSpriteRuntimeObjectRenderer: typeof TiledSpriteRuntimeObjectPixiRenderer;
    export type TiledSpriteRuntimeObjectRenderer = TiledSpriteRuntimeObjectPixiRenderer;
    export {};
}
