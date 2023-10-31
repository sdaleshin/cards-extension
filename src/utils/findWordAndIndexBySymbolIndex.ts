export function findWordAndIndexBySymbolIndex(text, symbolIndex) {
    const words = text.split(' ')
    let currentIndex = 0

    for (const word of words) {
        const wordLength = word.length

        if (
            symbolIndex >= currentIndex &&
            symbolIndex < currentIndex + wordLength
        ) {
            return [word, currentIndex]
        }

        currentIndex += wordLength + 1 // +1 to account for the space between words
    }

    return ''
}
