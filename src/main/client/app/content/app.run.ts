/// <reference path="app.module.ts" />


module employees {
  'use strict';
  angular.module('employees')
  .run(runConfiguration);

  class RunConfiguration {

    constructor(private $rootScope: ng.IRootScopeService,
                private $translate: ng.translate.ITranslateService,
                private $translatePartialLoader: ng.translate.ITranslatePartialLoaderService,
                private ConfigService: IConfigService,
                private $cookies: ng.cookies.ICookiesService,
                private AuthService: IAuthService,
                private DataService: IDataService,
                private CookieManager: employees.ICookieManager) {
      this.ConfigService.initConstVariables();
      this.$translatePartialLoader.addPart('myOrders');
      this.$translatePartialLoader.addPart('order');
      this.$translatePartialLoader.addPart('juxtaposition');
      this.$translatePartialLoader.addPart('errors');
      this.$rootScope.$on('$translatePartialLoaderStructureChanged', ()=> {
        this.$translate.refresh();
      });
      this.$rootScope.$on('$stateChangeStart', this.prepareCacheDataConfig);
    }

    prepareCacheDataConfig = (event: any, toState: any, toParams: any, fromState: any, fromParams: any) => {
      if ('data' in toState && 'permissions' in toState.data) {
        this.CookieManager.appLoaded();
        this.checkUserPermissionsData(toState, event);
      }
    };

    checkPermissions = (permissions: Array<EPermission>, event) => {
      angular.forEach(permissions, (permission) => {
        this.AuthService.hasPermission(permission).then((result)=> {
          this.hasPermissionCallBack(result, event);
        });
      });
    };

    hasPermissionCallBack = (result: boolean, event)=> {
      if (!result) {
        this.ifHasNotPermission(event);
      }
    };

    checkUserPermissionsData = (toState, event)=> {
      let permissions: Array<EPermission> = toState.data.permissions;
      if (angular.isUndefined(
              this.DataService.getCurrentUser()) || this.DataService.getCurrentUser() == null) {
        this.isIncorrectAuthData(permissions, event)
      } else {
        this.checkPermissions(permissions, event);
      }
    };

    isIncorrectAuthData = (permissions, event)=> {
      var authToken = this.$cookies.getObject('authToken');
      if (authToken === undefined) {
        this.ifHasNotPermission(event);
        return;
      }
      this.DataService.setAuthToken(authToken);
      this.AuthService.getCurrentUser().then((user: IUser)=> {
        this.getCurrentUserCallBack(user, permissions, event);
      });
    };

    getCurrentUserCallBack = (user: IUser, permissions, event)=> {
      if (user === undefined) {
        this.ifHasNotPermission(event);
        return;
      }
      this.DataService.setCurrentUser(user);
      this.checkPermissions(permissions, event);
    };

    ifHasNotPermission = (event)=> {
      event.preventDefault();
      this.AuthService.logout();
    }
  }

  runConfiguration.$inject = ['$rootScope', '$translate', '$translatePartialLoader', 'ConfigService',
    '$cookies', 'AuthService', 'DataService', 'CookieManager'];

  function runConfiguration($rootScope: ng.IRootScopeService,
                            $translate: ng.translate.ITranslateService,
                            $translatePartialLoader: ng.translate.ITranslatePartialLoaderService,
                            ConfigService: IConfigService,
                            $cookies: ng.cookies.ICookiesService,
                            AuthService: IAuthService,
                            DataService: IDataService,
                            CookieManager: employees.ICookieManager) {
    return new RunConfiguration($rootScope, $translate, $translatePartialLoader, ConfigService, $cookies, AuthService, DataService, CookieManager);
  }
}