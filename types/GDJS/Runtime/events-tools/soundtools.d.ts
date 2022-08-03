declare namespace gdjs {
    namespace evtTools {
        namespace sound {
            const getGlobalVolume: (runtimeScene: gdjs.RuntimeScene) => float;
            const setGlobalVolume: (runtimeScene: gdjs.RuntimeScene, globalVolume: float) => void;
            const unloadAllAudio: (runtimeScene: gdjs.RuntimeScene) => void;
            const playSound: (runtimeScene: gdjs.RuntimeScene, soundFile: string, loop: boolean, volume: float, pitch: float) => void;
            const playSoundOnChannel: (runtimeScene: gdjs.RuntimeScene, soundFile: string, channel: integer, loop: boolean, volume: float, pitch: float) => void;
            const stopSoundOnChannel: (runtimeScene: gdjs.RuntimeScene, channel: integer) => void;
            const pauseSoundOnChannel: (runtimeScene: gdjs.RuntimeScene, channel: integer) => void;
            const continueSoundOnChannel: (runtimeScene: gdjs.RuntimeScene, channel: integer) => void;
            const isSoundOnChannelPlaying: (runtimeScene: gdjs.RuntimeScene, channel: integer) => boolean;
            const isSoundOnChannelPaused: (runtimeScene: gdjs.RuntimeScene, channel: integer) => boolean;
            const isSoundOnChannelStopped: (runtimeScene: gdjs.RuntimeScene, channel: integer) => boolean;
            const getSoundOnChannelVolume: (runtimeScene: gdjs.RuntimeScene, channel: integer) => float;
            const setSoundOnChannelVolume: (runtimeScene: gdjs.RuntimeScene, channel: integer, volume: float) => void;
            const getSoundOnChannelPlayingOffset: (runtimeScene: gdjs.RuntimeScene, channel: integer) => float;
            const setSoundOnChannelPlayingOffset: (runtimeScene: gdjs.RuntimeScene, channel: integer, playingOffset: float) => void;
            const getSoundOnChannelPitch: (runtimeScene: gdjs.RuntimeScene, channel: integer) => float;
            const setSoundOnChannelPitch: (runtimeScene: gdjs.RuntimeScene, channel: integer, pitch: float) => void;
            const preloadSound: (runtimeScene: gdjs.RuntimeScene, soundFile: string) => void;
            const unloadSound: (runtimeScene: gdjs.RuntimeScene, soundFile: string) => void;
            const playMusic: (runtimeScene: gdjs.RuntimeScene, soundFile: string, loop: boolean, volume: float, pitch: float) => void;
            const playMusicOnChannel: (runtimeScene: gdjs.RuntimeScene, soundFile: string, channel: integer, loop: boolean, volume: float, pitch: float) => void;
            const stopMusicOnChannel: (runtimeScene: gdjs.RuntimeScene, channel: integer) => void;
            const pauseMusicOnChannel: (runtimeScene: gdjs.RuntimeScene, channel: integer) => void;
            const continueMusicOnChannel: (runtimeScene: gdjs.RuntimeScene, channel: integer) => void;
            const isMusicOnChannelPlaying: (runtimeScene: gdjs.RuntimeScene, channel: integer) => boolean;
            const isMusicOnChannelPaused: (runtimeScene: gdjs.RuntimeScene, channel: integer) => boolean;
            const isMusicOnChannelStopped: (runtimeScene: gdjs.RuntimeScene, channel: integer) => boolean;
            const getMusicOnChannelVolume: (runtimeScene: gdjs.RuntimeScene, channel: integer) => float;
            const setMusicOnChannelVolume: (runtimeScene: gdjs.RuntimeScene, channel: integer, volume: float) => void;
            const getMusicOnChannelPlayingOffset: (runtimeScene: gdjs.RuntimeScene, channel: integer) => float;
            const setMusicOnChannelPlayingOffset: (runtimeScene: gdjs.RuntimeScene, channel: integer, playingOffset: float) => void;
            const getMusicOnChannelPitch: (runtimeScene: gdjs.RuntimeScene, channel: integer) => float;
            const setMusicOnChannelPitch: (runtimeScene: gdjs.RuntimeScene, channel: integer, pitch: float) => void;
            const preloadMusic: (runtimeScene: gdjs.RuntimeScene, soundFile: string) => void;
            const unloadMusic: (runtimeScene: gdjs.RuntimeScene, soundFile: string) => void;
            const fadeSoundVolume: (runtimeScene: gdjs.RuntimeScene, channel: integer, toVolume: float, timeOfFade: float) => void;
            const fadeMusicVolume: (runtimeScene: gdjs.RuntimeScene, channel: integer, toVolume: float, timeOfFade: float) => void;
        }
    }
}
