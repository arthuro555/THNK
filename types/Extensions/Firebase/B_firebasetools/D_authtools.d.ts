declare namespace gdjs {
    namespace evtTools {
        namespace firebaseTools {
            /**
             * Firebase Authentication Event Tools.
             * @namespace
             */
            namespace auth {
                type ProviderName = 'google' | 'facebook' | 'github' | 'twitter';
                /**
                 * The current authentication status.
                 */
                export let authenticated: boolean;
                /**
                 * The logged-in users data.
                 */
                export let currentUser: firebase.User | null;
                /**
                 * A namespace containing tools for managing the current user.
                 * @namespace
                 */
                export namespace userManagement {
                    /**
                     * Contains dangerous management functions. Requires reauthentication before usage.
                     * @namespace
                     */
                    namespace dangerous {
                        /**
                         * Changes the users email.
                         * Use this when using basic auth.
                         * @param oldEmail - Old email for reauthentication.
                         * @param password - Old password for reauthentication.
                         * @param newEmail - New email for the user.
                         * @param [sendVerificationEmail] - Send a verification email to the old address before changing the email?
                         * @param [callbackStateVariable] - The variable where to store the result.
                         */
                        const changeEmail: (oldEmail: string, password: string, newEmail: string, sendVerificationEmail?: boolean, callbackStateVariable?: Variable | undefined) => void;
                        /**
                         * Changes the users password.
                         * Use this when using basic auth.
                         * @param email - Old email for reauthentication.
                         * @param oldPassword - Old password for reauthentication.
                         * @param newPassword - New password for the user.
                         * @param [callbackStateVariable] - The variable where to store the result.
                         */
                        const changePassword: (email: string, oldPassword: string, newPassword: string, callbackStateVariable?: Variable | undefined) => void;
                        /**
                         * Deletes the current user.
                         * Use this when using basic auth.
                         * @param email - Old email for reauthentication.
                         * @param password - Old password for reauthentication.
                         * @param [callbackStateVariable] - The variable where to store the result.
                         */
                        const deleteUser: (email: string, password: string, callbackStateVariable?: Variable | undefined) => void;
                        /**
                         * Changes the users email.
                         * Use this when using an external provider.
                         * @param newEmail - New email for the user.
                         * @param sendVerificationEmail - Send a verification email to the old address before changing the email?
                         * @param [callbackStateVariable] - The variable where to store the result.
                         */
                        const changeEmailProvider: (newEmail: string, sendVerificationEmail: boolean, callbackStateVariable?: Variable | undefined) => void;
                        /**
                         * Changes the users password.
                         * Use this when using an external provider.
                         * @param newPassword - New password for the user.
                         * @param [callbackStateVariable] - The variable where to store the result.
                         */
                        const changePasswordProvider: (newPassword: string, callbackStateVariable?: Variable | undefined) => void;
                        /**
                         * Deletes the current user.
                         * Use this when using an external provider.
                         * @param [callbackStateVariable] - The variable where to store the result.
                         */
                        const deleteUserProvider: (callbackStateVariable?: Variable | undefined) => void;
                    }
                    /**
                     * Verifies if the current users email is verified.
                     */
                    const isEmailVerified: () => boolean;
                    /**
                     * Gets the users email address.
                     */
                    const getEmail: () => string;
                    /**
                     * Gets the creation date of the logged in users account.
                     */
                    const getCreationTime: () => string;
                    /**
                     * Gets the last login date of the logged in users account.
                     */
                    const getLastLoginTime: () => string;
                    /**
                     * Gets the display name of the current user.
                     */
                    const getDisplayName: () => string;
                    /**
                     * Gets the current users phone number.
                     */
                    const getPhoneNumber: () => string;
                    /**
                     * Gets the current users Unique IDentifier.
                     */
                    const getUID: () => string;
                    /**
                     * Gets the tenant ID.
                     * For advanced usage only.
                     */
                    const getTenantID: () => string;
                    /**
                     * Gets the refresh token.
                     * For advanced usage only.
                     */
                    const getRefreshToken: () => string;
                    /**
                     * Gets the users profile picture URL.
                     */
                    const getPhotoURL: () => string;
                    /**
                     * Changes the display name of an user.
                     */
                    const setDisplayName: (newDisplayName: string) => Promise<void>;
                    /**
                     * Changes the URL to the profile picture of the user.
                     */
                    const setPhotoURL: (newPhotoURL: string) => Promise<void>;
                    /**
                     * Send an email to the users email address to verify it.
                     * @note Even though this function is redundant, we keep it for consistency.
                     * @see currentUser.sendEmailVerification
                     */
                    const sendVerificationEmail: () => "" | Promise<void>;
                }
                /**
                 * Get the logged-in users authentication token.
                 * Tries to refresh it everytime the function is called.
                 */
                export const token: () => string;
                /**
                 * Returns true if the user is currently authenticated.
                 * @see authenticated
                 */
                export const isAuthenticated: () => boolean;
                /** @deprecated Use isAuthenticated instead. */
                export const isAuthentified: () => boolean;
                /**
                 * Signs the user in with basic email-password authentication.
                 * @param email - The users email.
                 * @param password - The users password.
                 * @param [callbackStateVariable] - The variable where to store the result.
                 */
                export const signInWithEmail: (email: string, password: string, callbackStateVariable?: Variable | undefined) => Promise<void>;
                /**
                 * Creates an account with basic email-password authentication.
                 * @param email - The users email.
                 * @param password - The users password.
                 * @param [callbackStateVariable] - The variable where to store the result.
                 */
                export const createAccountWithEmail: (email: string, password: string, callbackStateVariable?: Variable | undefined) => Promise<void>;
                /**
                 * Login with a temporary account.
                 * @param [callbackStateVariable] - The variable where to store the result.
                 */
                export const anonymSignIn: (callbackStateVariable?: Variable | undefined) => Promise<void>;
                /**
                 * Signs the user in with an external provider.
                 * Only works on the web, NOT on Electron/Cordova.
                 * @param providerName - The external provider to use.
                 * @param [callbackStateVariable] - The variable where to store the result.
                 */
                export const signInWithProvider: (providerName: ProviderName, callbackStateVariable?: Variable | undefined) => void;
                export {};
            }
        }
    }
}
