export function debounce<F extends (...args: any) => any>(
    func: F,
    waitFor: number,
) {
    let timeoutId

    return function () {
        const context = this
        const args = arguments

        clearTimeout(timeoutId)

        timeoutId = setTimeout(function () {
            func.apply(context, args)
        }, waitFor)
    } as F
}
