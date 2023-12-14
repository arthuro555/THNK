declare namespace gdjs {
    namespace steamworks {
        function getControllerCount(): integer;
        function activateActionSet(controllerIndex: number, actionSetName: string): void;
        function isDigitalActionPressed(controllerIndex: number, actionName: string): boolean;
        function getAnalogActionVectorX(controllerIndex: number, actionName: string): float;
        function getAnalogActionVectorY(controllerIndex: number, actionName: string): float;
    }
}
