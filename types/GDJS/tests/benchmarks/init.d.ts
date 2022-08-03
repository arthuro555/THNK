/**
 * Helper allowing to run a benchmark of the time spent the execute a certain
 * number of iterations of one or more functions.
 *
 * Note that this could surely be replaced by a more robust solution like
 * Benchmark.js
 *
 * @param {*} options
 */
declare function makeBenchmarkSuite(options?: any): {
    add(title: any, fn: any): any;
    run(): {};
};
