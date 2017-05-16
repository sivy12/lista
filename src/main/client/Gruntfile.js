// Generated on 2016-06-23 using generator-angular 0.15.1
'use strict';

// # Globbing
// for performance reasons we're only matching one level down:
// 'test/spec/{,*/}*.js'
// use this if you want to recursively match all subfolders:
// 'test/spec/**/*.js'
var useSourceMaps = true;
module.exports = function (grunt) {

  // Time how long tasks take. Can help when optimizing build times
  require('time-grunt')(grunt);

  // Automatically load required Grunt tasks
  require('jit-grunt')(grunt, {
    useminPrepare: 'grunt-usemin',
    ngtemplates: 'grunt-angular-templates',
    ngconstant: 'grunt-ng-constant'
  });

  // Configurable paths for the application
  var appConfig = {
    app: require('./bower.json').appPath || 'app',
    dist: 'dist'
  };

  // grunt.loadNpmTasks('grunt-ng-constant');
  // grunt.loadNpmTasks('grunt-ts');

  // Define the configuration for all the tasks
  grunt.initConfig({

    ngconstant: {
      // Options for all targets
      options: {
        space: '  ',
        wrap: '"use strict";\n\n {%= __ngModule %}',
        name: 'config'
      },
      // Environment targets
      dev: {
        options: {
          dest: '<%= yeoman.app %>/content/js/config.js'
        },
        constants: {
          ENV: {
            trybDeveloperski: true,
            trybTestowy: false,
            testowyIndex: false
          }
        }
      },
      prod: {
        options: {
          dest: '<%= yeoman.app %>/content/js/config.js'
        },
        constants: {
          ENV: {
            trybDeveloperski: false,
            trybTestowy: false,
            testowyIndex: false
          }
        }
      }
    },

    // Project settings
    yeoman: appConfig,

    ts: {
      default: {
        src: ['app/content/**/*.ts'],
        outDir: '.tmp/content/',
        options: {
          fast: 'never'
        }
      },
      watchBuild: {
        src: ['app/content/**/*.ts'],
        // watch: ['app/content/**/*.ts'],
        outDir: '.tmp/content/',
        options: {
          fast: 'always'
        }
      },
      options: {
        module: "none"
      }
    },

    typings: {
      install: {}
    },

    tslint: {
      options: {
        configuration: "tslint.json"
      },
      files: ['<%= yeoman.app %>/content/{,**/}*.ts']
    },

    // Watches files for changes and runs tasks based on the changed files
    watch: {
      bower: {
        files: ['bower.json'],
        tasks: ['wiredep']
      },
      typescript: {
        files: ['<%= yeoman.app %>/content/{,**/}*.ts'],
        tasks: ['ts:watchBuild'],
      },
      less: {
        files: ['<%= yeoman.app %>/styles/{,**/}*.less'],
        tasks: ['less:main', 'postcss']
      },
      styles: {
        files: ['<%= yeoman.app %>/styles/{,**/}*.css'],
        tasks: ['newer:copy:styles', 'postcss']
      },
      gruntfile: {
        files: ['Gruntfile.js']
      },
      livereload: {
        options: {
          livereload: '<%= connect.options.livereload %>'
        },
        files: [
          '<%= yeoman.app %>/{,**/}*.html',
          '<%= yeoman.app %>/styles/{,**/}*.css',
          '<%= yeoman.app %>/content/{,**/}*.js',
          '.tmp/content/{,**/}*.js',
          '<%= yeoman.app %>/images/{,**/}*.{png,jpg,jpeg,gif,webp,svg}'
        ]
      }
    },

    // The actual grunt server settings
    connect: {
      options: {
        port: 9000,
        // Change this to '0.0.0.0' to access the server from outside.
        hostname: 'localhost',
        livereload: 35729,
      },
      livereload: {
        options: {
          open: true,
          middleware: function (connect) {
            return [
              connect.static('.tmp'),
              connect().use(
                  '/bower_components',
                  connect.static('./bower_components')
              ),
              connect().use(
                  '/app/styles',
                  connect.static('./app/styles')
              ),
              connect.static(appConfig.app),
              connect().use(
                  '/app',
                  connect.static('./app')
              )
            ];
          }
        }
      },
      dist: {
        options: {
          open: true,
          base: '<%= yeoman.dist %>'
        }
      }
    },

    // Make sure there are no obvious mistakes
    jshint: {
      options: {
        jshintrc: '.jshintrc',
        reporter: require('jshint-stylish')
      },
      all: {
        src: [
          'Gruntfile.js',
          '.tmp/content/{,**/}*.js'
        ]
      }
    },

    // Make sure code styles are up to par
    jscs: {
      options: {
        config: '.jscsrc',
        verbose: true
      },
      all: {
        src: [
          'Gruntfile.js',
          '.tmp/content/{,**/}*.js'
        ]
      }
    },

    // Empties folders to start fresh
    clean: {
      dist: {
        files: [{
          dot: true,
          src: [
            '.tmp',
            '<%= yeoman.dist %>/{,*/}*',
            '!<%= yeoman.dist %>/.git{,*/}*'
          ]
        }]
      },
      server: '.tmp'
    },

    // Add vendor prefixed styles
    postcss: {
      options: {
        processors: [
          require('autoprefixer-core')({browsers: ['last 1 version']})
        ]
      },
      server: {
        options: {
          map: true
        },
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,**/}*.css',
          dest: '.tmp/styles/'
        }]
      },
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/styles/',
          src: '{,**/}*.css',
          dest: '.tmp/styles/'
        }]
      }
    },

    // Automatically inject Bower components into the app
    wiredep: {
      app: {
        src: ['<%= yeoman.app %>/index.html'],
        ignorePath: /\.\.\//
      }
    },
    less: {
      main: {
        files: {
          ".tmp/styles/main.css": "<%= yeoman.app %>/styles/main.less",
          ".tmp/styles/login.css": "<%= yeoman.app %>/styles/login.less"
        }
      },

      options: {
        compres: true,
        optimization: 2,
        strictImports: true,
        sourceMap: true,
        outputSourceFiles: true
      },
    },

    // Renames files for browser caching purposes
    filerev: {
      dist: {
        src: [
          '<%= yeoman.dist %>/scripts/{,*/}*.js',
          '<%= yeoman.dist %>/styles/{,*/}*.css',
          '<%= yeoman.dist %>/images/{,*/}*.{png,jpg,jpeg,gif,webp,svg}',
          // '<%= yeoman.dist %>/fonts/*'
        ]
      }
    },

    // Reads HTML for usemin blocks to enable smart builds that automatically
    // concat, minify and revision files. Creates configurations in memory so
    // additional tasks can operate on them
    useminPrepare: {
      html: '<%= yeoman.app %>/*.html',
      options: {
        dest: '<%= yeoman.dist %>',
        flow: {
          html: {
            steps: {
              js: ['concat', 'uglifyjs'],
              css: ['cssmin']
            },
            post: {}
          }
        }
      }
    },

    // Performs rewrites based on filerev and the useminPrepare configuration
    usemin: {
      html: ['<%= yeoman.dist %>/{,*/}*.html'],
      css: ['<%= yeoman.dist %>/styles/{,*/}*.css'],
      js: ['<%= yeoman.dist %>/scripts/{,*/}*.js'],
      options: {
        assetsDirs: [
          '<%= yeoman.dist %>',
          '<%= yeoman.dist %>/images',
          '<%= yeoman.dist %>/styles'
        ],
        patterns: {
          js: [[/(images\/[^''""]*\.(png|jpg|jpeg|gif|webp|svg))/g,
            'Replacing references to images']]
        }
      }
    },

    uglify: {
      options: {
        mangle: false,
        sourceMap: useSourceMaps
      }
    },

    cssmin: {
      options: {
        sourceMap: false,
        keepSpecialComments: 1
      }
    },

    imagemin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,**/}*.{png,jpg,jpeg,gif}',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },

    svgmin: {
      dist: {
        files: [{
          expand: true,
          cwd: '<%= yeoman.app %>/images',
          src: '{,**/}*.svg',
          dest: '<%= yeoman.dist %>/images'
        }]
      }
    },

    htmlmin: {
      dist: {
        options: {
          collapseWhitespace: true,
          conservativeCollapse: true,
          collapseBooleanAttributes: true,
          removeCommentsFromCDATA: true
        },
        files: [{
          expand: true,
          cwd: '<%= yeoman.dist %>',
          src: ['*.html'],
          dest: '<%= yeoman.dist %>'
        }]
      }
    },

    ngtemplates: {
      dist: {
        options: {
          module: 'employees',
          htmlmin: '<%= htmlmin.dist.options %>',
          usemin: 'scripts/scripts.js'
        },
        cwd: '<%= yeoman.app %>',
        src: 'content/{,**/}*.html',
        dest: '.tmp/templateCache.js'
      }
    },

    // ng-annotate tries to make the code safe for minification automatically
    // by using the Angular long form for dependency injection.
    ngAnnotate: {
      dist: {
        files: [{
          expand: true,
          cwd: '.tmp/concat/scripts',
          src: '*.js',
          dest: '.tmp/concat/scripts'
        }]
      }
    },

    // Copies remaining files to places other tasks can use
    copy: {
      dist: {
        files: [{
          expand: true,
          dot: true,
          cwd: '<%= yeoman.app %>',
          dest: '<%= yeoman.dist %>',
          src: [
            '*.{ico,png,txt}',
            '*.html',
            'images/{,**/}*.{webp}',
            'fonts/{,**/}*.*'
          ]
        }, {
          expand: true,
          cwd: '.tmp/images',
          dest: '<%= yeoman.dist %>/images',
          src: ['generated/*']
        }, {
          expand: true,
          cwd: 'bower_components/bootstrap/dist',
          src: 'fonts/*',
          dest: '<%= yeoman.dist %>'
        }, {
          expand: true,
          cwd: 'bower_components/components-font-awesome',
          src: 'fonts/*',
          dest: '<%= yeoman.dist %>'
        }, {
          expand: true,
          cwd: 'bower_components/angular-ui-grid',
          src: ['*.ttf', '*.woff'],
          dest: '<%= yeoman.dist %>/styles'
        }, {
          expand: true,
          cwd: '<%= yeoman.app %>/i18n',
          src: '{,*/}*.json',
          dest: '<%= yeoman.dist %>/i18n'
        }]
      },
      styles: { //plik main nie jest kopiowany, jest kompresowany bezpośrednio z lessa
        expand: true,
        cwd: '<%= yeoman.app %>/styles',
        dest: '.tmp/styles/',
        src: ['*.css', '!main.css']
      },
      js: {
        expand: true,
        cwd: '<%= yeoman.app %>/content',
        dest: '.tmp/content',
        src: '{,**/}*.js'
      }
    },

    concat: {
      options: {
        sourceMap: useSourceMaps
      }
    },

    compress: {
      dist: {
        options: {
          archive: './target/dist.zip'
        },
        files: [
          {src: './dist/**'}
        ]
      }
    },

    concurrent: {
      server: [
        // 'typescript:base',
        'copy:styles'
      ],
      dist: [
        //   'typescript',
        'copy:styles',
        'imagemin',
        'svgmin'
      ]
    },
    karma: {
      unit: {
        configFile: 'karma.conf.js',
        singleRun: true
      }
    }

  });

  grunt.registerTask('serve', 'Compile then start a connect web server',
      function (target) {
        if (target === 'dist') {
          return grunt.task.run(['build', 'connect:dist:keepalive']);
        }

        grunt.task.run([
          'clean:server',
          'ngconstant:dev', // ADD THIS
          'wiredep',
          'ts:default',
          'less:main',
          'concurrent:server',
          'postcss:server',
          'connect:livereload',
          'watch'
        ]);
      });
  grunt.registerTask('serve offline', 'Compile then start a connect web server',
      function (target) {
        if (target === 'dist') {
          return grunt.task.run(['build', 'connect:dist:keepalive']);
        }
        grunt.task.run([
          'clean:server',
          'ngconstant:dev', // ADD THIS
          'wiredep',
          'ts:default',
          'less:main',
          'concurrent:server',
          'postcss:server',
          'connect:livereload',
          'watch'
        ]);
      });

  grunt.registerTask('server', 'DEPRECATED TASK. Use the "serve" task instead',
      function (target) {
        grunt.log.warn(
            'The `server` task has been deprecated. Use `grunt serve` to start a server.');
        grunt.task.run(['serve:' + target]);
      });

  grunt.registerTask('build', [
    'clean:dist',
    'ngconstant:prod',
    'wiredep',
    'typings:install',
    'ts:default',
    // "jshint",
    "jscs",
    'less:main',
    'useminPrepare',
    'concurrent:dist',
    'copy:js',
    'postcss',
    'ngtemplates',
    'concat',
    'ngAnnotate',
    'copy:dist',
    'copy:styles',
    'cssmin',
    'uglify',
    'filerev',
    'usemin',
    'htmlmin'
  ]);

  grunt.registerTask('build-nobower', [
    'clean:dist',
    'ngconstant:prod',
    'ts:default',
    'less:main',
    'useminPrepare',
    'concurrent:dist',
    'copy:js',
    'postcss',
    'ngtemplates',
    'concat',
    'ngAnnotate',
    'copy:dist',
    'copy:styles',
    'filerev',
    'usemin',
    'htmlmin'
  ]);

  grunt.registerTask('default', [
    'build'
  ]);

};
