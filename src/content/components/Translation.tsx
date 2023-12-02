import styled, { css } from 'styled-components'
import { Colors } from 'chooui'

const ContentDiv = styled.div<{ x: number; y: number; loading: boolean }>`
    position: absolute;
    left: ${(p) => p.x + window.pageXOffset + 'px'};
    top: ${(p) => p.y + window.pageYOffset + 'px'};
    padding: 16px;
    min-width: 56px;
    min-height: 46px;
    box-sizing: border-box;
    border-width: 1px;
    border-radius: 4px;
    font-size: 16px;
    color: ${Colors.White};
    background-color: ${Colors.Blue60};
    z-index: 99999;
    max-width: ${(p) => (p.loading ? '56px' : '300px')};
    background-image: ${(p) =>
        p.loading
            ? css`url(${chrome.runtime.getURL('images/loader.gif')})`
            : 'none'};
    background-size: 24px;
    background-repeat: no-repeat;
    background-position: center;
`

export function Translation({
    x,
    y,
    text,
}: {
    x: number
    y: number
    text: string
}) {
    return (
        <ContentDiv x={x} y={y} loading={!text}>
            {text}
        </ContentDiv>
    )
}
