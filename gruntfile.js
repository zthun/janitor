/*global module, require*/

module.exports = function (grunt) {
    'use strict';
    
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        // Check
        jsonlint: {
            options: {
                jshintrc: true
            },
            htmlhint: {
                src: ['.htmlhintrc']
            },
            jshint: {
                src: ['.jshintrc']
            }
        }
    });

    grunt.registerTask('default', [
        'jsonlint'
    ]);
};