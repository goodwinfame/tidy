const withTypescript = require('@zeit/next-typescript');
const withLess = require('@zeit/next-less')
const withCss = require('@zeit/next-css')
const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');


// fix: prevents error when .less files are required by node
if (typeof require !== 'undefined') {
    require.extensions['.less'] = (file) => {}
}


module.exports = withTypescript(withCss(withLess({
    webpack: (config) => {
        //exclude node_modules from css and less loaders
        config.module.rules.forEach(rule => {

            if(rule.test.toString() == /\.css$/ || rule.test.toString() == /\.less$/){
               
                rule.exclude = [path.resolve(__dirname, 'node_modules')];

            }
        })
       
        //add a less loader to deal with the antd styles without cssModules
        config.module.rules.push({ 
            test: /\.less$/,
            include: [path.resolve(__dirname, 'node_modules/antd')],
            use: ExtractTextPlugin.extract({
                use: [
                    { 
                        loader: 'css-loader',
                        options: { 
                            minimize: false,
                            sourceMap: true,
                            importLoaders: 1,
                        }
                    },
                    { 
                        loader: 'less-loader', 
                        options: { 
                            javascriptEnabled: true 
                        } 
                    }
                ]
            })
        })
     
        config.resolve.alias = {
            pages: path.resolve(__dirname, 'pages'),
            components: path.resolve(__dirname, 'components'),
            store: path.resolve(__dirname, 'store'),
            tidy: path.resolve(__dirname, 'tidy')
        }

        return config
    },
    webpackDevMiddleware: config => {
        // Perform customizations to webpack dev middleware config
        // Important: return the modified config
        return config
    },
    cssModules: true,
    cssLoaderOptions: {
        importLoaders: 1,
        localIdentName: "[local]___[hash:base64:5]",
    },
    lessLoaderOptions: {
        javascriptEnabled: true,
    }
})))

