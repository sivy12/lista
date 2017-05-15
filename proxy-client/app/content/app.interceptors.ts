/// <reference path="app.module.ts" />

module employees {
  'use strict';
  import IFieldError = employees.errors.IFieldError;
  import ErrorService = employees.errors.ErrorService;

  type EType = 'success' |'warning' |'danger'| 'info';

  interface ResponseMessage {
    type?: EType;
    text?: string;
    code?: string;
    exceptionType?: string;
    errors: Array<IFieldError>;
  }

  interface Rejection {
    status?: number;
    data?: any;
  }

  angular.module('employees').config(httpInterceptorConfiguration);


  function httpInterceptorConfiguration($httpProvider: ng.IHttpProvider) {
    return new HttpInterceptorConfiguration($httpProvider);
  }

  export class HttpInterceptorConfiguration {
    static $inject = ["$httpProvider"];

    constructor(private $httpProvider: ng.IHttpProvider) {
      this.$httpProvider.interceptors.push(InterceptorsProvider.Factory)
    }
  }

  class InterceptorsProvider {
    static $inject = ['$q', 'DataService', 'JQueryUtilsService', '$injector', '$translate'];

    constructor(private $q: ng.IQService, private  DataService: IDataService,
                private  JQueryUtilsService: IJQueryUtilsService,
                private  $injector: ng.auto.IInjectorService,
                private $translate: ng.translate.ITranslateService) {
    }

    public static Factory($q: ng.IQService, DataService: IDataService,
                          JQueryUtilsService: IJQueryUtilsService,
                          $injector: ng.auto.IInjectorService,
                          $translate: ng.translate.ITranslateService) {
      return new InterceptorsProvider($q, DataService, JQueryUtilsService, $injector, $translate);
    }

    request = (config: any)=> {
      const authToken = this.DataService.getAuthToken();
      if (!angular.isUndefined(authToken) && authToken != null) {
        config.headers['X-Auth-Token'] = authToken.token;
        config.headers['X-Auth-Username'] = authToken.username;
      }
      return config || this.$q.when(config);
    };

    responseError = (rejection: Rejection) => {
      const loginService = this.$injector.get<IAuthService>('AuthService');
      if (rejection != null && rejection.status != null && rejection.data != null) {
        this.httpStatusOperations(rejection, loginService, this.processErrors);
      } else {
        loginService.logout();
      }
      return this.$q.reject(rejection);
    };

    processErrors = (message: ResponseMessage)=> {
      const errorService: ErrorService = this.$injector.get<ErrorService>(
          'ErrorService');
      const type = message.type;
      errorService.setErrors(message.errors);
    };

    httpStatusOperations = (rejection, loginService, processErrors) => {
      switch (rejection.status) {
        case 400:
          this.error400(rejection);
          break;
        case 405:
          this.JQueryUtilsService.showErrorMessage(this.$translate.instant("errors.405"));
          break;
        case 401:
          this.JQueryUtilsService.showErrorMessage(this.$translate.instant("errors.401"));
          break;
        case 403:
          this.JQueryUtilsService.showErrorMessage(this.$translate.instant("errors.403"));
          loginService.logout();
          break;
        case 404:
          this.JQueryUtilsService.showErrorMessage(this.$translate.instant("errors.404"));
          break;
        case 409:
          this.JQueryUtilsService.showErrorMessage(this.$translate.instant("errors.409"));
          break;
        case 422:
          processErrors(rejection.data);
          break;
        case 500:
          this.error500(rejection);
          break;
        case 502:
          this.JQueryUtilsService.showErrorMessage(this.$translate.instant("errors.502"));
          break;
        case 503:
          this.JQueryUtilsService.showErrorMessage(this.$translate.instant("errors.503"));
          break;
        default:
          this.errorDefault(rejection);
          break;
      }
    };

    error500 = (rejection)=> {
      if (rejection.data.message != null) {
        this.JQueryUtilsService.showErrorMessage(rejection.data.message);
        return;
      }
      this.JQueryUtilsService.showErrorMessage(this.$translate.instant("errors.500"));
    };

    error400 = (rejection) => {
      if (rejection.data.exceptionType != null) {
        if (rejection.data.exceptionType == "org.springframework.orm.ObjectOptimisticLockingFailureException") {
          this.JQueryUtilsService.showErrorMessage(
              this.$translate.instant("errors.objectChanged"));
          return this.$q.reject(rejection);
        }
        if (rejection.data.exceptionType.indexOf(
                "eu.programisci.employees.common.security.authz.exceptions") != -1 ||
            rejection.data.exceptionType.indexOf(
                "eu.programisci.employees.common.money.exceptions") != -1
        ) {
          const exceptionName = rejection.data.exceptionType.substr(
              rejection.data.exceptionType.lastIndexOf(".") + 1);
          this.JQueryUtilsService.showErrorMessage(
              this.$translate.instant("errors." + exceptionName));
          return this.$q.reject(rejection);
        }
        if (rejection.data.exceptionType == "org.springframework.security.access.AccessDeniedException") {
          this.JQueryUtilsService.showErrorMessage(
              this.$translate.instant("errors.missingPermission"));
          return this.$q.reject(rejection);
        }
        if (rejection.data.exceptionType == "eu.programisci.employees.common.recruitment.exceptions.CVSubmissionRequiredException") {
          this.JQueryUtilsService.showErrorMessage(
              this.$translate.instant("errors.cvSubmissionRequired"));
          return this.$q.reject(rejection);
        }
      }
      if (rejection.data.text != null) {
        this.JQueryUtilsService.showErrorMessage(rejection.data.text);
        return this.$q.reject(rejection);
      }
      this.JQueryUtilsService.showErrorMessage(this.$translate.instant("errors.400"));
    };

    errorDefault = (rejection) => {
      if (rejection.data.text != null) {
        this.JQueryUtilsService.showErrorMessage(
            this.$translate.instant("errors.unknownError") + "(" + rejection.data.text + ")");
        return;
      }
      this.JQueryUtilsService.showErrorMessage(this.$translate.instant("errors.serverError"));
    };
  }
}
