import { useEffect, useState } from 'react'
import { Translation } from './Translation'
import { findWordBySymbolIndex } from '../../utils/findWordBySymbolIndex'
import { debounce } from '../../utils/debounce'

let shiftPressed = false

export function ContentApp() {
    const [x, setX] = useState(0)
    const [y, setY] = useState(0)
    const [translationText, setTranslationText] = useState('')

    const handleShiftKey = (event) => {
        if (event.shiftKey) {
            shiftPressed = true
        } else {
            shiftPressed = false
            setTranslationText('')
            setX(0)
            setY(0)
        }
    }

    useEffect(() => {
        const requestWord = debounce((word: string, context: string, x, y) => {
            if (word && shiftPressed) {
                setX(x)
                setY(y)
                chrome.runtime.sendMessage(
                    {
                        action: 'requestTranslation',
                        payload: { word, context },
                    },
                    function (response) {
                        if (response.choices && response.choices.length) {
                            setTranslationText(
                                response.choices[0].message.content,
                            )
                        }
                    },
                )
            }
        }, 200)

        document.addEventListener(
            'mousemove',
            (e) => {
                if (shiftPressed) {
                    const textContext = document.elementFromPoint(
                        e.clientX,
                        e.clientY,
                    )?.innerText
                    const range = document.caretRangeFromPoint(
                        e.clientX,
                        e.clientY,
                    )
                    const word = findWordBySymbolIndex(
                        range.commonAncestorContainer.textContent.replace(
                            /[,\.]/g,
                            ' ',
                        ),
                        range.startOffset,
                    )
                    requestWord(word, textContext, e.clientX, e.clientY)
                }
            },
            { passive: true },
        )
        document.addEventListener('keydown', handleShiftKey)
        document.addEventListener('keyup', handleShiftKey)
    }, [])

    return <div>{x && <Translation x={x} y={y} text={translationText} />}</div>
}
