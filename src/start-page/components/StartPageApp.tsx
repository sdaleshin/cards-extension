import { SignInBlock } from './SignInBlock'
import styled, { createGlobalStyle } from 'styled-components'
import { HowToUseBlock } from './HowToUseBlock'
import { Colors, GlobalStyle } from 'chooui'
import { useState } from 'react'
import { StartUseBlock } from './StartUseBlock'

const ContainerDiv = styled.div`
    display: flex;
    margin: 0 auto;
`

const SignInContainerDiv = styled.div<{ isActive: boolean }>`
    position: absolute;
    margin-left: ${(p) => (p.isActive ? `none` : `calc(-864 * 100vw / 1440)`)};
    transition: 0.8s ease-out;
    left: calc(156 * 100vw / 1440);
`

const HowToUseContainerDiv = styled.div<{ isActive: boolean }>`
    position: absolute;
    box-sizing: border-box;
    right: 0;
    height: 100vh;
    background: ${Colors.Blue95};
    padding-left: ${(p) => (p.isActive ? `calc(156 * 100vw / 1440)` : `48px`)};
    transition: 0.8s ease-out;
    width: ${(p) => (p.isActive ? `100vw` : `calc(420 * 100vw / 1440)`)};
`

const StartUseContainerDiv = styled.div<{ isActive: boolean }>`
    position: absolute;
    right: 0;
    left: ${(p) => (p.isActive ? `calc(864 * 100vw / 1440)` : `100vw`)};
    width: calc(624 * 100vw / 1440);
    box-sizing: border-box;
    background: ${Colors.White};
    transition: 0.8s ease-out;
    padding-left: 107px;
    height: 100vh;
`

const BodyStyle = createGlobalStyle`
  body {
    overflow: hidden;
  }
`

export function StartPageApp() {
    const [signedIn, setSignedIn] = useState(false)
    const [startUseShown, setStartUseShown] = useState(false)

    const handleSignInSuccess = () => {
        setSignedIn(true)
        setTimeout(() => {
            setStartUseShown(true)
        }, 800)
    }
    const handleLetsGoClick = () => {
        chrome.tabs.getCurrent(function (tab) {
            chrome.tabs.remove(tab.id)
        })
    }

    return (
        <>
            <GlobalStyle />
            <BodyStyle />
            <ContainerDiv>
                <SignInContainerDiv isActive={!signedIn}>
                    <SignInBlock onSuccess={handleSignInSuccess} />
                </SignInContainerDiv>
                <HowToUseContainerDiv isActive={signedIn}>
                    <HowToUseBlock isActive={signedIn} />
                </HowToUseContainerDiv>
                <StartUseContainerDiv isActive={startUseShown}>
                    <StartUseBlock onLetsGoClick={handleLetsGoClick} />
                </StartUseContainerDiv>
            </ContainerDiv>
        </>
    )
}
