declare namespace gdjs {
    namespace evtTools {
        namespace facebookInstantGames {
            let _preloadedInterstitial: any;
            let _preloadedInterstitialLoading: boolean;
            let _preloadedInterstitialLoaded: boolean;
            let _preloadedRewardedVideo: any;
            let _preloadedRewardedVideoLoading: boolean;
            let _preloadedRewardedVideoLoaded: boolean;
            const areAdsSupported: () => boolean;
            const getPlayerId: () => any;
            const getPlayerName: () => any;
            const loadPlayerData: (key: any, successVariable: any, errorVariable: any) => void;
            const setPlayerData: (key: any, variable: any, successVariable: any, errorVariable: any) => void;
            const setPlayerScore: (leaderboardName: any, score: any, extraDataVariable: any, successVariable: any, errorVariable: any) => void;
            const getPlayerEntry: (leaderboardName: any, rankVariable: any, scoreVariable: any, extraDataVariable: any, errorVariable: any) => void;
            const loadInterstitialAd: (adPlacementId: any, errorVariable: any) => void;
            const showInterstitialAd: (errorVariable: any) => void;
            const isInterstitialAdReady: () => boolean;
            const loadRewardedVideo: (adPlacementId: any, errorVariable: any) => void;
            const showRewardedVideo: (errorVariable: any) => void;
            const isRewardedVideoReady: () => boolean;
        }
    }
}
