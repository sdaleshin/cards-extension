import { TranslationRequestParams } from '../types'
import { generateId } from './generateId'

export function getTranslationParamsFromSelection(): TranslationRequestParams {
    const selection = window.getSelection()
    if (!selection.rangeCount) {
        return null
    }
    const selectedRange = selection.getRangeAt(0)
    const word = selectedRange.toString()
    if (!word) {
        return null
    }
    return {
        id: generateId(),
        word,
        context: selectedRange.endContainer.textContent,
    }
}
