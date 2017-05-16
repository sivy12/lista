/**
 * Created by Damian on 15.05.2017.
 */

/// <reference path="../../app.module.ts" />

module employees {
    'use strict';
    import IComponentController = angular.IComponentController;

    const EmployeeDetailFormComponent: ng.IComponentOptions = {
        bindings: {},
        controller: EmployeeDetailFormCtrl,
        controllerAs: 'detailForm',
        templateUrl: 'content/component/employeeDetailForm/employeeDetailForm.template.html'
    };

    angular.module('employees').component('detailForm', EmployeeDetailFormComponent); /*nazwa komponentu*/
}
