'use strict';
var autoprefixer = require('autoprefixer-core');

module.exports = function postcss(grunt) {
	// Load task
	grunt.loadNpmTasks('grunt-postcss');

	// Options
	return {
		options: {
			processors: [
				autoprefixer({ browsers: ['last 2 version'] }).postcss
			]
		},
		dist: { src: '.build/css/**/*.css' }
	};
};
