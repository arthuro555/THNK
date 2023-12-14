declare namespace gdjs {
    namespace playerAuthentication {
        /**
         * Returns true if a user token is present in the local storage.
         */
        const isAuthenticated: () => boolean;
        /**
         * Returns true if the user just logged in.
         * Useful to update username or trigger messages in the game.
         */
        const hasLoggedIn: () => boolean;
        /**
         * Returns the username from the local storage.
         */
        const getUsername: () => string;
        /**
         * Returns the user token from the local storage.
         */
        const getUserToken: () => string | null;
        /**
         * Returns the username from the local storage.
         */
        const getUserId: () => string | null;
        /**
         * Remove the user information from the local storage.
         */
        const logout: (runtimeScene: RuntimeScene) => void;
        /**
         * Action to display the banner to the user, depending on their authentication status.
         */
        const displayAuthenticationBanner: (runtimeScene: gdjs.RuntimeScene) => void;
        /**
         * Action to display the authentication window to the user.
         */
        const openAuthenticationWindow: (runtimeScene: gdjs.RuntimeScene) => void;
        /**
         * Condition to check if the window is open, so that the game can be paused in the background.
         */
        const isAuthenticationWindowOpen: () => boolean;
        /**
         * Remove the container displaying the authentication window and the callback.
         */
        const removeAuthenticationContainer: (runtimeScene: gdjs.RuntimeScene) => void;
        /**
         * Remove the banner displaying the authentication status.
         */
        const removeAuthenticationBanner: (runtimeScene: gdjs.RuntimeScene) => void;
    }
}
