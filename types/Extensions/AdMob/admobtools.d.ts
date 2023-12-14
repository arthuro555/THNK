declare namespace gdjs {
    namespace adMob {
        /**
         * Activate or deactivate the test mode ("development" mode).
         * When activated, tests ads will be served instead of real ones.
         *
         * It is important to enable test ads during development so that you can click on them without
         * charging advertisers. If you click on too many ads without being in test mode, you risk your
         * account being flagged for invalid activity.
         */
        const setTestMode: (enable: boolean) => void;
        const isAppOpenLoading: () => boolean;
        const isAppOpenReady: () => boolean;
        const isAppOpenShowing: () => boolean;
        const isAppOpenErrored: () => boolean;
        /** Load an AppOpen. */
        const loadAppOpen: (androidAdUnitId: any, iosAdUnitId: any, displayLandscape: any, displayWhenLoaded: any) => Promise<void>;
        /** Show the loaded appOpen. */
        const showAppOpen: () => Promise<void>;
        const isBannerConfigured: () => boolean;
        const isBannerLoaded: () => boolean;
        const isBannerShowing: () => boolean;
        const isBannerErrored: () => boolean;
        const setBannerAdSizeType: (bannerAdSizeType: 'BANNER' | 'LARGE_BANNER' | 'MEDIUM_RECTANGLE' | 'FULL_BANNER' | 'LEADERBOARD' | 'SMART_BANNER') => void;
        /**
         * Set up a banner that can then be displayed by calling `showBanner`.
         * If a banner is already set up, it will be hidden and replaced by the new one.
         */
        const setupBanner: (androidAdUnitId: any, iosAdUnitId: any, atTop: any) => Promise<void>;
        /**
         * Display a banner that was set up with `setupBanner` (and `setBannerAdSizeType`).
         */
        const showBanner: () => Promise<void>;
        /** Hide the banner shown on screen. */
        const hideBanner: () => Promise<void>;
        const isInterstitialLoading: () => boolean;
        const isInterstitialReady: () => boolean;
        const isInterstitialShowing: () => boolean;
        const isInterstitialErrored: () => boolean;
        /** Load an interstitial. */
        const loadInterstitial: (androidAdUnitId: any, iosAdUnitId: any, displayWhenLoaded: any) => Promise<void>;
        /** Show the loaded interstitial. */
        const showInterstitial: () => Promise<void>;
        const isRewardedInterstitialLoading: () => boolean;
        const isRewardedInterstitialReady: () => boolean;
        const isRewardedInterstitialShowing: () => boolean;
        const isRewardedInterstitialErrored: () => boolean;
        /** Check if the reward of the rewarded interstitial was received. */
        const wasRewardedInterstitialRewardReceived: (markAsClaimed: any) => boolean;
        /** Load a rewarded interstitial. */
        const loadRewardedInterstitial: (androidAdUnitID: any, iosAdUnitID: any, displayWhenLoaded: any) => Promise<void>;
        /** Show the loaded reward interstitial. */
        const showRewardedInterstitial: () => Promise<void>;
        /** Mark the reward of the interstitial as claimed. */
        const markRewardedInterstitialRewardAsClaimed: () => void;
        const isRewardedVideoLoading: () => boolean;
        const isRewardedVideoReady: () => boolean;
        const isRewardedVideoShowing: () => boolean;
        const isRewardedVideoErrored: () => boolean;
        /** Check if the reward of the rewarded video was received. */
        const wasRewardedVideoRewardReceived: (markAsClaimed: any) => boolean;
        /** Load a rewarded video. */
        const loadRewardedVideo: (androidAdUnitID: any, iosAdUnitID: any, displayWhenLoaded: any) => Promise<void>;
        /** Show the loaded reward video. */
        const showRewardedVideo: () => Promise<void>;
        /** Mark the reward of the video as claimed. */
        const markRewardedVideoRewardAsClaimed: () => void;
    }
}
