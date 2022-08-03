declare namespace gdjs {
    /** The initial properties for {@link gdjs.VideoRuntimeObject} */
    type VideoObjectDataType = {
        /** The base parameters of the video */
        content: {
            /** The opacity of the video */
            opacity: number;
            /** Does the video loops itself? */
            loop: boolean;
            /** The volume of the video */
            volume: number;
            /** Name of the resource corresponding to the video */
            videoResource: string;
        };
    };
    type VideoObjectData = ObjectData & VideoObjectDataType;
    /**
     * An object displaying a video on screen.
     *
     * For the same video resource, only one video is being created in memory (
     * as a HTMLVideoElement). This means that two objects displaying the same
     * video will have the same state for this video (paused/playing, current time,
     * volume, etc...).
     */
    class VideoRuntimeObject extends gdjs.RuntimeObject {
        _opacity: float;
        _loop: boolean;
        _volume: float;
        _videoResource: string;
        _pausedAsScenePaused: boolean;
        _renderer: gdjs.VideoRuntimeObjectRenderer;
        _playbackSpeed: any;
        /**
         * @param runtimeScene The scene the object belongs to.
         * @param videoObjectData The data defining the object
         */
        constructor(runtimeScene: gdjs.RuntimeScene, videoObjectData: VideoObjectData);
        getRendererObject(): any;
        updateFromObjectData(oldObjectData: VideoObjectData, newObjectData: VideoObjectData): boolean;
        /**
         * Initialize the extra parameters that could be set for an instance.
         * @param initialInstanceData The initial instance data
         */
        extraInitializationFromInitialInstance(initialInstanceData: InstanceData): void;
        onDestroyFromScene(runtimeScene: any): void;
        update(runtimeScene: any): void;
        /**
         * Set object position on X axis.
         * @param x The new position X of the object.
         */
        setX(x: float): void;
        /**
         * Set object position on Y axis.
         * @param y The new position Y of the object.
         */
        setY(y: float): void;
        /**
         * Set the angle of the object.
         * @param angle The new angle of the object.
         */
        setAngle(angle: float): void;
        /**
         * Set object opacity.
         * @param opacity The new opacity of the object (0-255).
         */
        setOpacity(opacity: float): void;
        /**
         * Get object opacity.
         * @returns The current opacity
         */
        getOpacity(): number;
        /**
         * Set the width of the video.
         * @param width The new width in pixels.
         */
        setWidth(width: float): void;
        /**
         * Set the height of the video.
         * @param height The new height in pixels.
         */
        setHeight(height: float): void;
        /**
         * Get the width of the video object.
         * @returns The current width of the object
         */
        getWidth(): float;
        /**
         * Get the height of the video object.
         * @returns The current height of the object
         */
        getHeight(): float;
        /**
         * Play the video.
         */
        play(): void;
        /**
         * Pause the video.
         */
        pause(): void;
        /**
         * Set the state looped of the video.
         * @param enable true to loop the video
         */
        setLoop(enable: boolean): void;
        /**
         * Set the state muted of the video.
         * @param enable The new state.
         */
        mute(enable: boolean): void;
        /**
         * Return the state muted of video object.
         * @returns Is the video muted?
         */
        isMuted(): boolean;
        /**
         * Set the volume of the video object.
         * @param volume The new volume, between 0 and 100.
         */
        setVolume(volume: number): void;
        /**
         * Get the volume of the video object.
         * @returns The current video's volume, betwenn 0 and 100.
         */
        getVolume(): number;
        /**
         * Check if the video is being played.
         * @returns Is the video being played?
         */
        isPlayed(): boolean;
        /**
         * Check if the video is paused.
         * @returns Is the video being paused?
         */
        isPaused(): boolean;
        /**
         * Check if the video is looping.
         * @returns Is the video looping?
         */
        isLooped(): boolean;
        /**
         * Return the total time of the video.
         * @returns The duration of the video
         */
        getDuration(): number;
        /**
         * Check if the video has ended.
         * @returns Has the video ended?
         */
        isEnded(): boolean;
        /**
         * Set the new time of the video object.
         * @param time The new time.
         */
        setCurrentTime(time: float): void;
        /**
         * Get the current time of the video object.
         * @returns The current time of the video
         */
        getCurrentTime(): float;
        /**
         * Set the new playback speed of the video object.
         * @param playbackSpeed The new playback speed.
         */
        setPlaybackSpeed(playbackSpeed: number): void;
        /**
         * Get the playback speed of the video object.
         * @returns The current playback speed of the video.
         */
        getPlaybackSpeed(): number;
    }
}
