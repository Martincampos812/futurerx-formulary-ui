const webpackMerge = require("webpack-merge");
const webpack = require("webpack");
const singleSpaDefaults = require("webpack-config-single-spa-react");

module.exports = webpackConfigEnv => {
  const defaultConfig = singleSpaDefaults({
    orgName: "frx",
    projectName: "formulary",
    webpackConfigEnv
  });

  return webpackMerge.smart(defaultConfig, {
    resolve: {
      extensions: [
        ".ts",
        ".tsx",
        ".js",
        ".jsx",
        ".scss",
        ".svg",
        ".png",
        ".jpeg",
        ".jpg",
        ".gif"
      ]
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        },
        {
          test: /\.svg$/,
          use: ['@svgr/webpack','url-loader'],
        },
        {
          test: /\.(png|svg|gif)$/,
          loader: 'url-loader'
        },
        {
          test: /\.s[ac]ss$/i,
          use: [
            // Creates `style` nodes from JS strings
            "style-loader",
            // Translates CSS into CommonJS
            "css-loader",
            // Compiles Sass to CSS
            "sass-loader"
          ]
        },
        {
          test: /\.(jpe?g)$/i,
          use: [
            {
              loader: "file-loader"
            }
          ]
        }
      ]
    },
    devServer: {
        historyApiFallback: true,
            headers: {
                  "Access-Control-Allow-Origin": "*"
            },
        disableHostCheck: true
    }
    /*plugins: [
      new webpack.DefinePlugin({
          'process.env': {
              NODE_ENV: JSON.stringify('development')
          }
      })
  ]*/
  });
};
