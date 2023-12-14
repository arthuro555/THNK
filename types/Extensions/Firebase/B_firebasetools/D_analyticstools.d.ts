declare namespace gdjs {
    namespace evtTools {
        namespace firebaseTools {
            /**
             * Firebase Analytics Tools
             * @namespace
             */
            namespace analytics {
                /**
                 * Logs an event/conversion for that user on the analytics.
                 * @param eventName The event being triggered.
                 * @param [eventData] Additional data for the event.
                 */
                const log: (eventName: string, eventData: string) => void;
                /**
                 * Sets the User ID (the name under which the user will appear on the analytics).
                 * Should be unique if possible.
                 * @param newUID The new User ID.
                 */
                const setUserID: (newUID: string) => void;
                /**
                 * Set an user's property.
                 * @param propertyName The property's name.
                 * @param [propertyData] The data associated to the property.
                 */
                const setProperty: (propertyName: string, propertyData: string) => void;
            }
        }
    }
}
