import { BlockTemplate } from './BlockTemplate'
import { Colors, Typography, TypographyType } from 'chooui'
import styled from 'styled-components'

const ExplanationTypography = styled(Typography)`
    && {
        display: block;
        color: ${Colors.Gray40};
    }

    & + & {
        margin-top: 8px;
    }
`

const StyledVideo = styled.video<{ isActive: boolean }>`
    width: ${(p) => (p.isActive ? '456px' : '223.44px')};
    height: ${(p) => (p.isActive ? '360px' : '176.4px')};
    border-radius: 20px;
    margin-top: -10px;
    transition: 0.8s ease-out;
`

const VideoContainerDiv = styled.div<{ isActive: boolean }>`
    width: ${(p) => (p.isActive ? '480px' : '270.24px')};
    height: ${(p) => (p.isActive ? '400px' : '196px')};
    display: flex;
    justify-content: flex-end;
    margin-top: 46px;
    transition: 0.8s ease-out;
`

const WhiteVideoContainerDiv = styled.div<{ isActive: boolean }>`
    width: ${(p) => (p.isActive ? '456px' : '223.44px')};
    height: ${(p) => (p.isActive ? '360px' : '176.4px')};
    border-radius: 20px;
    background: ${Colors.White};
    overflow: hidden;
    z-index: 1;
    position: absolute;
    left: ${(p) => (p.isActive ? '100px' : '48px;')};
    transition: 0.8s ease-out;
`

const RedDiv = styled.div<{ isActive: boolean }>`
    background: ${Colors.Red70};
    width: ${(p) => (p.isActive ? '3606px' : '176px')};
    height: ${(p) => (p.isActive ? '290px' : '142px')};
    border-radius: 20px;
    align-self: flex-end;
    transition: 0.8s ease-out;
`

const ShiftSpan = styled.span`
    padding: 4px 8px;
    background: #fff;
    border-radius: 4px;
    font-size: 16px;
    font-style: normal;
    font-weight: 600;
`

export function HowToUseBlock({ isActive }: { isActive: boolean }) {
    return (
        <BlockTemplate
            stepNumber={2}
            title={'How to Use'}
            shouldRenderLogo={false}
            isActive={isActive}
        >
            <ExplanationTypography type={TypographyType.Body}>
                Select a word or phrase and hold down the mouse
            </ExplanationTypography>
            <ExplanationTypography type={TypographyType.Body}>
                Wait a couple seconds and the magic happens
            </ExplanationTypography>
            <VideoContainerDiv isActive={isActive}>
                <WhiteVideoContainerDiv isActive={isActive}>
                    <StyledVideo loop autoPlay muted isActive={isActive}>
                        <source
                            src="/videos/instruction.mp4"
                            type="video/mp4"
                        />
                        Your browser does not support the video tag.
                    </StyledVideo>
                </WhiteVideoContainerDiv>
                <RedDiv isActive={isActive} />
            </VideoContainerDiv>
        </BlockTemplate>
    )
}
