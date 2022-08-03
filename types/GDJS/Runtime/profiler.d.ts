declare namespace gdjs {
    type ProfilerStats = {
        framesCount: integer;
    };
    type FrameMeasure = {
        parent: FrameMeasure | null;
        time: float;
        lastStartTime: float;
        subsections: Record<string, FrameMeasure>;
    };
    /**
     * A basic profiling tool that can be used to measure time spent in sections of the engine.
     */
    class Profiler {
        /** All the measures for the last frames */
        _framesMeasures: Array<FrameMeasure>;
        _currentFrameIndex: float;
        /** The measures being done */
        _currentFrameMeasure: FrameMeasure;
        /** The section being measured */
        _currentSection: FrameMeasure | null;
        _maxFramesCount: number;
        /** The number of frames that have been measured */
        _framesCount: number;
        /** A function to get the current time. If available, corresponds to performance.now(). */
        _getTimeNow: () => float;
        constructor();
        beginFrame(): void;
        begin(sectionName: string): void;
        end(sectionName?: string): void;
        endFrame(): void;
        static _addAverageSectionTimes(section: FrameMeasure, destinationSection: FrameMeasure, totalCount: integer, i: integer): void;
        /**
         * Return the measures for all the section of the game during the frames
         * captured.
         */
        getFramesAverageMeasures(): FrameMeasure;
        /**
         * Get stats measured during the frames captured.
         */
        getStats(): ProfilerStats;
        /**
         * Convert measures for a section into texts.
         * Useful for ingame profiling.
         *
         * @param sectionName The name of the section
         * @param profilerSection The section measures
         * @param outputs The array where to push the results
         */
        static getProfilerSectionTexts(sectionName: string, profilerSection: any, outputs: any): void;
    }
}
