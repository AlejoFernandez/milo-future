module.exports = function (grunt) {
    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        dirs: {
            src: [
                'src/core.js',
                'src/helpers.js',
                'src/factory.js',
                'src/mixins/queryable.js',
                'src/mixins/modelFactory.js',
                'src/mixins/describable.js',
                'src/mixins/validable.js',
                'src/mixins/resource.js',
                'src/mixins/entity.js',
                'src/types/base.js',
                'src/types/model.js',
                'src/types/module.js',
                'src/types/property.js',
                'src/types/linkedProperty.js',
                'src/types/collection.js',
                'src/types/linkedCollection.js',
                'src/types/record.js',
                'src/types/finder.js',
                'src/defaults.js'
            ]
        },

        clean: ['dist'],

        concat: {
            dist: {
                src: '<%= dirs.src %>',
                dest: 'dist/<%= pkg.name %>.js'
            }
        },

        uglify: {
            distMin: {
                options: {
                    report: 'gzip'
                },
                files: {
                    'dist/<%= pkg.name %>.min.js': '<%= dirs.src %>'
                }
            }
        },

        jshint: {
            all: ['src/**/*.js', 'test/*.js']
        },

        mocha_phantomjs: {
            all: ['test/**/*.html']
        },

        watch: {
            javascript: {
                files: ['src/**/*.js', 'test/*.js'],
                tasks: ['concat', 'jshint', 'mocha_phantomjs']
            }
        },

        zip: {
            dist: {
                src: ['dist/<%= pkg.name %>.min.js'],
                dest: 'dist/<%= pkg.name %> - <%= pkg.version %>.zip'
            }
        }
    });

    grunt.loadNpmTasks('grunt-mocha-phantomjs');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-yuidoc');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-contrib-connect');
    grunt.loadNpmTasks('grunt-string-replace');
    grunt.loadNpmTasks('grunt-zip');

    grunt.registerTask('dist', ['clean', 'jshint', 'concat', 'uglify', 'zip']);
    grunt.registerTask('test', ['clean', 'jshint', 'concat', 'mocha_phantomjs']);
};