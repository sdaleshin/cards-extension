import { useEffect, useState } from 'react'
import { Translation } from './Translation'
import { debounce } from '../../utils/debounce'
import { getTranslationParamsFromSelection } from '../../utils/getTranslationParamsFromSelection'
import { getTranslationParamsByCoordinates } from '../../utils/getTranslationParamsByCoordinates'

let shiftPressed = false
let word = ''
let context = ''
let lastMouseX = 0
let lastMouseY = 0

export function ContentApp() {
    const [x, setX] = useState(0)
    const [y, setY] = useState(0)
    const [translationText, setTranslationText] = useState('')

    const handleShiftKey = (event: KeyboardEvent) => {
        if (event.shiftKey) {
            shiftPressed = true
            const paramsFromSelection = getTranslationParamsFromSelection()
            if (paramsFromSelection) {
                word = paramsFromSelection.word
                context = paramsFromSelection.context
                requestTranslationWord(
                    paramsFromSelection.x,
                    paramsFromSelection.y,
                )
            } else if (lastMouseY && lastMouseX) {
                const translationParams = getTranslationParamsByCoordinates(
                    lastMouseX,
                    lastMouseY,
                )
                if (translationParams) {
                    word = translationParams.word
                    context = translationParams.context
                    requestTranslationWord(
                        translationParams.x,
                        translationParams.y,
                    )
                }
            }
        } else {
            shiftPressed = false
            setTranslationText('')
            setX(0)
            setY(0)
            if (word) {
                window.getSelection().removeAllRanges()
                word = ''
                context = ''
            }
        }
    }

    const requestTranslationWord = (x, y) => {
        if (word && shiftPressed) {
            setX(x + 15)
            setY(y + 15)
            setTranslationText('')
            chrome.runtime.sendMessage(
                {
                    action: 'requestTranslation',
                    payload: { word, context },
                },
                function (response) {
                    if (
                        response.word === word &&
                        response.context === context &&
                        response.data.choices &&
                        response.data.choices.length
                    ) {
                        setTranslationText(
                            response.data.choices[0].message.content,
                        )
                    }
                },
            )
        }
    }

    useEffect(() => {
        const requestTranslationDebounced = debounce(
            requestTranslationWord,
            200,
        )

        document.addEventListener(
            'mousemove',
            ({ clientX, clientY }) => {
                lastMouseX = clientX
                lastMouseY = clientY
                if (shiftPressed) {
                    const translationParams = getTranslationParamsByCoordinates(
                        clientX,
                        clientY,
                    )
                    if (translationParams) {
                        word = translationParams.word
                        context = translationParams.context
                        requestTranslationDebounced(
                            translationParams.x,
                            translationParams.y,
                        )
                    }
                }
            },
            { passive: true },
        )
        document.addEventListener('keydown', handleShiftKey)
        document.addEventListener('keyup', handleShiftKey)
    }, [])

    return (
        <div>{!!x && <Translation x={x} y={y} text={translationText} />}</div>
    )
}
