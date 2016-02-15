'use strict';

module.exports = function(grunt) {

  grunt.initConfig({

    pkg: grunt.file.readJSON('package.json'),


    // Yeoman configuration -- define constants that will be used throughout the rest of the grunt config
    yeoman: {
      source: 'src',
      destination: 'dist',
      tempStage: '.tmp'
    },

    // Clean configuration -- empty the dist folder to start fresh
    clean: {
      dist: '<%= yeoman.destination %>',
      tmp: '<%= yeoman.tempStage %>'
    },

    // NgTemplates configuration -- specify how html template files will get compiled into part of the angular
    // module to be put in the template cache, so that we don't have to include a bunch of HTML files in the
    // distribution
    ngtemplates: {
      'symulakr-angular-ui-commons': {
        cwd: '<%= yeoman.source %>',
        src: [
          '**/*.html',
          '!bower_components/**'
        ],
        dest: '<%= yeoman.tempStage %>/templates.js',
        options: {
          htmlmin: {
            collapseBooleanAttributes:      false,
            collapseWhitespace:             true,
            removeAttributeQuotes:          false,
            removeComments:                 true,
            removeEmptyAttributes:          false,
            removeRedundantAttributes:      false,
            removeScriptTypeAttributes:     false,
            removeStyleLinkTypeAttributes:  false
          }
        }
      }
    },

    // Copy configuration -- load some LESS files into .tmp to make it easier to compile them
    copy: {
      less: {
        expand: true,
        dot: true,
        cwd: '<%= yeoman.source %>',
        dest: '<%= yeoman.tempStage %>/lessFiles',
        src: [
          '*.less',
          '**/*.less',
          '!bower_components/**'
        ]
      }
    },

    // Less configuration -- compile all application LESS files into one minified CSS file that can be moved to
    // the distribution folder
    less: {
      development: {
        options: {
          compress: true,
          yuicompress: true,
          optimization: 2
        },
        files: {
          "<%= yeoman.destination %>/<%= pkg.name %>.min.css": "<%= yeoman.tempStage %>/lessFiles/**/*.less"
        }
      }
    },

    // Concat configuration -- concatenate all JS files into a single file that can be distributed
    concat: {
      dist: {
        src: [
          '<%= yeoman.source %>/main.js',
          '<%= yeoman.tempStage %>/templates.js',
          '<%= yeoman.source %>/**/*.js',
          '!<%= yeoman.source %>/bower_components/**'
        ],
        dest: '<%= yeoman.destination %>/<%= pkg.name %>.js'
      }
    },

    // Bump configuration -- specify what to do to bump the version and make it available as a new version in
    // git (i.e. make it available via bower)
    bump: {
      options: {
        files: [
          'package.json',
          'bower.json'
        ],
        updateConfigs: [],
        commit: true,
        commitMessage: 'Release v%VERSION%',
        commitFiles: [
          'package.json',
          'bower.json',
          'dist/<%= pkg.name %>.js',
          'dist/<%= pkg.name %>.min.css'
        ],
        createTag: true,
        tagName: 'v%VERSION%',
        tagMessage: 'Version %VERSION%',
        push: false,
        globalReplace: false,
        prereleaseName: false,
        regExp: false
      }
    }

  });

  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-angular-templates');
  grunt.loadNpmTasks('grunt-contrib-copy');
  grunt.loadNpmTasks('grunt-contrib-less');
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-bump');

  grunt.registerTask('build', 'compile the source for this library into single files in the dist folder', [
    'clean',
    'ngtemplates:symulakr-angular-ui-commons',
    'copy',
    'less',
    'concat:dist'
  ]);

  grunt.registerTask('release', 'execute a release for the library (i.e. publish a new version)', function() {
    grunt.task.run([
      'build',
      'bump'
    ]);
  });
};