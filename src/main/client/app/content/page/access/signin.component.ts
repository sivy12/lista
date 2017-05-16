/// <reference path="../../app.module.ts" />

module employees {
  'use strict';
  import IComponentController = angular.IComponentController;

  const LabelValueComponent: ng.IComponentOptions = {
    bindings: {},
    controller: SigninCtrl,
    controllerAs: 'login',
    templateUrl: 'content/page/access/signin.tpl.html'
  };

  angular.module('employees').component('signin', LabelValueComponent);
}
