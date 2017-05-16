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
    constructor() {


    }

    public slide() {

      this.inputContainerVisible = !this.inputContainerVisible;
    };

  }

  angular.module('employees').controller('NavbarCtrl', NavbarCtrl);
  /*nazwa kontrolera*/
}
