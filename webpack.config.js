const HtmlWebpackPlugin = require('html-webpack-plugin');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const CompressionPlugin = require('compression-webpack-plugin');


module.exports = {
  entry: {
    entry: './assets/src/index.js',
  },

  output: {
    //path: `${__dirname}/assets`,
    path: __dirname + '/assets',
    filename: 'bundle.js',
  },

  devServer: {
    port: 3006, // most common port
    contentBase: './public',
    inline: true,
    historyApiFallback: true,
  },
  module: {
    rules: [
      {
        use: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/,

      },
    
      {
        use: ['style-loader', 'css-loader'],
        test: /\.css$/,
      },
      { test: /\.(jpg|jpeg|png|woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' }, // this is to read fonts
      {
        test: /\.less$/,
        use: [
          {
            loader: 'style-loader', // creates style nodes from JS strings
          },
          {
            loader: 'css-loader', // translates CSS into CommonJS
          },
          {
            loader: 'less-loader', // compiles Less to CSS
            options: {
              javascriptEnabled: true,
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimize: true,
    minimizer: [
      // we specify a custom UglifyJsPlugin here to get source maps in production
      new UglifyJsPlugin({
        cache: true,
        parallel: true,
        test: /\.js(\?.*)?$/i,
        uglifyOptions: {
          compress: false,
          ecma: 6,
          mangle: true
        },
        sourceMap: true
      })
    ]
  },
  // optimization: {
  //   runtimeChunk: 'single',
  //   splitChunks: {
  //     cacheGroups: {
  //       vendor: {
  //         test: /[\\/]node_modules[\\/]/,
  //         name: 'vendors',
  //         enforce: true,
  //         chunks: 'all',
  //       },

  //       reactVendor: {
  //         test: /[\\/]node_modules[\\/](react|react-dom)[\\/]/,
  //         name: 'reactvendor',
  //       },
  //       utilityVendor: {
  //         test: /[\\/]node_modules[\\/](lodash|moment|moment-timezone)[\\/]/,
  //         name: 'utilityVendor',
  //       },
  //     },
  //   },
  // },

  plugins: [
    new HtmlWebpackPlugin({
      template: 'assets/src/index.html',
    }),
    new BundleAnalyzerPlugin(),
    new webpack.DefinePlugin({ // <-- key to reducing React's size
      'process.env': {
        'NODE_ENV': JSON.stringify('production')
      }
    }),
    // new webpack.optimize.DedupePlugin(), //dedupe similar code 
    // new webpack.optimize.UglifyJsPlugin(), //minify everything
    new webpack.optimize.AggressiveMergingPlugin(),//Merge chunks 

     new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /ja|it/),
     new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
  
  ],
};
