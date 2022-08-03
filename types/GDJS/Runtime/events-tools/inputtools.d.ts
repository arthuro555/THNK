declare namespace gdjs {
    namespace evtTools {
        namespace input {
            /**
             * @deprecated
             */
            let lastTouchId: number;
            /**
             * @deprecated
             */
            let lastEndedTouchId: number;
            /**
             * Hashmap associated each name of a key to its location-aware keyCode.
             * @memberof gdjs.evtTools
             */
            const keysNameToCode: {
                a: number;
                b: number;
                c: number;
                d: number;
                e: number;
                f: number;
                g: number;
                h: number;
                i: number;
                j: number;
                k: number;
                l: number;
                m: number;
                n: number;
                o: number;
                p: number;
                q: number;
                r: number;
                s: number;
                t: number;
                u: number;
                v: number;
                w: number;
                x: number;
                y: number;
                z: number;
                Num0: number;
                Num1: number;
                Num2: number;
                Num3: number;
                Num4: number;
                Num5: number;
                Num6: number;
                Num7: number;
                Num8: number;
                Num9: number;
                Numpad0: number;
                Numpad1: number;
                Numpad2: number;
                Numpad3: number;
                Numpad4: number;
                Numpad5: number;
                Numpad6: number;
                Numpad7: number;
                Numpad8: number;
                Numpad9: number;
                LShift: number;
                RShift: number;
                LControl: number;
                RControl: number;
                LAlt: number;
                RAlt: number;
                LSystem: number;
                RSystem: number;
                SemiColon: number;
                Comma: number;
                Period: number;
                Quote: number;
                Slash: number;
                BackSlash: number;
                Equal: number;
                Dash: number;
                Menu: number;
                LBracket: number;
                RBracket: number;
                Tilde: number;
                Space: number;
                Back: number;
                Tab: number;
                Delete: number;
                Insert: number;
                Escape: number;
                PageUp: number;
                PageDown: number;
                End: number;
                Home: number;
                Return: number;
                NumpadPageUp: number;
                NumpadPageDown: number;
                NumpadEnd: number;
                NumpadHome: number;
                NumpadReturn: number;
                Add: number;
                Subtract: number;
                Multiply: number;
                Divide: number;
                NumpadAdd: number;
                NumpadSubtract: number;
                NumpadMultiply: number;
                NumpadDivide: number;
                Left: number;
                Up: number;
                Right: number;
                Down: number;
                NumpadLeft: number;
                NumpadUp: number;
                NumpadRight: number;
                NumpadDown: number;
                F1: number;
                F2: number;
                F3: number;
                F4: number;
                F5: number;
                F6: number;
                F7: number;
                F8: number;
                F9: number;
                F10: number;
                F11: number;
                F12: number;
                Pause: number;
            };
            /**
             * Return true if the specified key is pressed
             *
             */
            const isKeyPressed: (runtimeScene: any, key: any) => any;
            /**
             * Return true if the specified key was just released
             *
             */
            const wasKeyReleased: (runtimeScene: any, key: any) => any;
            /**
             * Return the name of the last key pressed in the game
             */
            const lastPressedKey: (runtimeScene: any) => any;
            const anyKeyPressed: (runtimeScene: any) => any;
            const anyKeyReleased: (runtimeScene: any) => any;
            const isMouseButtonPressed: (runtimeScene: any, button: any) => any;
            const isMouseButtonReleased: (runtimeScene: any, button: any) => any;
            const hideCursor: (runtimeScene: any) => void;
            const showCursor: (runtimeScene: any) => void;
            const getMouseWheelDelta: (runtimeScene: any) => any;
            const isScrollingUp: (runtimeScene: any) => any;
            const isScrollingDown: (runtimeScene: any) => any;
            const getMouseX: (runtimeScene: any, layer: any, camera: any) => any;
            const getMouseY: (runtimeScene: any, layer: any, camera: any) => any;
            const isMouseInsideCanvas: (runtimeScene: gdjs.RuntimeScene) => boolean;
            const _cursorIsOnObject: (obj: any, runtimeScene: any) => any;
            const cursorOnObject: (objectsLists: any, runtimeScene: any, accurate: any, inverted: any) => boolean;
            const getTouchX: (runtimeScene: gdjs.RuntimeScene, identifier: integer, layer: string, camera: integer) => number;
            const getTouchY: (runtimeScene: gdjs.RuntimeScene, identifier: integer, layer: string, camera: integer) => number;
            const hasAnyTouchStarted: (runtimeScene: gdjs.RuntimeScene) => boolean;
            const getStartedTouchCount: (runtimeScene: gdjs.RuntimeScene) => integer;
            const getStartedTouchIdentifier: (runtimeScene: gdjs.RuntimeScene, index: integer) => integer;
            const hasTouchEnded: (runtimeScene: gdjs.RuntimeScene, identifier: integer) => boolean;
            /**
             * @deprecated
             */
            const getLastTouchId: () => number;
            /**
             * @deprecated
             */
            const getLastEndedTouchId: () => number;
            /**
             * @deprecated
             */
            const popStartedTouch: (runtimeScene: gdjs.RuntimeScene) => boolean;
            /**
             * @deprecated
             */
            const popEndedTouch: (runtimeScene: gdjs.RuntimeScene) => boolean;
            const touchSimulateMouse: (runtimeScene: any, enable: any) => void;
        }
    }
}
