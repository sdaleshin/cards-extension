let shiftPressed = false
const requestWord = debounce((word, context, x, y) => {
    console.log('word', word)
    console.log('textContext', context)
    if (word) {
        if (divElement) {
            divElement.remove()
        }
        chrome.runtime.sendMessage(
            { action: 'requestTranslation', payload: { word, context } },
            function (response) {
                console.log('response', response)
                if (response.choices && response.choices.length) {
                    renderTranslation(x, y, response.choices[0].message.content)
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
            const range = document.caretRangeFromPoint(e.clientX, e.clientY)
            const word = findWordBySymbolIndex(
                range.commonAncestorContainer.textContent.replace(
                    /[,\.]/g,
                    ' ',
                ),
                range.startOffset,
            )
            console.log('word', word)
            requestWord(word, textContext, e.clientX, e.clientY)
        }
    },
    { passive: true },
)
document.addEventListener('keydown', handleShiftKey)
document.addEventListener('keyup', handleShiftKey)

function handleShiftKey(event) {
    if (event.shiftKey) {
        shiftPressed = true
    } else {
        shiftPressed = false
        if (divElement) {
            divElement.remove()
        }
    }
}

function findWordBySymbolIndex(text, symbolIndex) {
    const words = text.split(' ')
    let currentIndex = 0

    for (const word of words) {
        const wordLength = word.length

        if (
            symbolIndex >= currentIndex &&
            symbolIndex < currentIndex + wordLength
        ) {
            return word
        }

        currentIndex += wordLength + 1 // +1 to account for the space between words
    }

    return ''
}

function debounce(func, delay) {
    let timeoutId

    return function () {
        const context = this
        const args = arguments

        clearTimeout(timeoutId)

        timeoutId = setTimeout(function () {
            func.apply(context, args)
        }, delay)
    }
}

let divElement = null

function renderTranslation(x, y, text) {
    if (divElement) {
        divElement.remove()
    }
    divElement = document.createElement('div')
    divElement.style.position = 'absolute'
    divElement.style.left = x + window.pageXOffset + 'px'
    divElement.style.top = y + window.pageYOffset + 'px'
    divElement.style.padding = '16px'
    divElement.style.borderWidth = '1px'
    divElement.style.borderRadius = '4px'
    divElement.style.fontSize = '16px'
    divElement.style.backgroundColor = 'white'
    divElement.style.zIndex = '99999'
    divElement.style.maxWidth = '300px'
    divElement.textContent = text
    document.body.appendChild(divElement)
}
