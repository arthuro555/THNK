declare namespace gdjs {
    namespace evtTools {
        namespace firebaseTools {
            /**
             * Firebase Performance Event Tools.
             * @namespace
             */
            namespace performance {
                /**
                 * Get a tracer (custom event) by name, if it doesn't exists create it.
                 * @param tracerName - The name of the tracer.
                 * @returns The tracer instance.
                 */
                const getTracer: (tracerName: string) => firebase.performance.Trace;
                /**
                 * Start measuring performance for a custom event (tracer).
                 * @param tracerName - The name of the tracer.
                 */
                const startTracer: (tracerName: string) => void;
                /**
                 * Stop measuring performance for a custom event (tracer).
                 * @param tracerName - The name of the tracer.
                 */
                const stopTracer: (tracerName: string) => void;
                /**
                 * Record performance for a specific time.
                 * @param tracerName - The name of the tracer.
                 * @param delay - The delay before starting measuring.
                 * @param duration - The duration of the measuring.
                 */
                const recordPerformance: (tracerName: string, delay: float, duration: number) => void;
            }
        }
    }
}
