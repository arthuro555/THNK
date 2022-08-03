declare namespace gdjs {
    /** Represents a color in RGB Format */
    type RGBColor = {
        /** The Red component of the color, from 0 to 255. */
        r: integer;
        /** The Green component of the color, from 0 to 255. */
        g: integer;
        /** The Blue component of the color, from 0 to 255. */
        b: integer;
    };
    /** Initial properties for a for {@link gdjs.ShapePainterRuntimeObject}. */
    type ShapePainterObjectDataType = {
        /** The color (in RGB format) of the inner part of the painted shape */
        fillColor: RGBColor;
        /** The color (in RGB format) of the outline of the painted shape */
        outlineColor: RGBColor;
        /** The opacity of the inner part of the painted shape, from 0 to 255 */
        fillOpacity: float;
        /** The opacity of the outline of the painted shape, from 0 to 255 */
        outlineOpacity: float;
        /** The size of the outline of the painted shape, in pixels. */
        outlineSize: float;
        /** Use absolute coordinates? */
        absoluteCoordinates: boolean;
        /** Clear the previous render before the next draw? */
        clearBetweenFrames: boolean;
    };
    type ShapePainterObjectData = ObjectData & ShapePainterObjectDataType;
    /**
     * The ShapePainterRuntimeObject allows to draw graphics shapes on screen.
     */
    class ShapePainterRuntimeObject extends gdjs.RuntimeObject {
        _scaleX: number;
        _scaleY: number;
        _blendMode: number;
        _flippedX: boolean;
        _flippedY: boolean;
        _customCenter: FloatPoint | null;
        _customCollisionMask: Polygon[] | null;
        _fillColor: integer;
        _outlineColor: integer;
        _fillOpacity: float;
        _outlineOpacity: float;
        _outlineSize: float;
        _useAbsoluteCoordinates: boolean;
        _clearBetweenFrames: boolean;
        _renderer: gdjs.ShapePainterRuntimeObjectRenderer;
        private static readonly _pointForTransformation;
        /**
         * @param runtimeScene The scene the object belongs to.
         * @param shapePainterObjectData The initial properties of the object
         */
        constructor(runtimeScene: gdjs.RuntimeScene, shapePainterObjectData: ShapePainterObjectData);
        getRendererObject(): PIXI.Graphics;
        updateFromObjectData(oldObjectData: ShapePainterObjectData, newObjectData: ShapePainterObjectData): boolean;
        stepBehaviorsPreEvents(runtimeScene: gdjs.RuntimeScene): void;
        /**
         * Clear the graphics.
         */
        clear(): void;
        getVisibilityAABB(): AABB | null;
        drawRectangle(x1: float, y1: float, x2: float, y2: float): void;
        drawCircle(x: float, y: float, radius: float): void;
        drawLine(x1: float, y1: float, x2: float, y2: float, thickness: float): void;
        drawLineV2(x1: float, y1: float, x2: float, y2: float, thickness: float): void;
        drawEllipse(centerX: float, centerY: float, width: float, height: float): void;
        drawRoundedRectangle(startX1: float, startY1: float, endX2: float, endY2: float, radius: float): void;
        drawStar(centerX: float, centerY: float, points: float, radius: float, innerRadius: float, rotation: float): void;
        drawArc(centerX: float, centerY: float, radius: float, startAngle: float, endAngle: float, anticlockwise: boolean, closePath: boolean): void;
        drawBezierCurve(x1: float, y1: float, cpX: float, cpY: float, cpX2: float, cpY2: float, x2: float, y2: float): void;
        drawQuadraticCurve(x1: float, y1: float, cpX: float, cpY: float, x2: float, y2: float): void;
        beginFillPath(x1: float, y1: float): void;
        endFillPath(): void;
        drawPathMoveTo(x1: float, y1: float): void;
        drawPathLineTo(x1: float, y1: float): void;
        drawPathBezierCurveTo(cpX: float, cpY: float, cpX2: float, cpY2: float, toX: float, toY: float): void;
        drawPathArc(cx: float, cy: float, radius: float, startAngle: float, endAngle: float, anticlockwise: boolean): void;
        drawPathQuadraticCurveTo(cpX: float, cpY: float, toX: float, toY: float): void;
        closePath(): void;
        setClearBetweenFrames(value: boolean): void;
        isClearedBetweenFrames(): boolean;
        setCoordinatesRelative(value: boolean): void;
        areCoordinatesRelative(): boolean;
        /**
         *
         * @param rgbColor semicolon separated decimal values
         */
        setFillColor(rgbColor: string): void;
        getFillColorR(): integer;
        getFillColorG(): integer;
        getFillColorB(): integer;
        /**
         *
         * @param rgbColor semicolon separated decimal values
         */
        setOutlineColor(rgbColor: string): void;
        getOutlineColorR(): integer;
        getOutlineColorG(): integer;
        getOutlineColorB(): integer;
        setOutlineSize(size: float): void;
        getOutlineSize(): number;
        /**
         *
         * @param opacity from 0 to 255
         */
        setFillOpacity(opacity: float): void;
        /**
         *
         * @returns an opacity value from 0 to 255.
         */
        getFillOpacity(): number;
        /**
         *
         * @param opacity from 0 to 255
         */
        setOutlineOpacity(opacity: float): void;
        /**
         *
         * @returns an opacity value from 0 to 255.
         */
        getOutlineOpacity(): number;
        setX(x: float): void;
        setY(y: float): void;
        setAngle(angle: float): void;
        /**
         * The center of rotation is defined relatively
         * to the drawing origin (the object position).
         * This avoid the center to move on the drawing
         * when new shapes push the bounds.
         *
         * When no custom center is defined, it will move
         * to stay at the center of the drawable bounds.
         *
         * @param x coordinate of the custom center
         * @param y coordinate of the custom center
         */
        setRotationCenter(x: float, y: float): void;
        /**
         * @returns The center X relatively to the drawing origin
         * (whereas `getCenterX()` is relative to the top left drawable bound and scaled).
         */
        getRotationCenterX(): float;
        /**
         * @returns The center Y relatively to the drawing origin
         * (whereas `getCenterY()` is relative to the top left drawable bound and scaled).
         */
        getRotationCenterY(): float;
        getCenterX(): float;
        getCenterY(): float;
        /**
         * Change the width of the object. This changes the scale on X axis of the object.
         *
         * @param newWidth The new width of the object, in pixels.
         */
        setWidth(newWidth: float): void;
        /**
         * Change the height of the object. This changes the scale on Y axis of the object.
         *
         * @param newHeight The new height of the object, in pixels.
         */
        setHeight(newHeight: float): void;
        /**
         * Change the scale on X and Y axis of the object.
         *
         * @param newScale The new scale (must be greater than 0).
         */
        setScale(newScale: float): void;
        /**
         * Change the scale on X axis of the object (changing its width).
         *
         * @param newScale The new scale (must be greater than 0).
         */
        setScaleX(newScale: float): void;
        /**
         * Change the scale on Y axis of the object (changing its width).
         *
         * @param newScale The new scale (must be greater than 0).
         */
        setScaleY(newScale: float): void;
        flipX(enable: boolean): void;
        flipY(enable: boolean): void;
        isFlippedX(): boolean;
        isFlippedY(): boolean;
        /**
         * Get the scale of the object (or the geometric mean of the X and Y scale in case they are different).
         *
         * @return the scale of the object (or the geometric mean of the X and Y scale in case they are different).
         */
        getScale(): number;
        /**
         * Get the scale of the object on Y axis.
         *
         * @return the scale of the object on Y axis
         */
        getScaleY(): float;
        /**
         * Get the scale of the object on X axis.
         *
         * @return the scale of the object on X axis
         */
        getScaleX(): float;
        invalidateBounds(): void;
        getDrawableX(): float;
        getDrawableY(): float;
        getWidth(): float;
        getHeight(): float;
        updatePreRender(runtimeScene: gdjs.RuntimeScene): void;
        transformToDrawing(x: float, y: float): FloatPoint;
        transformToScene(x: float, y: float): FloatPoint;
        transformToDrawingX(x: float, y: float): number;
        transformToDrawingY(x: float, y: float): number;
        transformToSceneX(x: float, y: float): number;
        transformToSceneY(x: float, y: float): number;
        setRectangularCollisionMask(left: float, top: float, right: float, bottom: float): void;
        updateHitBoxes(): void;
    }
}
