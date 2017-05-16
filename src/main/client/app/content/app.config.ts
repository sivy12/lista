/// <reference path="app.module.ts" />

module employees {
  declare const moment: any;
  'use strict';
  angular.module('employees').config(setupConfiguration);

  setupConfiguration.$inject = ['$httpProvider', '$compileProvider', '$logProvider', '$translateProvider',
    'blockUIConfig', 'localStorageServiceProvider', '$mdDateLocaleProvider'];
  function setupConfiguration($httpProvider: ng.IHttpProvider,
                              $compileProvider: ng.ICompileService,
                              $logProvider: ng.ILogProvider,
                              $translateProvider: ng.translate.ITranslateProvider,
                              blockUIConfig,
                              localStorageServiceProvider,
                              $mdDateLocaleProvider) {
    return new SetupConfiguration($httpProvider, $compileProvider, $logProvider, $translateProvider, blockUIConfig, localStorageServiceProvider, $mdDateLocaleProvider);
  }

  class SetupConfiguration {

    constructor($httpProvider: ng.IHttpProvider,
                $compileProvider: ng.ICompileService,
                $logProvider: ng.ILogProvider,
                $translateProvider: ng.translate.ITranslateProvider,
                blockUIConfig,
                localStorageServiceProvider,
                $mdDateLocaleProvider) {

      localStorageServiceProvider.setPrefix('employees');
      $logProvider.debugEnabled(true);
      $translateProvider.useSanitizeValueStrategy('escaped');
      $translateProvider.preferredLanguage('pl');
      $translateProvider.useLoader('$translatePartialLoader', {
        urlTemplate: './i18n/{lang}/{part}.json'
      });
      blockUIConfig.requestFilter = this.requestFilterConfiguration;
      $mdDateLocaleProvider.formatDate = this.globalFormatDate;


    }

    requestFilterConfiguration = (config)=> {
      const isDocumentUpload = (config.method == "PUT" && config.url.match(/^.*\/api\/documents\/.*/));
      const isQuery = (config.method == 'POST' && config.url.endsWith('/query'));
      const isWorkPositionLoaded = (config.method == "GET" && config.url.match(/^.*\/api\/dictionaries\/WORK_POSITION_NAME.*/))
      return !(isDocumentUpload || isQuery || isWorkPositionLoaded);
    };

    globalFormatDate = (date)=> {
      if (date != null) {
        return moment(date).format('DD.MM.YYYY');
      } else {
        return null
      }
    };
  }
}

