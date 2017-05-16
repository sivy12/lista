module.exports = function (config) {
    'use strict';

    config.set({
        // enable / disable watching file and executing tests whenever any file changes
        autoWatch: true,

        // base path, that will be used to resolve files and exclude
        basePath: './',

        // testing framework to use (jasmine/mocha/qunit/...)
        // as well as any additional frameworks (requirejs/chai/sinon/...)
        frameworks: [
            'jasmine'
        ],

        preprocessors: {
            'app/content/**/*.html': ['ng-html2js']
        },

        // list of files / patterns to load in the browser
        files: [
            'bower_components/jquery/dist/jquery.js',
            'bower_components/angular/angular.js',
            'bower_components/angular-mocks/angular-mocks.js',
            'bower_components/angular-animate/angular-animate.js',
            'bower_components/angular-aria/angular-aria.js',
            'bower_components/angular-cookies/angular-cookies.js',
            'bower_components/angular-messages/angular-messages.js',
            'bower_components/angular-resource/angular-resource.js',
            'bower_components/angular-route/angular-route.js',
            'bower_components/angular-sanitize/angular-sanitize.js',
            'bower_components/angular-ui-router/release/angular-ui-router.js',
            'bower_components/angular-local-storage/dist/angular-local-storage.js',
            'bower_components/ag-grid/dist/ag-grid.js',
            'bower_components/angular-translate/angular-translate.js',
            'bower_components/angular-translate-loader-partial/angular-translate-loader-partial.js',
            'bower_components/angular-material/angular-material.js',
            'bower_components/ngstorage/ngStorage.js',
            'bower_components/angular-block-ui/dist/angular-block-ui.js',
            'bower_components/angular-ui-utils/ui-utils.js',
            'bower_components/angularjs-slider/dist/rzslider.js',
            'bower_components/angular-bootstrap/ui-bootstrap-tpls.js',
            'bower_components/ng-file-upload/ng-file-upload.js',
            'bower_components/ng-tags-input/ng-tags-input.js',
            'bower_components/angular-file-saver/dist/angular-file-saver.bundle.js',
            'bower_components/angular-ui-mask/dist/mask.js',
            'bower_components/moment/moment.js',
            'bower_components/angular-moment/angular-moment.js',
            'app/content/js/config.js',
            'app/content/app.module.js',
            'app/content/services/errors/error.service.js',
            'app/content/components/labelValue/labelValue.controller.js',
            'app/content/components/labelValue/labelValue.component.js',
            'app/content/components/errors/errorDisplay.controller.js',
            'app/content/components/errors/errorDisplay.component.js',
            'app/content/**/*.html',
            'test/**/*spec.js'
        ],

        ngHtml2JsPreprocessor: {
            stripPrefix: 'app/',
            moduleName: 'employees.templates'
        },

        // list of files / patterns to exclude
        exclude: [],

        // web server port
        port: 8080,

        // Start these browsers, currently available:
        // - Chrome
        // - ChromeCanary
        // - Firefox
        // - Opera
        // - Safari (only Mac)
        // - PhantomJS
        // - IE (only Windows)
        browsers: [
            'PhantomJS'
        ],

        // Which plugins to enable
        plugins: [
            'karma-phantomjs-launcher',
            'karma-jasmine',
            'karma-ng-html2js-preprocessor'
        ],

        // Continuous Integration mode
        // if true, it capture browsers, run tests and exit
        singleRun: false,

        colors: true,

        // level of logging
        // possible values: LOG_DISABLE || LOG_ERROR || LOG_WARN || LOG_INFO || LOG_DEBUG
        logLevel: config.LOG_DEBUG,

        // Uncomment the following lines if you are using grunt's server to run the tests
        // proxies: {
        //   '/': 'http://localhost:9000/'
        // },
        // URL root prevent conflicts with the site root
        // urlRoot: '_karma_'
    });
};
