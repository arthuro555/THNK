declare namespace gdjs {
    /**
     * The PIXI.js renderer for the VideoRuntimeObject.
     */
    class VideoRuntimeObjectPixiRenderer {
        _object: any;
        _pixiObject: any;
        _textureWasValid: boolean;
        /**
         * @param runtimeObject The object to render
         * @param runtimeScene The gdjs.RuntimeScene in which the object is
         */
        constructor(runtimeObject: gdjs.VideoRuntimeObject, runtimeScene: gdjs.RuntimeScene);
        getRendererObject(): any;
        /**
         * To be called when the object is removed from the scene: will pause the video.
         */
        onDestroy(): void;
        ensureUpToDate(): void;
        updatePosition(): void;
        updateLoop(): void;
        updateVolume(): void;
        updateAngle(): void;
        updateOpacity(): void;
        getWidth(): float;
        getHeight(): float;
        /**
         * Set the rendered video width
         * @param width The new width, in pixels.
         */
        setWidth(width: float): void;
        /**
         * Set the rendered video height
         * @param height The new height, in pixels.
         */
        setHeight(height: float): void;
        /**
         * Get the internal HTMLVideoElement used for the video source.
         * @returns The video element, if any.
         */
        _getHTMLVideoElementSource(): HTMLVideoElement | null;
        /**
         * Start the video
         */
        play(): void;
        /**
         * Pause the video
         */
        pause(): void;
        /**
         * Set the loop on video in renderer
         * @param enable true to loop the video
         */
        setLoop(enable: boolean): void;
        /**
         * Set or unset mute on the video.
         * @param enable true to mute
         */
        setMute(enable: boolean): void;
        /**
         * Return true if the video is muted.
         */
        isMuted(): boolean;
        /**
         * Set the current time of the video.
         */
        setCurrentTime(number: any): void;
        /**
         * Set the volume of the video, between 0 and 1.
         * @param volume The new volume.
         */
        setVolume(volume: number): void;
        /**
         * Get the volume on video, between 0 and 1.
         */
        getVolume(): number;
        /**
         * Return true if the video is playing
         */
        isPlayed(): boolean;
        /**
         * Return true if the video is looping
         */
        isLooped(): boolean;
        /**
         * Get the current time of the playback.
         */
        getCurrentTime(): float;
        /**
         * Get the duration of the video.
         */
        getDuration(): number;
        /**
         * Return true if the video has ended.
         */
        isEnded(): boolean;
        /**
         * Set the playback speed (1 = 100%)
         */
        setPlaybackSpeed(playbackRate: any): void;
        /**
         * Return the playback speed (1 = 100%)
         */
        getPlaybackSpeed(): number;
    }
    const VideoRuntimeObjectRenderer: typeof VideoRuntimeObjectPixiRenderer;
    type VideoRuntimeObjectRenderer = VideoRuntimeObjectPixiRenderer;
}
