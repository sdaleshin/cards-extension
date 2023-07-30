import { getConfig } from './src/webpack'

export default (env: any) => {
    return getConfig(__dirname, env.mode)
}
