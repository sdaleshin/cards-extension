import webpack from 'webpack'

export const getTsRule = (): webpack.RuleSetRule => ({
    test: /\.tsx?$/,
    use: 'babel-loader',
    exclude: /node_modules/,
})
