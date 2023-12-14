declare namespace gdjs {
    namespace evtTools {
        /**
         * Tools related to strings manipulation, for events generated code.
         */
        namespace string {
            /**
             * Return a string containing a new line character.
             */
            const newLine: () => string;
            /**
             * Return a character from its codepoint.
             */
            const fromCodePoint: (codePoint: any) => string;
            /**
             * Return the uppercased version of the string.
             */
            const toUpperCase: (str: string) => string;
            /**
             * Return the lowercased version of the string.
             */
            const toLowerCase: (str: string) => string;
            /**
             * Return a new string containing the substring of the original string.
             */
            const subStr: (str: string, start: integer, len: integer) => string;
            /**
             * Return a new string containing the character at the specified position.
             */
            const strAt: (str: string, start: integer) => string;
            /**
             * Return the string repeated.
             */
            const strRepeat: (str: string, count: integer) => string;
            /**
             * Return the length of the string
             */
            const strLen: (str: string) => number;
            /**
             * Search the first occurrence in a string (return the position of the result, from the beginning of the string, or -1 if not found)
             */
            const strFind: (str: string, what: string) => number;
            /**
             * Search the last occurrence in a string (return the position of the result, from the beginning of the string, or -1 if not found)
             */
            const strFindLast: (str: string, what: string) => number;
            /**
             * @deprecated
             */
            const strRFind: (str: string, what: string) => number;
            /**
             * Search the first occurrence in a string, starting from a specified position (return the position of the result, from the beginning of the string, or -1 if not found)
             */
            const strFindFrom: (str: string, what: string, pos: integer) => number;
            /**
             * Search the last occurrence in a string, starting from a specified position (return the position of the result, from the beginning of the string, or -1 if not found)
             */
            const strFindLastFrom: (str: string, what: string, pos: integer) => number;
            /**
             * Return a new string with the content of `str` where the first occurrence of `pattern`
             * is replaced by `replacement`.
             */
            const strReplaceOne: (str: string, pattern: string, replacement: string) => string;
            /**
             * Return a new string with the content of `str` where all occurrences of `pattern`
             * are replaced by `replacement`.
             */
            const strReplaceAll: (str: string, pattern: string, replacement: string) => string;
            /**
             * @deprecated
             */
            const strRFindFrom: (str: string, what: string, pos: integer) => number;
        }
    }
}
