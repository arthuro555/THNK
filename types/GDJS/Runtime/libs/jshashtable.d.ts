/**
 * A generic map (key-value) container.
 *
 * Used notably for storing lists of objects for
 * GDevelop generated events.
 */
declare class Hashtable<T> {
    /**
     * The content of the Hashtable. Prefer using methods rather
     * than accessing this internal object, unless you need to iterate
     * on the values.
     */
    items: {
        [key: string]: T;
    };
    /**
     * Construct a Hashtable from a JS object.
     *
     * @param items The content of the Hashtable.
     * @returns The new hashtable.
     * @static
     */
    static newFrom<T>(items: {
        [key: string]: T;
    }): Hashtable<T>;
    /**
     * Add a key-value pair to the Hashtable.
     * If a value already exists for this key, it is overwritten.
     *
     * @param key The key.
     * @param value The value to associate to the key.
     */
    put(key: string | number, value: T): void;
    /**
     * Get a value corresponding to a key, or undefined if not found.
     *
     * @param key The key associated to the value.
     */
    get(key: string | number): T;
    /**
     * Verify if a key exists in the Hashtable.
     *
     * @param key The key to search in the Hashtable.
     * @returns true if the key exists.
     */
    containsKey(key: string | number): boolean;
    /**
     * Remove the value associated to the specified key.
     *
     * @param key The key to remove.
     */
    remove(key: string | number): void;
    /**
     * Get the first key of the Hashtable.
     *
     * @returns The first key of the Hashtable, or undefined if empty.
     */
    firstKey(): string | number | null;
    /**
     * Dump all the keys of the Hashtable to an array (which is cleared first).
     *
     * @param result The Array where the result gets pushed.
     */
    keys(result: string[]): void;
    /**
     * Dump all the values of the Hashtable to an array (which is cleared first).
     *
     * @param result The Array where the results get pushed.
     */
    values(result: Array<T>): void;
    /**
     * Clear the Hashtable.
     */
    clear(): void;
}
