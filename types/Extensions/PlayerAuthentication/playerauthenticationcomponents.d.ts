declare namespace gdjs {
    namespace playerAuthenticationComponents {
        /**
         * Creates a DOM element that will contain the loader or a message if the game is not registered.
         */
        const computeAuthenticationContainer: (onCloseAuthenticationContainer: () => void) => {
            rootContainer: HTMLDivElement;
            loaderContainer: HTMLDivElement;
            iframeContainer: HTMLDivElement;
        };
        const displayIframeInsideAuthenticationContainer: (iframeContainer: HTMLDivElement, loaderContainer: HTMLDivElement, textContainer: HTMLDivElement, url: string) => void;
        /**
         * Helper to add the texts to the authentication container
         * based on the platform or if the game is registered.
         */
        const addAuthenticationTextsToLoadingContainer: (loaderContainer: HTMLDivElement, platform: any, isGameRegistered: any, wikiOpenAction: any) => HTMLDivElement;
        /**
         * Helper to add the authentication link in case the window hasn't opened properly.
         * Useful for Electron & Web platforms.
         */
        const addAuthenticationUrlToTextsContainer: (onClick: () => void, textContainer: HTMLDivElement) => void;
        /**
         * Creates a DOM element to display a dismissable banner.
         */
        const computeDismissableBanner: (onDismissBanner: () => void) => HTMLDivElement;
        /**
         * Creates a DOM element representing a banner for the user to know which account
         * they're using and also to allow switching to another account.
         */
        const computeAuthenticatedBanner: (onOpenAuthenticationWindow: () => void, onDismissBanner: () => void, username: string | null) => HTMLDivElement;
        /**
         * Creates a DOM element representing a banner for the user to know
         * they are not connected and to allow logging in.
         */
        const computeNotAuthenticatedBanner: (onOpenAuthenticationWindow: () => void, onDismissBanner: () => void) => HTMLDivElement;
        /**
         * Create, display, and hide the logged in confirmation.
         */
        const displayLoggedInNotification: (domContainer: HTMLDivElement, username: string) => void;
        /**
         * Create, display, and hide the logged in confirmation.
         */
        const displayLoggedOutNotification: (domContainer: HTMLDivElement) => void;
        /**
         * Create, display, and hide an error notification.
         */
        const displayErrorNotification: (domContainer: HTMLDivElement) => void;
        /**
         * Helper to show a notification to the user, that disappears automatically.
         */
        const showNotification: (domContainer: HTMLDivElement, id: string, content: string, type: 'success' | 'error') => void;
    }
}
