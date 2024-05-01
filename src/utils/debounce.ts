
export function debounce<T extends (...args: any[]) => void>(callback: T, delay: number): (...args: Parameters<T>) => void {
    let timeoutId: ReturnType<typeof setTimeout>;

    return function (this: ThisParameterType<T>, ...args: Parameters<T>): void {
        const context = this;

        clearTimeout(timeoutId);

        timeoutId = setTimeout(() => {
            callback.apply(context, args);
        }, delay);
    };
}