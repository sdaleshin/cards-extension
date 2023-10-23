import { ReactNode } from 'react'
import { Colors, LogoSvg, StarsSvg, Typography, TypographyType } from 'chooui'
import styled from 'styled-components'

const ContainerDiv = styled.div``

const LogoDiv = styled.div`
    width: 144px;
    height: 51px;
    display: flex;
    position: absolute;
    top: 16px;
`

const StyledLogoSvg = styled(LogoSvg)`
    width: 105px;
    height: 36px;
`

const LogoContainerDiv = styled.div`
    padding: 4px;
    box-sizing: border-box;
    margin-top: 7px;
`

const StyledStarsSvg = styled(StarsSvg)`
    margin-left: -7px;
`

const StepDescriptionDiv = styled.div<{ isActive: boolean }>`
    margin-top: 200px;
    opacity: ${(p) => (p.isActive ? 1 : 0.5)};
    transition: 0.8s ease-out;
`

const StepNumberTypography = styled(Typography)`
    color: ${Colors.Blue60} !important;
    display: block;
`

const StepTitleTypography = styled(Typography)`
    color: ${Colors.Gray20} !important;
    display: block;
    margin-top: 8px;
`

const ChildrenContainerDiv = styled.div<{ isActive: boolean }>`
    margin-top: 32px;
    transition: 0.8s ease-out;
    opacity: ${(p) => (p.isActive ? 1 : 0.5)};
`

export function BlockTemplate({
    stepNumber,
    title,
    shouldRenderLogo,
    children,
    isActive = true,
}: {
    stepNumber: number
    title: string
    shouldRenderLogo: boolean
    children: ReactNode
    isActive: boolean
}) {
    return (
        <ContainerDiv>
            {shouldRenderLogo && (
                <LogoDiv>
                    <LogoContainerDiv>
                        <StyledLogoSvg />
                    </LogoContainerDiv>
                    <StyledStarsSvg />
                </LogoDiv>
            )}
            <StepDescriptionDiv isActive={isActive}>
                <StepNumberTypography type={TypographyType.BodyLarge}>
                    Step {stepNumber}
                </StepNumberTypography>
                <StepTitleTypography type={TypographyType.H2}>
                    {title}
                </StepTitleTypography>
            </StepDescriptionDiv>
            <ChildrenContainerDiv isActive={isActive}>
                {children}
            </ChildrenContainerDiv>
        </ContainerDiv>
    )
}
