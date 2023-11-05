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

export function getSettingsUrl() {
    return baseApiUrl + 'settings'
}

export function getCardsUrl() {
    return baseApiUrl + 'cards'
}
