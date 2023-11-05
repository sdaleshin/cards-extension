import { getCardsUrl, getSettingsUrl, getTranslationUrl } from './utils/apiUrls'
import { authorizedFetch } from './utils/authorizedFetch'
import { generateId } from './utils/generateId'
import { getHash } from './utils/getHash'

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
            case 'addCard':
                return addCard(payload)
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

async function addCard({
    word,
    explanation,
}: {
    word: string
    explanation: string
}) {
    const settingsResponse = await authorizedFetch(getSettingsUrl(), {
        method: 'GET',
    })
    const settings = (await settingsResponse.json()) as {
        extensionTranslationFolderId: string
    }

    await authorizedFetch(getCardsUrl(), {
        method: 'POST',
        body: JSON.stringify({
            id: generateId(),
            title: word,
            hash: getHash({
                title: word,
                explanation,
                folderId: settings.extensionTranslationFolderId,
                type: 'gpt',
            }),
            type: 'gpt',
            explanation: explanation,
            folderId: settings.extensionTranslationFolderId,
        }),
    })
}
