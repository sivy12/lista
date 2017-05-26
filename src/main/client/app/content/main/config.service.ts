/// <reference path="../app.module.ts" />

module employees {

  export interface IConfigService {
    initConstVariables(): void;
    getHost(): string;
    getErrorMessageDelay(): number;
    getSuccessMessageDelay(): number;
    getWarningMessageDelay(): number;
    getItemsPerPage(): number;
  }

  class ConfigServiceImpl {
    private host: string;
    private errorMessageDelay: number;
    private successMessageDelay: number;
    private warningMessageDelay: number;
    private itemsPerPage: number;

    // @ngInject
    constructor(private ENV: ENV) {

    }

    public initConstVariables() {
      if (this.ENV.trybDeveloperski) {
        //http://dev.programisci.olsztyn.pl:19190/relyon-backend
        // this.host = "http://10.250.0.148:8082/";
        this.host = "http://localhost:8082";
      } else {
        this.host = ".";
      }
      this.errorMessageDelay = 8000;
      this.successMessageDelay = 4000;
      this.warningMessageDelay = 6000;
      this.itemsPerPage = 30;
    }

    public getHost = (): string => {
      return this.host;
    };

    public getErrorMessageDelay = (): number => {
      return this.errorMessageDelay;
    };

    public getSuccessMessageDelay = (): number => {
      return this.successMessageDelay;
    };

    public getWarningMessageDelay = (): number => {
      return this.warningMessageDelay;
    };


    public getItemsPerPage = (): number => {
      return this.itemsPerPage;
    };

  }

  angular.module('employees').service('ConfigService', ConfigServiceImpl);
}
