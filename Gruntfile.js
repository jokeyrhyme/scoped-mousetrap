/*jslint indent:2, maxlen:80, node:true*/
'use strict';

module.exports = function (grunt) {

  grunt.initConfig({

    jslint: {
      all: {
        src: [
          '**/*.js',
          '**/*.json',
          '!bower_components/**/*',
          '!node_modules/**/*'
        ],
        exclude: [],
        directives: {},
        options: {
          errorsOnly: true,
          failOnError: true
        }
      }
    },

    mocha: {
      all: {
        src: [
          'test/**/index.html'
        ],
        options: {
          // reporter: "Nyan"
          run: true
        }
      }
    }

  });

  grunt.loadNpmTasks('grunt-jslint');
  grunt.loadNpmTasks('grunt-mocha');

  grunt.registerTask('test', ['jslint', 'mocha']);
  grunt.registerTask('default', ['test']);

};
