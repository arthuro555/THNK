declare namespace gdjs {
    /**
     * A dummy object doing showing a text on screen.
     * @ignore
     */
    class DummyRuntimeObject extends gdjs.RuntimeObject {
        _property1: string;
        _renderer: any;
        opacity: float;
        constructor(instanceContainer: gdjs.RuntimeInstanceContainer, objectData: any);
        getRendererObject(): any;
        updateFromObjectData(oldObjectData: any, newObjectData: any): boolean;
        /**
         * Called once during the game loop, before events and rendering.
         * @param instanceContainer The gdjs.RuntimeScene the object belongs to.
         */
        update(instanceContainer: gdjs.RuntimeInstanceContainer): void;
        /**
         * Initialize the extra parameters that could be set for an instance.
         */
        extraInitializationFromInitialInstance(initialInstanceData: InstanceData): void;
        /**
         * Update the object position.
         */
        private _updatePosition;
        /**
         * Set object position on X axis.
         */
        setX(x: float): void;
        /**
         * Set object position on Y axis.
         */
        setY(y: float): void;
        /**
         * Set the angle of the object.
         * @param angle The new angle of the object
         */
        setAngle(angle: float): void;
        /**
         * Set object opacity.
         */
        setOpacity(opacity: any): void;
        /**
         * Get object opacity.
         */
        getOpacity(): number;
        /**
         * Get the text that must be displayed by the dummy object.
         */
        getText(): string;
        /**
         * A dummy method that can be called from events
         */
        myMethod(number1: float, text1: string): void;
    }
}
