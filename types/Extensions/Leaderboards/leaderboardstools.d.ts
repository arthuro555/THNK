/// <reference types="extensions/leaderboards/sha256" />
declare namespace gdjs {
    namespace evtTools {
        namespace leaderboards {
            /**
             * Returns true if the player has just closed the leaderboard view.
             */
            const hasPlayerJustClosedLeaderboardView: () => boolean;
            const savePlayerScore: (runtimeScene: gdjs.RuntimeScene, leaderboardId: string, score: float, playerName: string) => PromiseTask;
            const saveConnectedPlayerScore: (runtimeScene: gdjs.RuntimeScene, leaderboardId: string, score: float) => PromiseTask;
            const isSaving: (leaderboardId?: string | undefined) => boolean;
            const hasBeenSaved: (leaderboardId?: string | undefined) => boolean;
            const hasSavingErrored: (leaderboardId?: string | undefined) => boolean;
            const getLastSaveError: (leaderboardId?: string | undefined) => string | null;
            const formatPlayerName: (rawName?: string | null | undefined) => string;
            const displayLeaderboard: (runtimeScene: gdjs.RuntimeScene, leaderboardId: string, displayLoader: boolean) => Promise<void>;
            const isLeaderboardViewErrored: () => boolean;
            const isLeaderboardViewLoaded: () => boolean;
            const isLeaderboardViewLoading: () => boolean;
            const closeLeaderboardView: (runtimeScene: gdjs.RuntimeScene) => void;
        }
    }
}
