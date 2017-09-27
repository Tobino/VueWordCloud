import babel from 'rollup-plugin-babel';
import commonjs from 'rollup-plugin-commonjs';

export default {
	entry: 'VueWordCloud.js',
	treeshake: true,
	plugins: [
		babel({
			externalHelpers: false,
			exclude : 'node_modules/**'
		}),
		commonjs()
	],
	targets: [
		{ dest: 'lib/vue-word-cloud.es.js', format: 'es' },
		{ dest: 'lib/vue-word-cloud.cjs.js', format: 'cjs' },
		{ dest: 'lib/vue-word-cloud.umd.js', format: 'umd', moduleName: 'vueWordCloud' }
	]
};