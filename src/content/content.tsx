import { debounce } from '../utils/debounce'
import { createRoot } from 'react-dom/client'
import { ContentApp } from './components/ContentApp'

const CHOODIC_EXTENSION_TRANSLATION_ID = 'choodic-extension-translation-id'



function init() {
    const rootElement = document.createElement('div')
    rootElement.id = CHOODIC_EXTENSION_TRANSLATION_ID
    document.body.appendChild(rootElement)
    const root = createRoot(
        document.getElementById(CHOODIC_EXTENSION_TRANSLATION_ID),
    )
    root.render(<ContentApp />)
}
if (document.readyState === 'loading') {
    document.addEventListener('load', init)
} else {
    init()
}
