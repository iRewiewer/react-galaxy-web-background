const postcss = require('rollup-plugin-postcss');

module.exports = {
    rollup(config) {
        config.plugins.push(
            postcss({
                inject: true,
                modules: false,
            })
        );
        return config;
    },
};
