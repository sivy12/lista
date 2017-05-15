/// <reference path="../../app.module.ts" />

module employees {
  'use strict';
  import IHttpPromiseCallbackArg = angular.IHttpPromiseCallbackArg;
  import ITranslateService = angular.translate.ITranslateService;
  import ILogService = angular.ILogService;

  const headers = {
    'Content-Type': 'application/json'
  };

  //FIXME define interfaces to use instead of any
  export interface IAuthService {
    login(user: any): ng.IHttpPromise<IToken>;
    switchAccount(currentToken: string, selectedAccountId: number): ng.IHttpPromise<IToken>;
    getCurrentUser(): ng.IHttpPromise<IUser>;
    logout(): ng.IHttpPromise<any>;
    endSession(): any;
    hasPermission(permission: EPermission): ng.IPromise<boolean>;
  }

  const httpDataExtractor = <T>(result: IHttpPromiseCallbackArg<T>)=> {
    return result.data;
  };

  class AuthService implements IAuthService {

    // @ngInject
    constructor(private $http: any,
                private ConfigService: IConfigService,
                private $cookies: ng.cookies.ICookiesService,
                private $state: ng.ui.IStateService,
                private $translate: ITranslateService,
                private JQueryUtilsService: IJQueryUtilsService,
                private $translatePartialLoader: ng.translate.ITranslatePartialLoaderService,
                private DataService: IDataService,
                private $q: ng.IQService,
                private $timeout: ng.ITimeoutService) {
      this.$translatePartialLoader.addPart('session');

    }

    public login = (user: any): ng.IHttpPromise<IToken> => {
      const req = {
        method: 'POST',
        url: `${this.ConfigService.getHost()}/api/login/authenticate`,
        headers,
        data: {loginId: user.loginId, password: user.password}
      };
      return this.$http(req).then(httpDataExtractor);
    };

    public switchAccount = (currentToken: string, selectedAccountId: number): ng.IHttpPromise<IToken> => {
      const req = {
        method: 'POST',
        url: this.ConfigService.getHost() + '/api/login/switchAccount',
        headers,
        data: {currentToken, selectedAccountId}
      };
      return this.$http(req).then(httpDataExtractor);
    };

    public getCurrentUser = (): ng.IHttpPromise<IUser> => {
      const req = {
        method: 'GET',
        url: this.ConfigService.getHost() + '/api/login/currentUser'
      };
      return this.$http(req).then(httpDataExtractor);
    };

    public logout = (): ng.IHttpPromise<any> => {
      if (angular.isDefined(this.DataService.getAuthToken()) && this.DataService.getAuthToken() != null) {
        const req = {
          method: 'GET',
          url: this.ConfigService.getHost() + '/api/login/logout',
          headers,
          params: {
            authToken: this.DataService.getAuthToken().token
          }
        };
        this.endSession();
        return this.$http(req).success((response: boolean)=> {
          return response
        });
      } else {
        this.endSession();
      }
    };

    public endSession() {
      this.DataService.setCurrentUser(null);
      this.DataService.setAuthToken(null);
      if (this.$cookies.get('authToken')) {
        this.JQueryUtilsService.showSuccessMessage(this.$translate.instant("sessionMessages.logOut"));
      }
      this.$cookies.remove('authToken');
      this.$state.go('access.signin');
    }

    public hasPermission(permission: EPermission): ng.IPromise<boolean> {
      return this.$q((resolve, reject) => {
        this.$timeout(() => {
          let hasPermission = false;
          if (this.DataService.getAuthToken() != null) {
            let currentUser = this.DataService.getCurrentUser();
            if (currentUser) {
              currentUser.permissions.forEach((userPermission) => {
                hasPermission = hasPermission || userPermission === permission
              });
            }
          }
          resolve(hasPermission);
        }, 100);
      });
    };
  }

  angular.module('employees').service('AuthService', AuthService);
}