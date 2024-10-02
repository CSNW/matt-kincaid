
export function measureExecutionTime(func) {
    const start = performance.now();
    func();
    const end = performance.now();
    return end - start;
}
