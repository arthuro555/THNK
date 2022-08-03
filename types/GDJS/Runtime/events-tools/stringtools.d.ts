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
            const toUpperCase: (str: any) => any;
            /**
             * Return the lowercased version of the string.
             */
            const toLowerCase: (str: any) => any;
            /**
             * Return a new string containing the substring of the original string.
             */
            const subStr: (str: any, start: any, len: any) => any;
            /**
             * Return a new string containing the character at the specified position.
             */
            const strAt: (str: any, start: any) => any;
            /**
             * Return the string repeated.
             */
            const strRepeat: (str: any, count: any) => string;
            /**
             * Return the length of the string
             */
            const strLen: (str: any) => any;
            /**
             * Search the first occurence in a string (return the position of the result, from the beginning of the string, or -1 if not found)
             */
            const strFind: (str: any, what: any) => any;
            /**
             * Search the last occurence in a string (return the position of the result, from the beginning of the string, or -1 if not found)
             */
            const strFindLast: (str: any, what: any) => any;
            /**
             * @deprecated
             */
            const strRFind: (str: any, what: any) => any;
            /**
             * Search the first occurence in a string, starting from a specified position (return the position of the result, from the beginning of the string, or -1 if not found)
             */
            const strFindFrom: (str: any, what: any, pos: any) => any;
            /**
             * Search the last occurence in a string, starting from a specified position (return the position of the result, from the beginning of the string, or -1 if not found)
             */
            const strFindLastFrom: (str: any, what: any, pos: any) => any;
            /**
             * @deprecated
             */
            const strRFindFrom: (str: any, what: any, pos: any) => any;
        }
    }
}
