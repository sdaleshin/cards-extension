import { getRefreshTokenUrl } from './apiUrls'
import { basicFetch } from './basicFetch'
import { createAuthorizedFetch, Tokens } from 'authorized-fetch-refresh'

export const authorizedFetch = createAuthorizedFetch(
    async () => {
        return (await chrome.storage.local.get(['choodic_tokens']))
            .choodic_tokens
    },
    (tokens: Tokens) => {
        chrome.storage.local.set({ choodic_tokens: tokens })
    },
    getRefreshTokenUrl(),
    {
        fetch: basicFetch,
        onRefreshFailure: () => {
            chrome.tabs.create({ url: 'index.html' })
        },
    },
)
