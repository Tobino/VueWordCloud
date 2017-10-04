import babel from 'rollup-plugin-babel';
import bundleWorker from 'rollup-plugin-bundle-worker';
import commonjs from 'rollup-plugin-commonjs';

export default [
	{
		entry: './src/workers/boundWord.js',
		// treeshake: true,
		plugins: [
			babel({ 
				presets: [
					['es2015', { modules: false }],
					'stage-3'
				],
				plugins: [
					'transform-runtime', 
					'external-helpers'
				],
				exclude: 'node_modules/**',
				externalHelpers: true,
				runtimeHelpers: true
			}) 
		],
		targets: [
			{ dest: 'dist/workers/boundWord.js', format: 'umd', moduleName: 'vueWordCloud_boundWord'}
		]
	}, {
		entry: './src/VueWordCloud.js',
		// treeshake: true,
		plugins: [ 
			bundleWorker(),
			babel({ 
				presets: [
					['es2015', { modules: false }],
					'stage-3'
				],
				plugins: [
					'transform-runtime', 
					'external-helpers'
				],
				exclude: 'node_modules/**',
				externalHelpers: true,
				runtimeHelpers: true
			}) ,
			commonjs()
		],
		targets: [
			{ dest: 'dist/VueWordCloud.umd.js', format: 'umd', moduleName: 'vueWordCloud'}
		]
	}];