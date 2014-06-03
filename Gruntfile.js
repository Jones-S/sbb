'use strict';

module.exports = function (grunt) {

    grunt.initConfig({
        connect: {
            local: {
                options: {
                    base: '',
                    hostname: '0.0.0.0',
                    port: 9001
                }
            }
        },
        watch: {
            scss: {
                options: {
                    livereload: false
                },
                files: ['scss/**', 'tpl/**'],
                tasks: ['sass', 'htmlbuild']
            }
        },
        sass: {
            main: {
                files: [{
                    expand: true,
                    cwd: 'scss/',
                    src: ['style.scss'],
                    dest: 'css',
                    ext: '.css'
                }]
            }
        },
        
         htmlbuild: {
         	removeprocess: {
	         	src: 'tpl/zielaendern.tpl.html',
	         	dest: 'tpl/zielaendern_processed.tpl.html',
         	},
         
            options: {
                beautify: true,
                relative: true,
                sections: {
                    layout: {
                        vonnach: 'tpl/vonnach.tpl.html',
                        zielaendern: 'tpl/zielaendern_processed.tpl.html',
                    }
                }
            },
            index: {
                src: 'tpl/index.tpl.html',
                dest: 'index.html'
            },
            /* detail: {
                src: 'html/tpl/detail.tpl.html',
                dest: 'html/detail.html'
            } */	
        }
    });
    

    require('load-grunt-tasks')(grunt);

    grunt.registerTask('local', ['server:local']);
    grunt.registerTask('server', ['server:local']);
    grunt.registerTask('server:local', ['sass', 'htmlbuild', 'connect:local', 'watch']);

    grunt.registerTask('default', ['local']);


};