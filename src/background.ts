interface ITokens {
    token: string
    refreshToken: string
}

let tokens: ITokens = null
chrome.storage.local.get(['tokens']).then((result: any) => {
    tokens = result.tokens
})

chrome.runtime.onInstalled.addListener(function () {
    chrome.tabs.create({ url: 'index.html' })
})
chrome.runtime.onMessage.addListener(
    ({ action, payload }, sender, sendResponse) => {
        switch (action) {
            case 'requestTranslation':
                return requestTranslation(payload, sendResponse)
            case 'setTokens':
                tokens = payload
                chrome.storage.local.set({ tokens: payload })
        }
    },
)

function requestTranslation({ word, context }, sendResponse) {
    fetch('https://api.choodic.com/translation', {
        method: 'POST',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + tokens.token,
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify({
            word,
            context,
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            sendResponse(data)
        })
    return true
}
