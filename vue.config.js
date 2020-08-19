module.exports = {
    // publicPath: '/',
    devServer: {
        proxy: {
            '/api': {
                target: 'http://47.95.230.65:8087',
                changeOrigin: true,
                pathRewrite: {
                    '^/api': '/api'
                }
            }
        }
    }
}