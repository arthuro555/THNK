declare namespace gdjs {
    namespace evtTools {
        namespace firebaseTools {
            /**
             * Firebase Storage Event Tools
             * @namespace
             */
            namespace storage {
                /**
                 * The map containing all current uploads.
                 */
                const uploads: Map<string, firebase.storage.UploadTask>;
                /**
                 * Uploads a file as string to the firebase storage bucket.
                 * @param file - The entire file as string.
                 * @param onlinePath - The path under which the file will be accessible on the bucket.
                 * @param [type] - The type/format of the string to upload.
                 * @param [callbackStateVariable] - The variable where to store if the operation was successful.
                 * @param [callbackValueVariable] - The variable where to store the result (url to the file).
                 */
                const uploadFile: (uploadID: string, file: string, onlinePath: string, type?: "none" | "base64" | "base64url" | "data_url" | undefined, callbackStateVariable?: Variable | undefined, callbackValueVariable?: Variable | undefined) => void;
                /**
                 * Generate a download URL for a file.
                 * @param filePath - The path in the remote storage bucket to the file to download.
                 * @param [callbackValueVariable] - The variable where to store the result.
                 * @param [callbackStateVariable] - The variable where to store if the operation was successful.
                 */
                const getDownloadURL: (filePath: string, callbackValueVariable?: Variable | undefined, callbackStateVariable?: Variable | undefined) => void;
                /**
                 * Deletes a file on the remote storage bucket.
                 * @param filePath - The path in the remote storage bucket to the file to download.
                 * @param [callbackStateVariable] - The variable where to store if the operation was successful.
                 */
                const deleteFile: (filePath: string, callbackStateVariable?: Variable | undefined) => void;
            }
        }
    }
}
