'use strict';

module.exports = function(grunt) {

  // Project configuration.
  grunt.initConfig({
    jasmine_node : {
      options: {
        match : '.',
        specNameMatcher : 'spec',
        extensions : 'js',
        showColors : true,
        includeStackTrace : true
      },
      all : ['.']
    }
  });

  // Load the plugin that provides the "uglify" task.
  grunt.loadNpmTasks('grunt-jasmine-node');

  // Default task(s).
  grunt.registerTask('default', ['jasmine_node']);

};

