// tsdx.config.js
const postcss = require('rollup-plugin-postcss');

module.exports = {
    rollup(config) {
        config.plugins.push(
            postcss({
                inject: true,   // inlines your CSS
                modules: false, // plain CSS, not modules
            })
        );
        return config;
    },
};
