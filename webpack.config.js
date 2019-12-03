module.exports = {
    mode: 'development',
    entry: './src/index.ts', //ファイルをまとめる際のエントリーポイント
    output: {
        library: "GraphTableSVG",
        path: __dirname,
        filename: 'docs/scripts/graph_table_svg.js' //まとめた結果出力されるファイル名
    },
    resolve: {
        extensions: ['.ts', '.js'] //拡張子がtsだったらTypescirptでコンパイルする
    },
    module: {
        rules: [{
            test: /\.ts$/,
            loader: 'ts-loader' //ts-loader使うよ
        }]
    }
}