declare namespace gdjs {
    namespace adMob {
        enum AdSizeType {
            BANNER = 0,
            LARGE_BANNER = 1,
            MEDIUM_RECTANGLE = 2,
            FULL_BANNER = 3,
            LEADERBOARD = 4,
            SMART_BANNER = 5
        }
        /**
         * Activate or deactivate the test mode ("development" mode).
         * When activated, tests ads will be served instead of real ones.
         *
         * It is important to enable test ads during development so that you can click on them without
         * charging advertisers. If you click on too many ads without being in test mode, you risk your
         * account being flagged for invalid activity.
         */
        const setTestMode: (enable: boolean) => void;
        /** Check if a banner is loading. */
        const isBannerLoading: () => boolean;
        /** Check if a banner is being shown on screen. */
        const isBannerShowing: () => boolean;
        /** Check if the banner had an error while loading it. */
        const isBannerErrored: () => boolean;
        /**
         * Set up a banner that can then be displayed by calling `showBanner`.
         */
        const setupBanner: (androidID: any, iosID: any, atTop: any) => void;
        /**
         * Set the size of the banner to be shown when `showBanner` is called.
         * @param bannerAdSizeType The type of the banner to displayed
         */
        const setBannerAdSizeType: (bannerAdSizeType: 'BANNER' | 'LARGE_BANNER' | 'MEDIUM_RECTANGLE' | 'FULL_BANNER' | 'LEADERBOARD' | 'SMART_BANNER') => void;
        /**
         * Display the banner that was set up with `loadBanner` (and `setBannerAdSizeType`).
         */
        const showBanner: () => void;
        /** Hide the banner shown on screen. */
        const hideBanner: () => void;
        /** Check if the interstitial is loading. */
        const isInterstitialLoading: () => boolean;
        /** Check if the interstitial is ready to display. */
        const isInterstitialReady: () => boolean;
        /** Check if the interstitial is shown on screen. */
        const isInterstitialShowing: () => boolean;
        /** Check if the interstitial had an error while loading it. */
        const isInterstitialErrored: () => boolean;
        /** Load an interstitial. */
        const loadInterstitial: (androidID: any, iosID: any, displayWhenLoaded: any) => void;
        /** Show the loaded interstitial. */
        const showInterstitial: () => void;
        /** Check if the video is loading. */
        const isVideoLoading: () => boolean;
        /** Check if the video is ready to display. */
        const isVideoReady: () => boolean;
        /** Check if the video is shown on screen. */
        const isVideoShowing: () => boolean;
        /** Check if the video had an error while loading it. */
        const isVideoErrored: () => boolean;
        /** Check if the reward of the video was received. */
        const wasVideoRewardReceived: (markAsClaimed: any) => boolean;
        /** Load a reward video. */
        const loadVideo: (androidID: any, iosID: any, displayWhenLoaded: any) => void;
        /** Show the loaded reward video. */
        const showVideo: () => void;
        /** Mark the reward of the video as claimed. */
        const markVideoRewardAsClaimed: () => void;
    }
}
