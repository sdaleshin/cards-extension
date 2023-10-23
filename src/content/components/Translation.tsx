import styled from 'styled-components'

// divElement = document.createElement('div')
// divElement.style.position = 'absolute'
// divElement.style.left = x + window.pageXOffset + 'px'
// divElement.style.top = y + window.pageYOffset + 'px'
// divElement.style.padding = '16px'
// divElement.style.borderWidth = '1px'
// divElement.style.borderRadius = '4px'
// divElement.style.fontSize = '16px'
// divElement.style.backgroundColor = 'white'
// divElement.style.zIndex = '99999'
// divElement.style.maxWidth = '300px'
// divElement.textContent = text

const ContentDiv = styled.div<{ x: number; y: number }>`
    position: absolute;
    left: ${(p) => p.x + window.pageXOffset + 'px'};
    top: ${(p) => p.y + window.pageYOffset + 'px'};
    padding: 16px;
    border-width: 1px;
    border-radius: 4px;
    font-size: 16px;
    background-color: white;
    z-index: 99999;
    max-width: 300px;
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
        <ContentDiv x={x} y={y}>
            {text}
        </ContentDiv>
    )
}
