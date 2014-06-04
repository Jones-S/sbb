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
         	
         	removeprocess2: {
	         	src: 'tpl/via_jonas.tpl.html',
	         	dest: 'tpl/via_jonas_processed.tpl.html',
         	},
         	
         	removeprocess3: {
	         	src: 'tpl/tickets.tpl.html',
	         	dest: 'tpl/tickets_processed.tpl.html',
         	},
         	
         	removeprocess4: {
	         	src: 'tpl/vonnach.tpl.html',
	         	dest: 'tpl/vonnach_processed.tpl.html',
         	},

         
            options: {
                beautify: true,
                relative: true,
                sections: {
                    layout: {
                        vonnach: 'tpl/vonnach_processed.tpl.html',
                        zielaendern: 'tpl/zielaendern_processed.tpl.html',
                        via: 'tpl/via_jonas_processed.tpl.html',
                        datum: 'tpl/datum.tpl.html',
                        einfachretour: 'tpl/einfachretour.tpl.html',
                        klasse: 'tpl/klasse.tpl.html',
                        tickets: 'tpl/tickets_processed.tpl.html',
                        preis: 'tpl/preis.tpl.html',
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