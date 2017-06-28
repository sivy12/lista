/// <reference path="app.module.ts" />

module employees {
  'use strict';
  import ITransitionService = angular.ui.bootstrap.ITransitionService;
  angular.module('employees').config(routerConfiguration);

  class RouterConfiguration {
    constructor(private $stateProvider: ng.ui.IStateProvider,
                private $urlRouterProvider: ng.ui.IUrlRouterProvider) {
      this.$urlRouterProvider
      .otherwise(this.otherwiseConfig);
      this.$stateProvider
        .state('access', {
          url: '/access',
          template: '<div class="bg-access"><div ui-view></div></div>'
        })
        .state('access.signin', {
          url: '/signin',
          template: '<signin></signin>'
        })
      .state('access.userPage', { /*jeżeli załaduje się acces, to po przejsciu na page wykorzystuje komponent use*/
        url: '/page',
        template: '<use></use>'
      })
      .state('access.userPage.detail', { /*dodaje do rodzica widok, widok bez nazwy, jezeli wiecej dyrektyw na widok wtedy musze użyć nazwy widoku https://github.com/angular-ui/ui-router/wiki/multiple-named-views */
        url: '/pageDetail/{id:[0-9]{1,8}}', /*zabezpieczenie regexem jaki ma być url*/
        template: '<detpage on-delete-refresh="userCtr.refreshEmployeeList($event)"></detpage>' /*binding do widoku*/

      })
    }

    otherwiseConfig = ($injector: ng.auto.IInjectorService)=> {
      let stateService: any = $injector.get('$state');
      stateService.go('access.signin');
    }
  }

  routerConfiguration.$inject = ['$stateProvider', '$urlRouterProvider'];

  function routerConfiguration($stateProvider: ng.ui.IStateProvider,
                               $urlRouterProvider: ng.ui.IUrlRouterProvider) {
    return new RouterConfiguration($stateProvider, $urlRouterProvider);
  }
}
