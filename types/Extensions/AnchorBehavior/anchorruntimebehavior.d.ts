declare namespace gdjs {
    class AnchorRuntimeBehavior extends gdjs.RuntimeBehavior {
        _relativeToOriginalWindowSize: any;
        _leftEdgeAnchor: any;
        _rightEdgeAnchor: any;
        _topEdgeAnchor: any;
        _bottomEdgeAnchor: any;
        _invalidDistances: boolean;
        _leftEdgeDistance: number;
        _rightEdgeDistance: number;
        _topEdgeDistance: number;
        _bottomEdgeDistance: number;
        _useLegacyBottomAndRightAnchors: boolean;
        constructor(runtimeScene: any, behaviorData: any, owner: any);
        updateFromBehaviorData(oldBehaviorData: any, newBehaviorData: any): boolean;
        onActivate(): void;
        doStepPreEvents(runtimeScene: any): void;
        doStepPostEvents(runtimeScene: any): void;
        static HorizontalAnchor: {
            NONE: number;
            WINDOW_LEFT: number;
            WINDOW_RIGHT: number;
            PROPORTIONAL: number;
        };
        static VerticalAnchor: {
            NONE: number;
            WINDOW_TOP: number;
            WINDOW_BOTTOM: number;
            PROPORTIONAL: number;
        };
    }
}
