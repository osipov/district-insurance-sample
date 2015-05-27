'use strict';

module.exports = function grunticon(grunt) {
	// Load task
	grunt.loadNpmTasks('grunt-grunticon');

	// Options
	return {
		myIcons: {
			files: [{
				expand: true,
				cwd: 'design_assets',
				src: ['cleaned/*.svg', 'png/*.png'],
				dest: "public/css/generated"
			}],
			options: {
				datasvgcss: "_icons.svg.scss",
				datapngcss: "icons.png.css",
				urlpngcss: "icons.fallback.css",
			}
		}
	};
};
