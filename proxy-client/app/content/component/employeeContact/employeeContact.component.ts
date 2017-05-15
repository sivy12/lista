/**
 * Created by Damian on 12.05.2017.
 */

/// <reference path="../../app.module.ts" />

module employees {
    'use strict';
    import IComponentController = angular.IComponentController;

    const EmployeeContactComponent: ng.IComponentOptions = {
        bindings: {},
        controller: EmployeeContactCtrl,
        controllerAs: 'contact',
        templateUrl: 'content/component/employeeContact/employeeContact.template.html'
    };

    angular.module('employees').component('contact', EmployeeContactComponent); /*nazwa komponentu*/
}
