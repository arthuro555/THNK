declare namespace gdjs {
    class Model3DRuntimeObject3DRenderer extends gdjs.RuntimeObject3DRenderer {
        private _model3DRuntimeObject;
        /**
         * The 3D model stretched in a 1x1x1 cube.
         */
        private _threeObject;
        private _originalModel;
        private _animationMixer;
        private _action;
        /**
         * The model origin evaluated according to the object configuration.
         *
         * Coordinates are between 0 and 1.
         */
        private _modelOriginPoint;
        constructor(runtimeObject: gdjs.Model3DRuntimeObject, instanceContainer: gdjs.RuntimeInstanceContainer);
        updateAnimation(timeDelta: float): void;
        updatePosition(): void;
        getOriginPoint(): [number, number, number];
        getCenterPoint(): [number, number, number];
        private _updateDefaultTransformation;
        _updateModel(rotationX: float, rotationY: float, rotationZ: float, originalWidth: float, originalHeight: float, originalDepth: float, keepAspectRatio: boolean): void;
        /**
         * Replace materials to better work with lights (or no light).
         */
        private _replaceMaterials;
        getAnimationCount(): number;
        getAnimationName(animationIndex: integer): string;
        /**
         * Return true if animation has ended.
         * The animation had ended if:
         * - it's not configured as a loop;
         * - the current frame is the last frame;
         * - the last frame has been displayed long enough.
         */
        hasAnimationEnded(): boolean;
        animationPaused(): boolean | undefined;
        pauseAnimation(): void;
        resumeAnimation(): void;
        playAnimation(animationName: string, shouldLoop: boolean): void;
        getAnimationElapsedTime(): float;
        setAnimationElapsedTime(time: float): void;
        getAnimationDuration(animationName: string): float;
    }
    export const Model3DRuntimeObjectRenderer: typeof Model3DRuntimeObject3DRenderer;
    export type Model3DRuntimeObjectRenderer = Model3DRuntimeObject3DRenderer;
    export {};
}
