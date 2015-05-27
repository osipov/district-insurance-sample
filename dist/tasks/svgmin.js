'use strict';

module.exports = function svgmin(grunt) {
	// Load task
	grunt.loadNpmTasks('grunt-svgmin');

	// Options
	return {
		dist: {
			files: [{
				expand: true,
				cwd: 'design_assets/svg',
				src: ['*.svg'],
				dest: 'design_assets/cleaned'
			}]
		}
	};
};
