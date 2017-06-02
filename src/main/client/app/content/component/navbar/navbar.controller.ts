/**
 * Created by Damian on 11.05.2017.
 */
/// <reference path="../../app.module.ts" />

module employees {
  'use strict';

  export class NavbarCtrl {

    user: IUser = {};
    inputContainerVisible = false;
    // @ngInject
    constructor(private $translatePartialLoader: ng.translate.ITranslatePartialLoaderService) {
      this.$translatePartialLoader.addPart('main');
      this.$translatePartialLoader.addPart('icons');

    }

    public slide() {

      this.inputContainerVisible = !this.inputContainerVisible;
    };

  }

  angular.module('employees').controller('NavbarCtrl', NavbarCtrl);
}
