/**
 * Created by Damian on 12.05.2017.
 */

/// <reference path="../../app.module.ts" />

module employees {
    'use strict';
    import IComponentController = angular.IComponentController;

    const TimesheetComponent: ng.IComponentOptions = {
        bindings: {},
        controller: TimesheetCtrl,
        controllerAs: 'timesheet',
        templateUrl: 'content/component/timesheet/timesheet.template.html'
    };

    angular.module('employees').component('timesheet', TimesheetComponent);
}
