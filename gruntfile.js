/*global module, require*/

module.exports = function (grunt) {
    'use strict';
    
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        // Check
        jsonlint: {
            htmlhint: {
                src: ['.htmlhintrc']
            },
            jshint: {
                src: ['.jshintrc']
            },
            eslint: {
                src: ['.eslintrc']
            }
        },
        yaml_validator: {
            sasslint: {
                src: ['.sasslint.yml']
            }
        },
        release: {
            options: {
                beforeBump: ['default']
            }
        }
    });

    grunt.registerTask('default', [
        'jsonlint',
        'yaml_validator'
    ]);
};