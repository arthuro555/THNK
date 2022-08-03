declare namespace gdjs {
    class ShapePainterRuntimeObjectPixiRenderer {
        _object: gdjs.ShapePainterRuntimeObject;
        _graphics: PIXI.Graphics;
        /**
         * Graphics positions can need updates when shapes are added,
         * this avoids to do it each time.
         */
        _positionXIsUpToDate: boolean;
        /**
         * Graphics positions can need updates when shapes are added,
         * this avoids to do it each time.
         */
        _positionYIsUpToDate: boolean;
        /**
         * This allows to use the transformation of the renderer
         * and compute it only when necessary.
         */
        _transformationIsUpToDate: boolean;
        private static readonly _positionForTransformation;
        constructor(runtimeObject: gdjs.ShapePainterRuntimeObject, runtimeScene: gdjs.RuntimeScene);
        getRendererObject(): PIXI.Graphics;
        clear(): void;
        drawRectangle(x1: float, y1: float, x2: float, y2: float): void;
        drawCircle(x: float, y: float, radius: float): void;
        drawLine(x1: float, y1: float, x2: float, y2: float, thickness: float): void;
        drawLineV2(x1: float, y1: float, x2: float, y2: float, thickness: float): void;
        drawEllipse(x1: float, y1: float, width: float, height: float): void;
        drawRoundedRectangle(x1: float, y1: float, x2: float, y2: float, radius: float): void;
        drawStar(x1: float, y1: float, points: float, radius: float, innerRadius: float, rotation: float): void;
        drawArc(x1: float, y1: float, radius: float, startAngle: float, endAngle: float, anticlockwise: boolean, closePath: boolean): void;
        drawBezierCurve(x1: float, y1: float, cpX: float, cpY: float, cpX2: float, cpY2: float, x2: float, y2: float): void;
        drawQuadraticCurve(x1: float, y1: float, cpX: float, cpY: float, x2: float, y2: float): void;
        beginFillPath(): void;
        endFillPath(): void;
        drawPathMoveTo(x1: float, y1: float): void;
        drawPathLineTo(x1: float, y1: float): void;
        drawPathBezierCurveTo(cpX: float, cpY: float, cpX2: float, cpY2: float, toX: float, toY: float): void;
        drawPathArc(x1: float, y1: float, radius: float, startAngle: float, endAngle: float, anticlockwise: boolean): void;
        drawPathQuadraticCurveTo(cpX: float, cpY: float, toX: float, toY: float): void;
        closePath(): void;
        updateOutline(): void;
        invalidateBounds(): void;
        updatePreRender(): void;
        updatePositionX(): void;
        updatePositionY(): void;
        updatePositionIfNeeded(): void;
        updateTransformationIfNeeded(): void;
        updateRotationCenter(): void;
        updateAngle(): void;
        updateScaleX(): void;
        updateScaleY(): void;
        getDrawableX(): float;
        getDrawableY(): float;
        getWidth(): float;
        getHeight(): float;
        getUnscaledWidth(): float;
        getUnscaledHeight(): float;
        /**
         * @returns The drawing origin relatively to the drawable top left corner.
         */
        getFrameRelativeOriginX(): number;
        /**
         * @returns The drawing origin relatively to the drawable top left corner.
         */
        getFrameRelativeOriginY(): number;
        transformToDrawing(point: FloatPoint): FloatPoint;
        transformToScene(point: FloatPoint): FloatPoint;
    }
    export const ShapePainterRuntimeObjectRenderer: typeof ShapePainterRuntimeObjectPixiRenderer;
    export type ShapePainterRuntimeObjectRenderer = ShapePainterRuntimeObjectPixiRenderer;
    export {};
}
