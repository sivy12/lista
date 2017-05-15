/// <reference path="../app.module.ts" />

module employees {
  'use strict';

  export interface IModalUtilService {
    createConfirmationModal(message: string, confirmMessage: string, cancelMessage: string, confirmationTitleMessage?: string): ng.IPromise<boolean>;
    closeConfirmationModal(result: boolean): void;
    createProfileEditModal(user: ISlimUser): ng.IPromise<ISlimUser>;
    closeProfileEditModal(result: ISlimUser): void;
  }

  export class ModalUtilService implements IModalUtilService {

    private modal: ng.ui.bootstrap.IModalServiceInstance = null;
    private addModal: ng.ui.bootstrap.IModalServiceInstance = null;
    private commentModal: ng.ui.bootstrap.IModalServiceInstance = null;

    // @ngInject
    constructor(private $uibModal: ng.ui.bootstrap.IModalService) {
    }

    public createConfirmationModal = (message: string, confirmMessage: string, cancelMessage: string, confirmationTitleMessage?: string): ng.IPromise<boolean> => {
      this.modal = this.$uibModal.open({
        templateUrl: 'content/modals/confirmation.html',
        backdrop: 'static',
        controller: 'ModalPromptCtrl',
        controllerAs: 'prompt',
        size: 'md',
        resolve: {
          message: function () {
            return message;
          },
          confirmMessage: function () {
            return confirmMessage;
          },
          cancelMessage: function () {
            return cancelMessage;
          },
          confirmationTitleMessage: function () {
            return confirmationTitleMessage;
          }
        }
      });
      return this.modal.result;
    };

    public closeConfirmationModal(result: boolean) {
      if (!angular.isUndefined(this.modal) && this.modal != null) {
        this.modal.close(result);
        this.modal = null;
      }
    }

    public createProfileEditModal(user: employees.ISlimUser): angular.IPromise<employees.ISlimUser> {
      this.modal = this.$uibModal.open({
        templateUrl: 'content/modals/profileEdit/profileEdit.modal.template.html',
        backdrop: 'static',
        controller: 'ProfileEditModalController',
        controllerAs: 'profileEdit',
        size: 'lg',
        resolve: {
          user: function () {
            return angular.copy(user);
          }
        }
      });
      return this.modal.result;
    }

    public closeProfileEditModal(result: employees.ISlimUser): void {
      if (!angular.isUndefined(this.modal) && this.modal != null) {
        this.modal.close(result);
        this.modal = null;
      }
    }

  }
  angular.module('employees').service('ModalUtilService', employees.ModalUtilService);
}