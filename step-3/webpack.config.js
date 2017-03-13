module.exports = {
  entry: './app.js',
  output: {
    filename: 'bundle.js'
  },
  module: {
    loaders:[
      {
        test: /\.js[x]?$/,
        exclude: /node_modules/,
        loader: 'babel-loader?presets[]=es2015'
      },
    ]
  },
  //为了独立构建 具体看 https://cn.vuejs.org/v2/guide/installation.html#独立构建-vs-运行时构建
  resolve: {
  alias: {
    'vue$': 'vue/dist/vue.common.js'
  }
}
}