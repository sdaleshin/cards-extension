import { getTranslationUrl } from './utils/apiUrls'
import { authorizedFetch } from './utils/authorizedFetch'

export interface ITokens {
    token: string
    refreshToken: string
}

chrome.runtime.onInstalled.addListener(function () {
    chrome.tabs.create({ url: 'index.html' })
})
chrome.runtime.onMessage.addListener(
    ({ action, payload }, sender, sendResponse) => {
        switch (action) {
            case 'requestTranslation':
                return requestTranslation(payload, sendResponse)
            case 'setTokens':
                chrome.storage.local.set({ choodic_tokens: payload })
        }
    },
)

function requestTranslation({ word, context }, sendResponse) {
    authorizedFetch(getTranslationUrl(), {
        method: 'POST',
        body: JSON.stringify({
            word,
            context,
        }),
    })
        .then((response) => response.json())
        .then((data) => {
            sendResponse({ data, word, context })
        })
    return true
}
