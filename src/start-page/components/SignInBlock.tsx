import {
    Button,
    ButtonColorEnum,
    ButtonSizeEnum,
    ButtonVariantEnum,
    Colors,
    Typography,
    TypographyType,
} from 'chooui'
import { BlockTemplate } from './BlockTemplate'
import styled from 'styled-components'
import { GoogleSvg } from './resources/GoogleSvg'
import { basicFetch } from '../../utils/basicFetch'
import { getAuthInExtensionUrl } from '../../utils/apiUrls'
import { useState } from 'react'

const ExplanationTypography = styled(Typography)`
    && {
        display: block;
        color: ${Colors.Gray40};
    }
`

const StyledGoogleSvg = styled(GoogleSvg)`
    width: 16px;
    position: absolute;
    margin-left: -315px;
`

const SignInWithGoogleButton = styled(Button)`
    && {
        margin-top: 32px;
        width: 360px;
        flex-direction: row-reverse;
        justify-content: center;
    }
`

export function SignInBlock({ onSuccess }: { onSuccess: () => void }) {
    const [loading, setLoading] = useState(false)
    const handleSignInClick = () => {
        setLoading(true)
        chrome.identity.getAuthToken({ interactive: true }, function (token) {
            basicFetch(getAuthInExtensionUrl(), {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    accessToken: token,
                }),
            })
                .then((response) => response.json())
                .then((data) => {
                    chrome.runtime.sendMessage({
                        action: 'setTokens',
                        payload: data,
                    })
                    onSuccess()
                })
        })
    }

    return (
        <BlockTemplate
            stepNumber={1}
            title={'Sign in'}
            shouldRenderLogo={true}
            backgroundColor={Colors.White}
        >
            <ExplanationTypography type={TypographyType.Body}>
                You need to log in to Google Account to continue working
            </ExplanationTypography>
            <SignInWithGoogleButton
                text={
                    loading ? 'Signing in progress...' : 'Sign In With Google'
                }
                size={ButtonSizeEnum.Regular}
                color={ButtonColorEnum.Black}
                variant={ButtonVariantEnum.Outlined}
                onClick={!loading && handleSignInClick}
                icon={<StyledGoogleSvg />}
            />
        </BlockTemplate>
    )
}
