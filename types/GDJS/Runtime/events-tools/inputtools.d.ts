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
             * A hashmap associates each name of a mouse button with its respective code.
             * @memberof gdjs.evtTools
             */
            const mouseButtonsNameToCode: {
                Left: number;
                Right: number;
                Middle: number;
                Back: number;
                Forward: number;
            };
            /**
             * Return true if the specified key is pressed
             *
             */
            const isKeyPressed: (instanceContainer: gdjs.RuntimeInstanceContainer, key: string) => boolean;
            /**
             * Return true if the specified key was just released
             *
             */
            const wasKeyReleased: (instanceContainer: gdjs.RuntimeInstanceContainer, key: string) => boolean;
            /**
             * Return the name of the last key pressed in the game
             */
            const lastPressedKey: (instanceContainer: gdjs.RuntimeInstanceContainer) => any;
            const anyKeyPressed: (instanceContainer: gdjs.RuntimeInstanceContainer) => boolean;
            const anyKeyReleased: (instanceContainer: gdjs.RuntimeInstanceContainer) => boolean;
            const isMouseButtonPressed: (instanceContainer: gdjs.RuntimeInstanceContainer, button: string) => boolean;
            const isMouseButtonReleased: (instanceContainer: gdjs.RuntimeInstanceContainer, button: string) => boolean;
            const hideCursor: (instanceContainer: gdjs.RuntimeScene) => void;
            const showCursor: (instanceContainer: gdjs.RuntimeScene) => void;
            const getMouseWheelDelta: (instanceContainer: gdjs.RuntimeInstanceContainer) => number;
            const isScrollingUp: (instanceContainer: gdjs.RuntimeInstanceContainer) => boolean;
            const isScrollingDown: (instanceContainer: gdjs.RuntimeInstanceContainer) => boolean;
            /**
             * @deprecated Use getCursorX instead.
             */
            const getMouseX: (instanceContainer: gdjs.RuntimeInstanceContainer, layer: string, camera: integer) => number;
            /**
             * @deprecated Use getCursorY instead.
             */
            const getMouseY: (instanceContainer: gdjs.RuntimeInstanceContainer, layer: string, camera: integer) => number;
            const getCursorX: (instanceContainer: gdjs.RuntimeInstanceContainer, layer: string, camera: integer) => number;
            const getCursorY: (instanceContainer: gdjs.RuntimeInstanceContainer, layer: string, camera: integer) => number;
            const getMouseOnlyCursorX: (instanceContainer: gdjs.RuntimeInstanceContainer, layer: string, camera: integer) => number;
            const getMouseOnlyCursorY: (instanceContainer: gdjs.RuntimeInstanceContainer, layer: string, camera: integer) => number;
            const isMouseInsideCanvas: (instanceContainer: gdjs.RuntimeInstanceContainer) => boolean;
            const cursorOnObject: (objectsLists: Hashtable<gdjs.RuntimeObject[]>, instanceContainer: gdjs.RuntimeInstanceContainer, accurate: boolean, inverted: boolean) => boolean;
            const getTouchX: (instanceContainer: gdjs.RuntimeInstanceContainer, identifier: integer, layer: string, camera: integer) => number;
            const getTouchY: (instanceContainer: gdjs.RuntimeInstanceContainer, identifier: integer, layer: string, camera: integer) => number;
            /**
             * @deprecated
             */
            const hasAnyTouchStarted: (instanceContainer: gdjs.RuntimeInstanceContainer) => boolean;
            /**
             * @deprecated
             */
            const getStartedTouchCount: (instanceContainer: gdjs.RuntimeInstanceContainer) => integer;
            /**
             * @deprecated
             */
            const getStartedTouchIdentifier: (instanceContainer: gdjs.RuntimeInstanceContainer, index: integer) => integer;
            const hasAnyTouchOrMouseStarted: (instanceContainer: gdjs.RuntimeInstanceContainer) => boolean;
            const getStartedTouchOrMouseCount: (instanceContainer: gdjs.RuntimeInstanceContainer) => integer;
            const getStartedTouchOrMouseIdentifier: (instanceContainer: gdjs.RuntimeInstanceContainer, index: integer) => integer;
            const hasTouchEnded: (instanceContainer: gdjs.RuntimeInstanceContainer, identifier: integer) => boolean;
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
            const popStartedTouch: (instanceContainer: gdjs.RuntimeInstanceContainer) => boolean;
            /**
             * @deprecated
             */
            const popEndedTouch: (instanceContainer: gdjs.RuntimeInstanceContainer) => boolean;
            const touchSimulateMouse: (instanceContainer: gdjs.RuntimeInstanceContainer, enable: boolean) => void;
        }
    }
}
