let shiftPressed = false
const requestWord  = debounce((word) => {
    console.log('word', word)
    if(word) {
        chrome.runtime.sendMessage({action: 'requestTranslation', payload: word}, function (response) {
            // Handle the response received from the background script
            console.log('response', response)
        });
    }
}, 200)
document.addEventListener('mousemove', e => {
    console.log('shiftPressed', shiftPressed);
    if(shiftPressed) {
        const textContext = document.elementFromPoint(e.clientX, e.clientY)?.innerText
        const range = document.caretRangeFromPoint(e.clientX, e.clientY);
        const word = findWordBySymbolIndex(range.commonAncestorContainer.textContent.replace(/[,\.]/g, ' '), range.startOffset)
        console.log('wwwword', word);
        requestWord(word)
    }
}, {passive: true})

// chrome.runtime.sendMessage({ action: 'requestTranslation', payload: 'word' }, function(response) {
//     // Handle the response received from the background script
//     console.log('response', response)
// });


document.addEventListener('keydown', handleShiftKey);
document.addEventListener('keyup', handleShiftKey);

function handleShiftKey(event) {
    if (event.shiftKey) {
        shiftPressed = true
    } else {
        shiftPressed = false
    }
}

function findWordBySymbolIndex(text, symbolIndex) {
    const words = text.split(' ');
    let currentIndex = 0;

    for (const word of words) {
        const wordLength = word.length;

        if (symbolIndex >= currentIndex && symbolIndex < currentIndex + wordLength) {
            return word;
        }

        currentIndex += wordLength + 1; // +1 to account for the space between words
    }

    return '';
}

function debounce(func, delay) {
    let timeoutId;

    return function() {
        const context = this;
        const args = arguments;

        clearTimeout(timeoutId);

        timeoutId = setTimeout(function() {
            func.apply(context, args);
        }, delay);
    };
}
