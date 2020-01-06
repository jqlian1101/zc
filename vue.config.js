const path = require('path')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const CompressionWebpackPlugin = require('compression-webpack-plugin');

const IS_PROD = ['production', 'prod'].includes(process.env.NODE_ENV)

const productionGzipExtensions = /\.(js|css|json|txt|html|ico|svg)(\?.*)?$/i;

function resolve(dir) {
    return path.join(__dirname, dir)
}

module.exports = {

    // 基本路径
    // baseUrl: './',
    publicPath: './',
    // 输出文件目录
    outputDir: 'dist',
    // eslint-loader 是否在保存的时候检查
    lintOnSave: process.env.NODE_ENV !== 'production',
    assetsDir: '', // 相对于outputDir的静态资源(js、css、img、fonts)目录
    runtimeCompiler: true, // 是否使用包含运行时编译器的 Vue 构建版本
    // 生产环境是否生成 sourceMap 文件
    productionSourceMap: false,

    css: {
        loaderOptions: {
            sass: {
                modules: true,
                camelCase: true,
                localIdentName: '[name]-[hash]',
                data: `@import "~styles/core/index.scss";`
            }
        }
    },

    chainWebpack: (config) => {
        config.entry.app = ['babel-polyfill', './src/main.js'];

        // 修复HMR
        config.resolve.symlinks(true);
        // 修复 Lazy loading routes Error
        config.plugin('html').tap(args => {
            args[0].chunksSortMode = 'none';
            return args;
        });
        config.resolve.alias
            .set('src', resolve('src'))
            .set('pages', resolve('src/pages'))
            .set('components', resolve('src/components'))
            .set('common', resolve('src/common'))
            .set('api', resolve('src/api'))
            .set('styles', resolve('src/styles'))
            .set('assets', resolve('src/assets'))
            .set('utils', resolve('src/utils'))
            .set('lib', resolve('src/lib'))
            .set('store', resolve('src/store'));


        // 移除 prefetch 插件
        config.plugins.delete('prefetch')
        // 移除 preload 插件
        config.plugins.delete('preload');

        // 压缩图片 ie9不兼容
        // config.module
        //     .rule("images")
        //     .use("image-webpack-loader")
        //     .loader("image-webpack-loader")
        //     .options({
        //         mozjpeg: { progressive: true, quality: 65 },
        //         optipng: { enabled: false },
        //         pngquant: { quality: "65-90", speed: 4 },
        //         gifsicle: { interlaced: false },
        //         webp: { quality: 75 }
        //     });

        // 打包分析
        if (process.env.NODE_ENV === 'production') {
            config.plugin('webpack-report')
                .use(BundleAnalyzerPlugin, [{
                    analyzerMode: 'static'
                }]);
        }
    },
    // transpileDependencies: [
    //     'axios',
    //     'echarts',
    //     'element-ui'
    // ],

    configureWebpack: config => {
        if (IS_PROD) {
            const plugins = [];
            // 开启 gzip 压缩
            plugins.push(
                new CompressionWebpackPlugin({
                    filename: '[path].gz[query]',
                    algorithm: 'gzip',
                    test: productionGzipExtensions,
                    threshold: 10240,
                    minRatio: 0.8
                })
            );
            config.plugins = [
                ...config.plugins,
                ...plugins
            ];
        }

        config.externals = {
            'vue': 'Vue',
            'axios': 'axios',
            'vue-router': 'VueRouter',
            'vuex': 'Vuex'
            // 'element-ui': 'ELEMENT'
            // "echarts": "echarts"
        };
    },
    parallel: require('os').cpus().length > 1,

    devServer: {
        // open: process.platform === 'darwin', // 配置自动启动浏览器
        // host: 'localhost',
        port: 8081,
        proxy: {
            '/api': {
                target: 'http://txh.logimis.com/', // 对应自己的接口
                changeOrigin: true,
                ws: true,
                pathRewrite: {
                    '^/api': ''
                }
            }
        }
    }
}
