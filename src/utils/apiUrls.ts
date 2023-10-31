const baseApiUrl = 'https://api.choodic.com/'

export function getTranslationUrl() {
    return baseApiUrl + 'translation'
}

export function getAuthInExtensionUrl() {
    return baseApiUrl + 'auth/auth-in-extension'
}

export function getRefreshTokenUrl() {
    return baseApiUrl + 'auth/refresh-token'
}
