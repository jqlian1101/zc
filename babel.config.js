
const plugins = [
    [
        "component",
        {
            "libraryName": "element-ui",
            "styleLibraryName": "theme-chalk"
        }
    ],
    'equire'
];
if (['production', 'prod'].includes(process.env.NODE_ENV)) {
    plugins.push("transform-remove-console")            // 可解决 ie9 白屏
}

module.exports = {
    presets: [
        ['@vue/app', {
            "useBuiltIns": "entry",
            polyfills: [
                'es6.promise',
                'es6.symbol'
            ]
        }]
    ],
    plugins: plugins
}
