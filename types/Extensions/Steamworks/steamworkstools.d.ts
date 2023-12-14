/// <reference types="extensions/steamworks/types" />
declare namespace gdjs {
    namespace steamworks {
        export let steamAPI: import('steamworks.js').Client | null;
        export function claimAchievement(achievement: string): void;
        export function unclaimAchievement(achievement: string): void;
        export function hasAchievement(achievement: string): boolean;
        export function getSteamId(): string;
        export function getName(): string;
        export function getCountry(): string;
        export function getLevel(): number;
        export function setRichPresence(key: string, value: string): void;
        export function isSteamworksProperlyLoaded(): boolean;
        export function getAppID(): number;
        export function getServerRealTime(): number;
        export function isOnSteamDeck(): boolean;
        export function getKnownLobby(lobbyId: string): import("steamworks.js/client").matchmaking.Lobby | null;
        export function createLobby(lobbyType: 'Private' | 'FriendsOnly' | 'Public' | 'Invisible', maxPlayers: number, result: gdjs.Variable): gdjs.AsyncTask;
        export function getLobbiesList(results: gdjs.Variable): gdjs.AsyncTask;
        export function joinLobby(lobbyId: string, result: gdjs.Variable): gdjs.AsyncTask;
        export function getCurrentLobbyId(): string;
        export function leaveCurrentLobby(): void;
        export function openDialogForInvitingUsersToTheCurrentLobby(): void;
        export function getCurrentLobbyAttribute(attribute: string): string;
        export function getLobbyAttribute(lobbyId: string, attribute: string): string;
        export function setCurrentLobbyAttribute(attribute: string, value: string, success: gdjs.Variable): void;
        export function setCurrentLobbyJoinability(shouldBeJoinable: boolean, success: gdjs.Variable): void;
        export function getCurrentLobbyMemberCount(): number;
        export function getLobbyMemberCount(lobbyId: string): number;
        export function getCurrentLobbyMemberLimit(): number;
        export function getLobbyMemberLimit(lobbyId: string): number;
        export function getCurrentLobbyOwner(): string;
        export function getLobbyOwner(lobbyId: string): string;
        export function getCurrentLobbyMembersList(storeIn: gdjs.Variable): void;
        export function getLobbyMembersList(lobbyId: string, storeIn: gdjs.Variable): void;
        export function isAppOwned(appId: string): boolean;
        export function isAppInstalled(appId: string): boolean;
        export function isDLCInstalled(dlcId: string): boolean;
        export function getAppInstallDirectory(appId: string): string;
        export function isVacBanned(): boolean;
        export function isLowViolence(): boolean;
        export function userBoughtTheGame(): boolean;
        export function currentGameLanguage(): string;
        export function currentBetaName(): string;
        export function getBuildId(): number;
        export function isCloudEnabled(): boolean;
        export function readFile(fileName: string): string;
        export function writeFile(fileName: string, content: string, results: gdjs.Variable): void;
        export function fileExists(fileName: string): boolean;
        export function deleteFile(fileName: string, results: gdjs.Variable): void;
        export function createWorkshopItem(result: gdjs.Variable): gdjs.AsyncTask;
        export function updateWorkshopItem(itemId: string, title: string, description: string, changeNote: string, previewPath: string, contentPath: string, tags: string, visibility: keyof import('steamworks.js/client').workshop.UgcItemVisibility, result: gdjs.Variable): gdjs.AsyncTask;
        export function subscribeToWorkshopItem(itemId: string, result: gdjs.Variable): gdjs.AsyncTask;
        export function unsubscribeToWorkshopItem(itemId: string, result: gdjs.Variable): gdjs.AsyncTask;
        export function startWorkshopDownload(itemId: string, highPriority: boolean): void;
        enum WorkshopItemStates {
            None = 0,
            Subscribed = 1,
            LegacyItem = 2,
            Installed = 4,
            NeedsUpdate = 8,
            Downloading = 16,
            DownloadPending = 32
        }
        export function workshopItemState(itemId: string, state: keyof WorkshopItemStates): boolean;
        export function getWorkshopItemLocation(itemId: string): string;
        export function getWorkshopItemSizeOnDisk(itemId: string): number;
        export function getWorkshopItemInstallTimestamp(itemId: string): number;
        export function getWorkshopItemDownloadProgress(itemId: string): number;
        export function getWorkshopItemDownloadTotal(itemId: string): number;
        export {};
    }
}
