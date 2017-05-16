/**
 * Created by Damian on 11.05.2017.
 */

/// <reference path="../../app.module.ts" />

module employees {
    'use strict';
    import IComponentController = angular.IComponentController;

    const EmployeeListComponent: ng.IComponentOptions = {
        bindings: {},
        controller: EmployeeListCtrl,
        controllerAs: 'list',
        templateUrl: 'content/component/employeeList/employeeList.template.html'
    };

    angular.module('employees').component('employee', EmployeeListComponent); /*nazwa komponentu*/
}
