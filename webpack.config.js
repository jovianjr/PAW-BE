// webpack.config.js
const npm_package = require('./package.json');

module.exports = {
	resolve: {
		root: __dirname,
		alias: npm_package._moduleAliases || {},
		modules: npm_package._moduleDirectories || [], // eg: ["node_modules", "node_modules_custom", "src"]
	},
};
