declare namespace gdjs {
    namespace evtTools {
        namespace firebaseTools {
            /**
             * Firebase Cloud database Event Tools.
             * @namespace
             */
            namespace database {
                /**
                 * (Over)writes a variable in a collection as database variable.
                 * @param path - The path where to store the variable.
                 * @param variable - The variable to write.
                 * @param [callbackStateVariable] - The variable where to store the result.
                 */
                const writeVariable: (path: string, variable: gdjs.Variable, callbackStateVariable?: Variable | undefined) => void;
                /**
                 * (Over)writes a field of a database variable.
                 * @param path - The path where to write the field.
                 * @param field - What field to write.
                 * @param value - The value to write.
                 * @param [callbackStateVariable] - The variable where to store the result.
                 */
                const writeField: (path: string, field: string, value: string | number, callbackStateVariable?: Variable | undefined) => void;
                /**
                 * Updates a database variable.
                 * @param path - The name under which the variable will be saved (document name).
                 * @param variable - The variable to update.
                 * @param [callbackStateVariable] - The variable where to store the result.
                 */
                const updateVariable: (path: string, variable: gdjs.Variable, callbackStateVariable?: Variable | undefined) => void;
                /**
                 * Updates a field of a database variable.
                 * @param path - The name under which the variable will be saved (document name).
                 * @param field - The field where to update.
                 * @param value - The value to write.
                 * @param [callbackStateVariable] - The variable where to store the result.
                 */
                const updateField: (path: string, field: string, value: string | number, callbackStateVariable?: Variable | undefined) => void;
                /**
                 * Deletes a database variable.
                 * @param path - The name under which the variable will be saved (document name).
                 * @param [callbackStateVariable] - The variable where to store the result.
                 */
                const deleteVariable: (path: string, callbackStateVariable?: Variable | undefined) => void;
                /**
                 * Deletes a field of a database variable.
                 * @param path - The name under which the variable will be saved (document name).
                 * @param field - The field to delete.
                 * @param [callbackStateVariable] - The variable where to store the result.
                 */
                const deleteField: (path: string, field: string, callbackStateVariable?: Variable | undefined) => void;
                /**
                 * Gets a database variable and store it in a variable.
                 * @param path - The name under which the variable will be saved (document name).
                 * @param callbackValueVariable - The variable where to store the result.
                 * @param [callbackStateVariable] - The variable where to store if the operation was successful.
                 */
                const getVariable: (path: string, callbackValueVariable: gdjs.Variable, callbackStateVariable?: Variable | undefined) => void;
                /**
                 * Gets a field of a database variable and store it in a variable.
                 * @param path - The name under which the variable will be saved (document name).
                 * @param field - The field to get.
                 * @param callbackValueVariable - The variable where to store the result.
                 * @param [callbackStateVariable] - The variable where to store if the operation was successful.
                 */
                const getField: (path: string, field: string, callbackValueVariable: gdjs.Variable, callbackStateVariable?: Variable | undefined) => void;
                /**
                 * Checks for existence of a database variable.
                 * @param path - The name under which the variable will be saved (document name).
                 * @param callbackValueVariable - The variable where to store the result.
                 * @param [callbackStateVariable] - The variable where to store if the operation was successful.
                 */
                const hasVariable: (path: string, callbackValueVariable: gdjs.Variable, callbackStateVariable?: Variable | undefined) => void;
                /**
                 * Checks for existence of a database variable.
                 * @param path - The name under which the variable will be saved (document name).
                 * @param field - The field to check.
                 * @param callbackValueVariable - The variable where to store the result.
                 * @param [callbackStateVariable] - The variable where to store if the operation was successful.
                 */
                const hasField: (path: string, field: string, callbackValueVariable: gdjs.Variable, callbackStateVariable?: Variable | undefined) => void;
            }
        }
    }
}
