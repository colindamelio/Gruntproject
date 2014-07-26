module.exports = function(grunt) {
	// Project configuration.
	grunt.initConfig({
		pkg: grunt.file.readJSON('package.json'),
		jade: {
			html: {
				files: {
					'dist/': ['dev/templates/*.jade']
				},
				options: {
					client: false
				}
			}
		},
		connect: {
			server: {
				options: {
					port: 9001,
					base: 'dist/'
				}
			}
		},
		sass: {                              // Task
			dist: {                            // Target
				options: {                       // Target options
					style: 'compressed'
				},
				files: {                         // Dictionary of files
					'dist/css/main.css': 'dev/css/main.scss'      // 'destination': 'source'
				}
			}
		},
		autoprefixer: {
			options: {
				browsers: ['last 5 version', 'ie 7', 'ie 8', 'ie 9']
			},
			no_dest: {
				src: 'dist/css/main.css'
			}
		},
		uncss: {
			dist: {
				files: {
					'dist/css/main.css' : ['dist/index.html']
				}
			}
		},
		watch: {
			css: {
				files: ['dev/**/*.scss'],
				tasks: ['sass', 'autoprefixer'],
				options: {
					livereload: true
				}
			},
			jade: {
				files: ['dev/templates/*.jade', 'dev/templates/includes/*.jade'],
				tasks: ['jade'],
				options: {
					livereload: true
				}
			}
		}
	});
	grunt.loadNpmTasks('grunt-jade');
	grunt.loadNpmTasks('grunt-contrib-connect');
	grunt.loadNpmTasks('grunt-contrib-sass');
	grunt.loadNpmTasks('grunt-autoprefixer');
	grunt.loadNpmTasks('grunt-contrib-watch');
	grunt.loadNpmTasks('grunt-uncss');
	// Run the server and watch for file changes
	grunt.registerTask('default', ['jade', 'connect', 'sass', 'autoprefixer', 'watch']); // Build Tasks
};