import { BlockTemplate } from './BlockTemplate'
import {
    Button,
    ButtonColorEnum,
    ButtonSizeEnum,
    ButtonVariantEnum,
} from 'chooui'

export function StartUseBlock({
    onLetsGoClick,
}: {
    onLetsGoClick: () => void
}) {
    return (
        <BlockTemplate
            stepNumber={3}
            title={'Start To Use It'}
            shouldRenderLogo={true}
            isActive={true}
        >
            <Button
                text="Let's Go"
                size={ButtonSizeEnum.Regular}
                color={ButtonColorEnum.Yellow}
                variant={ButtonVariantEnum.Filled}
                onClick={onLetsGoClick}
            />
        </BlockTemplate>
    )
}
