const path = require('path');
const yaml = require('js-yaml');

const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');

module.exports = {
  mode: 'development',
  entry: [
    './src/index.js'
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'bundle.[name].[hash:6].js',
    chunkFilename: 'bundle.[name].[chunkhash:6].js',
    publicPath: '/',
  },
  devtool: 'inline-source-map',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['env', 'react'],
            plugins: ['react-hot-loader/babel', 'transform-class-properties'],
          }
        }
      },
      {
        test: /\.scss$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'sass-loader' },
        ]
      }
    ]
  },
  plugins: [
    new CopyWebpackPlugin({ patterns: [
      {
        from: path.resolve(__dirname, "src/trips/trip_file.yaml"),
        to: path.resolve(__dirname, "src/trips/trips.json"),
        force: true,
        transform: (content) => Buffer.from(
          JSON.stringify(
            yaml.safeLoadAll(content.toString('utf8'), { schema: yaml.JSON_SCHEMA })
          ),
          'utf8'
        )
      },
    ]}),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: ['dist', '!dist/images']
    }),
    new HtmlWebpackPlugin({ template: 'public/index.html' }),
  ],
  optimization: {
    splitChunks: {
      chunks: 'all',
    }
  }
};



