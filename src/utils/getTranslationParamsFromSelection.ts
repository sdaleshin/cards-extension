import { TranslationParams } from '../types'

export function getTranslationParamsFromSelection(): TranslationParams {
    const selection = window.getSelection()
    if (selection.rangeCount > 0) {
        const selectedRange = selection.getRangeAt(0)
        const rect = selectedRange.getBoundingClientRect()
        return {
            word: selectedRange.toString(),
            context: selectedRange.endContainer.textContent,
            x: rect.left,
            y: rect.top,
        }
    }
    return null
}
