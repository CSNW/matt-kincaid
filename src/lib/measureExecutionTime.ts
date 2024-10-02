
// Wrap a function call in a performance timer to measure execution duration in ms.
export function measureExecutionTime(func) {
    const start = performance.now();
    func();
    const end = performance.now();
    return end - start;
}
