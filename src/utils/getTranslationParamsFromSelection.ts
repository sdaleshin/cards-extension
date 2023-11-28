import { TranslationRequestParams } from '../types'
import { generateId } from './generateId'

export function getTranslationParamsFromSelection(): TranslationRequestParams {
    const selection = window.getSelection()
    if (selection.rangeCount > 0) {
        const selectedRange = selection.getRangeAt(0)
        return {
            id: generateId(),
            word: selectedRange.toString(),
            context: selectedRange.endContainer.textContent,
        }
    }
    return null
}
