/// <reference types="extensions/leaderboards/sha256" />
declare namespace gdjs {
    namespace evtTools {
        namespace leaderboards {
            const savePlayerScore: (runtimeScene: gdjs.RuntimeScene, leaderboardId: string, score: float, playerName: string) => void;
            const isSaving: (leaderboardId?: string | undefined) => boolean;
            const hasBeenSaved: (leaderboardId?: string | undefined) => boolean;
            const hasSavingErrored: (leaderboardId?: string | undefined) => boolean;
            const getLastSaveError: (leaderboardId?: string | undefined) => string | null;
            const formatPlayerName: (rawName: string) => string;
            const displayLeaderboard: (runtimeScene: gdjs.RuntimeScene, leaderboardId: string, displayLoader: boolean) => void;
            const isLeaderboardViewErrored: () => boolean;
            const isLeaderboardViewLoaded: () => boolean;
            const isLeaderboardViewLoading: () => boolean;
            const closeLeaderboardView: (runtimeScene: gdjs.RuntimeScene) => void;
        }
    }
}
