import { useEffect, useState } from 'react'
import { Translation } from './Translation'
import { getTranslationParamsFromSelection } from '../../utils/getTranslationParamsFromSelection'
import { TranslationRequestParams } from '../../types'

interface MouseCoordinates {
    x: number
    y: number
}

const ALLOW_MOUSE_MOVE_DISTANCE = 5

function isMouseMoving(
    previous: MouseCoordinates,
    current: MouseCoordinates,
): boolean {
    const distance = Math.sqrt(
        (previous.x - current.x) ** 2 + (previous.y - current.y) ** 2,
    )
    return distance > ALLOW_MOUSE_MOVE_DISTANCE
}

let mouseDown: boolean = false
let checkMouseMoveTimeout: any = null
let currentMouseCoordinates: MouseCoordinates = null
let translationRequestParams: TranslationRequestParams = null

export function ContentApp() {
    const [x, setX] = useState(0)
    const [y, setY] = useState(0)
    const [translationText, setTranslationText] = useState('')

    const abortTranslation = () => {
        setTranslationText('')
        setX(0)
        setY(0)
        translationRequestParams = null
    }

    const isResponseRelevant = (response: any) => {
        return response.id === translationRequestParams?.id
    }

    const setUpCheckMouseInterval = (
        previousMouseCoordinates: MouseCoordinates,
    ) => {
        checkMouseMoveTimeout = setTimeout(() => {
            if (
                isMouseMoving(previousMouseCoordinates, currentMouseCoordinates)
            ) {
                if (translationRequestParams) {
                    abortTranslation()
                }
                setUpCheckMouseInterval(currentMouseCoordinates)
                // else {
                //     checkMouseMoveTimeout = null
                // }
            } else {
                translate()
                checkMouseMoveTimeout = null
            }
        }, 200)
    }

    const translate = () => {
        let newTranslationRequestParams = getTranslationParamsFromSelection()
        if (
            newTranslationRequestParams?.word &&
            (translationRequestParams?.word !==
                newTranslationRequestParams?.word ||
                translationRequestParams?.context !==
                    newTranslationRequestParams?.context)
        ) {
            translationRequestParams = newTranslationRequestParams
            requestTranslationWord(
                currentMouseCoordinates.x,
                currentMouseCoordinates.y,
            )
        }
    }

    const requestTranslationWord = (x, y) => {
        setX(x + 15)
        setY(y + 15)
        setTranslationText('')
        chrome.runtime.sendMessage(
            {
                action: 'requestTranslation',
                payload: translationRequestParams,
            },
            function (response) {
                if (!isResponseRelevant(response)) {
                    return
                }
                if (response.data === null) {
                    abortTranslation()
                    return
                }

                if (response.data.choices && response.data.choices.length) {
                    const explanation = response.data.choices[0].message.content
                    setTranslationText(explanation)
                    chrome.runtime.sendMessage({
                        action: 'addCard',
                        payload: {
                            word: translationRequestParams.word,
                            explanation,
                        },
                    })
                }
            },
        )
    }

    useEffect(() => {
        document.addEventListener(
            'mousemove',
            ({ clientX, clientY }) => {
                if (mouseDown && !checkMouseMoveTimeout) {
                    setUpCheckMouseInterval(currentMouseCoordinates)
                }
                currentMouseCoordinates = {
                    x: clientX,
                    y: clientY,
                }
            },
            { passive: true },
        )
        document.addEventListener('mousedown', (event: MouseEvent) => {
            if (event.button === 0) {
                mouseDown = true
                setUpCheckMouseInterval(currentMouseCoordinates)
            }
        })
        document.addEventListener('mouseup', () => {
            mouseDown = false
            checkMouseMoveTimeout && clearInterval(checkMouseMoveTimeout)
            abortTranslation()
        })
    }, [])

    return (
        <div>{!!x && <Translation x={x} y={y} text={translationText} />}</div>
    )
}
