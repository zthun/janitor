module.exports = function(grunt) {
    require('load-grunt-tasks')(grunt);

    grunt.initConfig({
        // Check
        jsonlint: {
            general: {
                src: ['*.json']
            },
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
            general: {
                src: ['*.json']
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
