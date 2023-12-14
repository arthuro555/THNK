/**
 * Turns a callback variable into a promise.
 * @param {(callbackVariable: {setString: (result: "ok" | string) => void}, result: gdjs.Variable) => any} executor
 * @returns {Promise<gdjs.Variable>}
 */
declare function promisifyCallbackVariables(executor: (callbackVariable: {
    setString: (result: "ok" | string) => void;
}, result: gdjs.Variable) => any): Promise<gdjs.Variable>;
/** A complex variable using all variables types. */
declare const variable: gdjs.Variable;
declare namespace firebaseConfig {
    const apiKey: string;
    const authDomain: string;
    const databaseURL: string;
    const projectId: string;
    const storageBucket: string;
    const messagingSenderId: string;
    const appId: string;
    const measurementId: string;
}
declare const describeIfOnline: Mocha.PendingSuiteFunction;
