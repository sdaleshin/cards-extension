import { TranslationRequestParams } from '../types'
import { findWordAndIndexBySymbolIndex } from './findWordAndIndexBySymbolIndex'
import { generateId } from './generateId'

export function getTranslationParamsByCoordinates(
    x: number,
    y: number,
): TranslationRequestParams {
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
                id: generateId(),
                word: foundWord,
                context: elementFromPoint?.innerText,
            }
        }
    }

    return null
}
