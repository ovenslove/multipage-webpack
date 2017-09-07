module.exports = function(env = 'dev') {
    return require(`./config/webpack.${env}.js`)
};