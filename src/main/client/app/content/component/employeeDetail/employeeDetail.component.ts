/**
 * Created by Damian on 12.05.2017.
 */

/// <reference path="../../app.module.ts" />

module employees {
    'use strict';
    import IComponentController = angular.IComponentController;

    const EmployeeDetailComponent: ng.IComponentOptions = {
        bindings: {
            onDeleteEmployee: "&"
        },
        controller: EmployeeDetailCtrl,
        controllerAs: 'detail',
        templateUrl: 'content/component/employeeDetail/employeeDetail.template.html'
    };

    angular.module('employees').component('detail', EmployeeDetailComponent); /*nazwa komponentu*/
}
