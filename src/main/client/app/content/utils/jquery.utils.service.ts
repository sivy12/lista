/// <reference path="../app.module.ts" />

module employees {
  'use strict';

  declare const moment: any;

  export interface IJQueryUtilsService {
    showErrorMessage(message: string): void;
    showSuccessMessage(message: string): void;
    showWarningMessage(message: string): void;
    getFormattedStringDate(date: Date): string;
  }

  export class JQueryUtilsService implements IJQueryUtilsService {

    // @ngInject
    constructor(private ConfigService: IConfigService) {
    }

    public showErrorMessage(message: string) {
      this.showMessage(message, 'error', true, this.ConfigService.getErrorMessageDelay());
    }

    public showSuccessMessage(message: string) {
      this.showMessage(message, 'success', true, this.ConfigService.getSuccessMessageDelay());
    }

    public showWarningMessage(message: string) {
      this.showMessage(message, 'warning', true, this.ConfigService.getWarningMessageDelay());
    }

    private showMessage(message: string, type: string, autoHide: boolean, autoHideDelay: number) {
      if (angular.isUndefined(message) || message == null) {
        message = '';
      }
      jQuery.notify(message, {
        className: type,
        autoHide: autoHide,
        autoHideDelay: autoHideDelay
      });
      $(this).addClass('input-allert');
    }

    public getFormattedStringDate(date: Date): string {
      return moment(date).format('DD.MM.YYYY');
    }
  }


  angular.module('employees').service('JQueryUtilsService', employees.JQueryUtilsService);
}
