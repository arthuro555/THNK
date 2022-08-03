declare namespace gdjs {
    namespace evtTools {
        namespace firebaseTools {
            /**
             * Firebase Cloud Firestore Event Tools.
             * @namespace
             */
            namespace firestore {
                /**
                 * Initiate a query over a collection.
                 * @param queryID - The name of the new query.
                 * @param collectionName - The name of the collection to query.
                 */
                const startQuery: (queryID: string, collectionName: string) => void;
                /**
                 * Create a new query from a base query.
                 * @param queryID - The name of the new query.
                 * @param sourceQueryID - The name of the source query.
                 */
                const startQueryFrom: (queryID: string, sourceQueryID: string) => void;
                /**
                 * Filters out documents whose fields do not match a condition
                 * from a query.
                 * @param queryID - The query to add the filter to.
                 * @param field - The field to run the condition on.
                 * @param op - The condtion operator.
                 * @param value - The value to check against.
                 */
                const queryWhere: (queryID: string, field: string, op: Exclude<firebase.firestore.WhereFilterOp, 'in' | 'array-contains-any' | 'not-in'>, value: string | number) => void;
                /**
                 * Orders the documents in a query.
                 *
                 * @param queryID - The query to add the filter to.
                 * @param field - The field to order by.
                 * @param direction - The direction of ordering (ascending or descending).
                 */
                const queryOrderBy: (queryID: string, field: string, direction: firebase.firestore.OrderByDirection) => void;
                /**
                 * Limits the amount of documents returned by the query.
                 *
                 * @param queryID - The query to add the filter to.
                 * @param amount - The amount of documents to limit to
                 * @param last - If true, limits to the last documents instead of the first documents.
                 */
                const queryLimit: (queryID: string, amount: integer, last: boolean) => void;
                /**
                 * Makes a query skip documents after or before a certain
                 * value of a field the query was ordered with.
                 *
                 * @param queryID - The query to add the filter to.
                 * @param value - The value of the field ordered by.
                 * @param before - If set to true, all documents before the document are skipped, else all documents after it are skipped.
                 * @param includeSelf - If set to true, doesn't skip the document.
                 */
                const querySkipSome: (queryID: string, value: number, before: boolean, includeSelf: boolean) => void;
                /**
                 * Execute a query and store results in a callback variable.
                 *
                 * @param queryID - The query to execute.
                 * @param [callbackValueVariable] - The variable where to store the result.
                 * @param [callbackStatusVariable] - The variable where to store if the operation was successful.
                 */
                const executeQuery: (queryID: string, callbackValueVariable?: Variable | undefined, callbackStatusVariable?: Variable | undefined) => void;
                /**
                 * Watch a query and store results in a callback
                 * variable whenever a documents starts/stops
                 * matching the query or a document matching
                 * the query is modified.
                 *
                 * @param queryID - The query to execute.
                 * @param [callbackValueVariable] - The variable where to store the result.
                 * @param [callbackStatusVariable] - The variable where to store if the operation was successful.
                 */
                const watchQuery: (queryID: string, callbackValueVariable?: Variable | undefined, callbackStatusVariable?: Variable | undefined) => void;
                /**
                 * Adds a variable in a collection as document with a unique name.
                 * @param collectionName - The collection where to store the variable.
                 * @param variable - The variable to write.
                 * @param [callbackStateVariable] - The variable where to store the result.
                 */
                const addDocument: (collectionName: string, variable: gdjs.Variable, callbackStateVariable?: Variable | undefined) => void;
                /**
                 * Writes a variable in a collection as document.
                 * @param collectionName - The collection where to store the variable.
                 * @param variableName - The name under wich the variable will be saved (document name).
                 * @param variable - The variable to write.
                 * @param [callbackStateVariable] - The variable where to store the result.
                 */
                const writeDocument: (collectionName: string, variableName: string, variable: gdjs.Variable, callbackStateVariable?: Variable | undefined) => void;
                /**
                 * Writes a field of a document.
                 * @param collectionName - The collection where to store the document.
                 * @param documentName - The name of the document where to write a field.
                 * @param field - The field where to write.
                 * @param value - The value to write.
                 * @param [callbackStateVariable] - The variable where to store the result.
                 * @param [merge] - Should the new field replace the document or be merged with the document?
                 */
                const writeField: (collectionName: string, documentName: string, field: string, value: any, callbackStateVariable?: Variable | undefined, merge?: boolean) => void;
                /**
                 * Updates a variable/document.
                 * @param collectionName - The collection where the document is stored.
                 * @param variableName - The name under wich the variable will be saved (document name).
                 * @param variable - The variable to update.
                 * @param [callbackStateVariable] - The variable where to store the result.
                 */
                const updateDocument: (collectionName: string, variableName: string, variable: gdjs.Variable, callbackStateVariable?: Variable | undefined) => void;
                /**
                 * Updates a field of a document.
                 * @param collectionName - The collection where the document is stored.
                 * @param documentName - The name of the document where to update a field.
                 * @param field - The field where to update.
                 * @param value - The value to write.
                 * @param [callbackStateVariable] - The variable where to store the result.
                 */
                const updateField: (collectionName: string, documentName: string, field: string, value: any, callbackStateVariable?: Variable | undefined) => void;
                /**
                 * Deletes a document.
                 * @param collectionName - The collection where the document is stored.
                 * @param documentName - The name of the document to delete.
                 * @param [callbackStateVariable] - The variable where to store the result.
                 */
                const deleteDocument: (collectionName: string, documentName: string, callbackStateVariable?: Variable | undefined) => void;
                /**
                 * Deletes a field of a document.
                 * @param collectionName - The collection where the document is stored.
                 * @param documentName - The name of the document where to delete a field.
                 * @param field - The field to delete.
                 * @param [callbackStateVariable] - The variable where to store the result.
                 */
                const deleteField: (collectionName: string, documentName: string, field: string, callbackStateVariable?: Variable | undefined) => void;
                /**
                 * Gets a document and store it in a variable.
                 * @param collectionName - The collection where the document is stored.
                 * @param documentName - The name of the document to get.
                 * @param [callbackValueVariable] - The variable where to store the result.
                 * @param [callbackStateVariable] - The variable where to store if the operation was successful.
                 */
                const getDocument: (collectionName: string, documentName: string, callbackValueVariable?: Variable | undefined, callbackStateVariable?: Variable | undefined) => void;
                /**
                 * Gets a field of a document and store it in a variable.
                 * @param collectionName - The collection where the document is stored.
                 * @param documentName - The name of the document.
                 * @param field - The field to get.
                 * @param [callbackValueVariable] - The variable where to store the result.
                 * @param [callbackStateVariable] - The variable where to store if the operation was successful.
                 */
                const getField: (collectionName: string, documentName: string, field: string, callbackValueVariable?: Variable | undefined, callbackStateVariable?: Variable | undefined) => void;
                /**
                 * Checks for existence of a document.
                 * @param collectionName - The collection where the document is stored.
                 * @param documentName - The name of the document to check.
                 * @param [callbackValueVariable] - The variable where to store the result.
                 * @param [callbackStateVariable] - The variable where to store if the operation was successful.
                 */
                const hasDocument: (collectionName: string, documentName: string, callbackValueVariable?: Variable | undefined, callbackStateVariable?: Variable | undefined) => void;
                /**
                 * Checks for existence of a field.
                 * @param collectionName - The collection where the document is stored.
                 * @param documentName - The name of the document.
                 * @param field - The field to check.
                 * @param [callbackValueVariable] - The variable where to store the result.
                 * @param [callbackStateVariable] - The variable where to store if the operation was successful.
                 */
                const hasField: (collectionName: string, documentName: string, field: string, callbackValueVariable?: Variable | undefined, callbackStateVariable?: Variable | undefined) => void;
                /**
                 * Lists all the documents in a collection.
                 * @param collectionName - The collection where to count documents.
                 * @param [callbackValueVariable] - The variable where to store the result.
                 * @param [callbackStateVariable] - The variable where to store if the operation was successful.
                 *
                 * @deprecated Use a query without filters instead.
                 */
                const listDocuments: (collectionName: string, callbackValueVariable?: Variable | undefined, callbackStateVariable?: Variable | undefined) => void;
                /**
                 * Returns a special string replaced by a firebase serverTimestamp field value.
                 */
                const getServerTimestamp: () => string;
            }
        }
    }
}
