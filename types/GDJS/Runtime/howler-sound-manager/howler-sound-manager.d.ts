declare namespace gdjs {
    /**
     * A thin wrapper around a Howl object with:
     * * Handling of callbacks when the sound is not yet loaded.
     * * Automatic clamping when calling `setRate` to ensure a valid value is passed to Howler.js.
     * * Automatic clamping when calling `setVolume` so that the volume is always between 0 and 1.
     *
     * @memberof gdjs
     * @class HowlerSound
     */
    class HowlerSound {
        /**
         * The ID of the played sound.
         */
        private _id;
        /**
         * The Howl passed to the constructor.
         * It defines the sound file that is being played.
         */
        private _howl;
        /**
         * The **initial** volume at which the sound is being played.
         * Once the sound is started, this volume can be not in sync
         * (in the case the sound is faded by Howler), so volume must
         * be gotten from `this._howl` directly.
         *
         * This value is clamped between 0 and 1.
         */
        private _initialVolume;
        /**
         * Whether the sound is being played in a loop or not.
         */
        private _loop;
        /**
         * The rate (speed) the sound is being played at.
         * This value is not clamped, though technically Howler.js will only
         * accepts values between a specific range (so we clamp this when
         * passing it to Howler.js, but keep the original value here).
         */
        private _rate;
        /**
         * An array of callbacks to call once the sound starts to play.
         */
        private _oncePlay;
        /**
         * An array of callbacks to call everytime the sound starts to play.
         */
        private _onPlay;
        constructor(howl: Howl, volume: float, loop: boolean, rate: float);
        /**
         * Returns true if the associated howl is fully loaded.
         */
        isLoaded(): boolean;
        /**
         * Begins playback of the sound, or if the Howl is still loading, schedule playing for once it loads.
         * @returns The current instance for chaining.
         */
        play(): this;
        /**
         * Pauses playback of the sound, saving the seek of playback.
         * @returns The current instance for chaining.
         */
        pause(): this;
        /**
         * Stops playback of the sound, resetting seek to 0.
         * @returns The current instance for chaining.
         */
        stop(): this;
        /**
         * Check if the sound is currently playing.
         * Note that a loading sound is considered as playing (as it will be
         * played as soon as it's loaded). To avoid loading at runtime, prefer
         * to preload the sounds.
         */
        playing(): boolean;
        /**
         * Check if the sound is currently paused.
         */
        paused(): boolean;
        /**
         * Check if the sound is currently stopped.
         */
        stopped(): boolean;
        /**
         * Get the sound playback rate. This 1 for the default speed.
         * This value is not clamped (any value greater than 0 is valid),
         * but the underlying audio system might not play the sound at the required
         * rate if it's very low or very high.
         */
        getRate(): float;
        /**
         * Set the playback rate.
         * This value is not clamped (any value greater than 0 is valid),
         * but the underlying audio system might not play the sound at the required
         * rate if it's very low or very high.
         * @returns The current instance for chaining.
         */
        setRate(rate: float): this;
        /**
         * Get if the sound is looping.
         */
        getLoop(): boolean;
        /**
         * Set if the sound is looping.
         * @returns The current instance for chaining.
         */
        setLoop(loop: boolean): this;
        /**
         * Get the sound volume.
         * @returns A float from 0 to 1.
         */
        getVolume(): float;
        /**
         * Set the sound volume.
         * @param volume A float from 0 to 1. The value is clamped if too high or too low.
         * @returns The current instance for chaining.
         */
        setVolume(volume: float): this;
        /**
         * Get if the sound is muted.
         */
        getMute(): boolean;
        /**
         * Set if the sound is muted.
         * @returns The current instance for chaining.
         */
        setMute(mute: boolean): this;
        /**
         * Get the sound seek.
         */
        getSeek(): float;
        /**
         * Set the sound seek.
         * @returns The current instance for chaining.
         */
        setSeek(seek: float): this;
        /**
         * Get the sound spatial position.
         */
        getSpatialPosition(axis: 'x' | 'y' | 'z'): float;
        /**
         * Set the sound spatial position.
         * @returns The current instance for chaining.
         */
        setSpatialPosition(x: float, y: float, z: float): this;
        /**
         * Fade the volume sound.
         * @returns The current instance for chaining.
         */
        fade(from: float, to: float, duration: float): this;
        /**
         * Adds an event listener to the howl.
         */
        on(event: HowlEvent, handler: HowlCallback): this;
        /**
         * Adds an event listener to the howl that removes itself after being called.
         * If the event is `play` and the sound is being played, the handler is
         * called synchronously.
         */
        once(event: HowlEvent, handler: HowlCallback): this;
        /**
         * Removes an event listener to the howl.
         */
        off(event: HowlEvent, handler: HowlCallback): this;
    }
    /**
     * HowlerSoundManager is used to manage the sounds and musics of a RuntimeScene.
     *
     * It is basically a container to associate channels to sounds and keep a list
     * of all sounds being played.
     */
    class HowlerSoundManager {
        _loadedMusics: Record<string, Howl>;
        _loadedSounds: Record<string, Howl>;
        _resources: ResourceData[];
        _availableResources: Record<string, ResourceData>;
        _globalVolume: float;
        _sounds: Record<integer, HowlerSound>;
        _musics: Record<integer, HowlerSound>;
        _freeSounds: HowlerSound[];
        _freeMusics: HowlerSound[];
        /** Paused sounds or musics that should be played once the game is resumed.  */
        _pausedSounds: HowlerSound[];
        _paused: boolean;
        constructor(resources: ResourceData[]);
        /**
         * Update the resources data of the game. Useful for hot-reloading, should not be used otherwise.
         *
         * @param resources The resources data of the game.
         */
        setResources(resources: ResourceData[]): void;
        /**
         * Ensure rate is in a range valid for Howler.js
         * @return The clamped rate
         */
        static clampRate(rate: float): float;
        /**
         * Return the file associated to the given sound name.
         *
         * Names and files are loaded from resources when preloadAudio is called. If no
         * file is associated to the given name, then the name will be considered as a
         * filename and will be returned.
         *
         * @return The associated filename
         */
        private _getFileFromSoundName;
        /**
         * Store the sound in the specified array, put it at the first index that
         * is free, or add it at the end if no element is free
         * ("free" means that the gdjs.HowlerSound can be destroyed).
         *
         * @param arr The array containing the sounds.
         * @param arr The gdjs.HowlerSound to add.
         * @return The gdjs.HowlerSound that have been added (i.e: the second parameter).
         */
        private _storeSoundInArray;
        /**
         * Creates a new gdjs.HowlerSound using preloaded/cached Howl instances.
         * @param soundName The name of the file or resource to play.
         * @param isMusic True if a music, false if a sound.
         * @param volume Between 0 and 1.
         * @param loop True if it should be played looping.
         * @param rate speed at which it is played.
         */
        createHowlerSound(soundName: string, isMusic: boolean, volume: float, loop: boolean, rate: float): HowlerSound;
        /**
         * Preloads a sound or a music in memory.
         * @param soundName The name of the file or resource to preload.
         * @param isMusic True if a music, false if a sound.
         */
        loadAudio(soundName: string, isMusic: boolean): void;
        /**
         * Unloads a sound or a music from memory. This will stop any sound/music using it.
         * @param soundName The name of the file or resource to unload.
         * @param isMusic True if a music, false if a sound.
         */
        unloadAudio(soundName: string, isMusic: boolean): void;
        /**
         * Unloads all audio from memory.
         * This will clear the Howl cache.
         * This will also stop any running music or sounds.
         */
        unloadAll(): void;
        playSound(soundName: string, loop: boolean, volume: float, pitch: float): void;
        playSoundOnChannel(soundName: string, channel: integer, loop: boolean, volume: float, pitch: float): void;
        getSoundOnChannel(channel: integer): HowlerSound | null;
        playMusic(soundName: string, loop: boolean, volume: float, pitch: float): void;
        playMusicOnChannel(soundName: string, channel: integer, loop: boolean, volume: float, pitch: float): void;
        getMusicOnChannel(channel: integer): HowlerSound | null;
        setGlobalVolume(volume: float): void;
        getGlobalVolume(): float;
        clearAll(): void;
        preloadAudio(onProgress: (loadedCount: integer, totalCount: integer) => void, onComplete: (totalCount: integer) => void, resources?: ResourceData[]): void;
    }
    const SoundManager: typeof HowlerSoundManager;
    type SoundManager = HowlerSoundManager;
}
