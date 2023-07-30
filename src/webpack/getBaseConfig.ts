import * as webpack from 'webpack'
import { ModeType } from './types'

export const getBaseConfig = (mode: ModeType): webpack.Configuration => {
    return {
        watch: mode === 'development',
        mode,
        resolve: {
            extensions: ['.tsx', '.ts', '.js'],
        },
    }
}
