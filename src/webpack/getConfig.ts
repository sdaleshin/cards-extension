import * as webpack from 'webpack'
import * as path from 'path'
import { getBaseConfig } from './getBaseConfig'
import { getTsRule } from './rules/getTsRule'
import { ModeType } from './types'
import * as CopyWebpackPlugin from 'copy-webpack-plugin'
import * as jsonfile from 'jsonfile'

const packageJson = jsonfile.readFileSync('./package.json')

export const getConfig = (
    configDirName: string,
    mode: ModeType,
): webpack.Configuration => {
    const baseConfig = getBaseConfig(mode)
    return {
        ...baseConfig,
        entry: {
            background: './src/background.ts',
            content: './src/content/content.tsx',
            'start-page': './src/start-page/start-page.tsx',
        },
        output: {
            filename: '[name].js',
            path: path.resolve(configDirName, 'build'),
        },
        module: {
            rules: [getTsRule()],
        },
        plugins: [
            new CopyWebpackPlugin({
                patterns: [
                    {
                        from: 'src/images',
                        to: 'images',
                    },
                    {
                        from: 'src/videos',
                        to: 'videos',
                    },
                    {
                        from: 'src/start-page/index.html',
                        to: 'index.html',
                    },
                    {
                        from: 'src/manifest.json',
                        to: 'manifest.json',
                        transform(content) {
                            const json = JSON.parse(content.toString())
                            json.version = packageJson.version
                            return JSON.stringify(json, null, 2)
                        },
                    },
                ],
            }),
        ],
    }
}
