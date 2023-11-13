import { getRefreshTokenUrl } from './apiUrls'
import { ITokens } from '../background'
import { basicFetch } from './basicFetch'

let refreshPromise = null

export async function authorizedFetch(url: string, options: RequestInit) {
    let tokens: ITokens = (await chrome.storage.local.get(['choodic_tokens']))
        .choodic_tokens
    if (refreshPromise) {
        try {
            tokens = await refreshPromise
        } catch (e) {}
    }
    let response = await basicFetch(url, {
        ...options,
        headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + tokens.token,
        },
    })
    if (response.status === 401) {
        refreshPromise = new Promise(async (resolve, reject) => {
            const refreshTokenResponse = await basicFetch(
                getRefreshTokenUrl(),
                {
                    method: 'POST',
                    body: JSON.stringify({ refreshToken: tokens.refreshToken }),
                    headers: {
                        'Content-Type': 'application/json',
                    },
                },
            )
            if (refreshTokenResponse.status !== 201) {
                chrome.tabs.create({ url: 'index.html' })
                reject()
            }
            tokens = await refreshTokenResponse.json()
            chrome.runtime.sendMessage({
                action: 'setTokens',
                payload: tokens,
            })
            resolve(tokens)
        })
        await refreshPromise
        return await basicFetch(url, {
            ...options,
            headers: {
                'Content-Type': 'application/json',
                Authorization: 'Bearer ' + tokens.token,
            },
        })
    }
    return response
}
