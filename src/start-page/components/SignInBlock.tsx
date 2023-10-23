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
    const handleSignInClick = () => {
        chrome.identity.getAuthToken({ interactive: true }, function (token) {
            fetch('https://api.choodic.com/auth/auth-in-extension', {
                method: 'POST', // *GET, POST, PUT, DELETE, etc.
                mode: 'cors', // no-cors, *cors, same-origin
                cache: 'no-cache', // *default, no-cache, reload, force-cache, only-if-cached
                credentials: 'same-origin', // include, *same-origin, omit
                headers: {
                    'Content-Type': 'application/json',
                },
                redirect: 'follow', // manual, *follow, error
                referrerPolicy: 'no-referrer', // no-referrer, *no-referrer-when-downgrade, origin, origin-when-cross-origin, same-origin, strict-origin, strict-origin-when-cross-origin, unsafe-url
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
                text="Sign In With Google"
                size={ButtonSizeEnum.Regular}
                color={ButtonColorEnum.Black}
                variant={ButtonVariantEnum.Outlined}
                onClick={handleSignInClick}
                icon={<StyledGoogleSvg />}
            />
        </BlockTemplate>
    )
}
