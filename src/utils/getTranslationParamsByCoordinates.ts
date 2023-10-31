import { TranslationParams } from '../types'
import { findWordAndIndexBySymbolIndex } from './findWordAndIndexBySymbolIndex'

export function getTranslationParamsByCoordinates(
    x: number,
    y: number,
): TranslationParams {
    const elementFromPoint = document.elementFromPoint(x, y)
    const range = document.caretRangeFromPoint(x, y)
    if (elementFromPoint && range) {
        const [foundWord, wordIndex] = findWordAndIndexBySymbolIndex(
            range.commonAncestorContainer.textContent.replace(/[,\.]/g, ' '),
            range.startOffset,
        )
        if (foundWord) {
            range.setStart(range.startContainer, wordIndex)
            range.setEnd(range.endContainer, wordIndex + foundWord.length)

            const selection = window.getSelection()
            selection.removeAllRanges()
            selection.addRange(range)
            return {
                word: foundWord,
                context: elementFromPoint?.innerText,
                x,
                y,
            }
        }
    }

    return null
}
