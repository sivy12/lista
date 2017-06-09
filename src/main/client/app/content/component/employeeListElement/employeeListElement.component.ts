/**
 * Created by Damian on 11.05.2017.
 */

/// <reference path="../../app.module.ts" />

module employees {
    'use strict';
    import IComponentController = angular.IComponentController;

    const EmployeeListElementComponent: ng.IComponentOptions = {
        bindings: {
            employee: "<"
        },
        controller: EmployeeListElementCtrl,
        controllerAs: 'listElementCtr',
        templateUrl: 'content/component/employeeListElement/employeeListElement.template.html'
    };

    angular.module('employees').component('listElement', EmployeeListElementComponent);
}
