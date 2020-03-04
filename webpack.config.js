module.exports = {
    mode: 'development',
    entry: './src/index.ts',
    output: {
        library: "GraphTableSVG",
        path: __dirname,
        filename: 'docs/scripts/graph_table_svg.js'
    },
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [{
            test: /\.ts$/,
            loader: 'ts-loader'
        }]
    }
}