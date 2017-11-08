module.exports = function (config, env) {
	config.resolve.alias['@'] = env.src;
}