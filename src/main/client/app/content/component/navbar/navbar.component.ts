/**
 * Created by Damian on 11.05.2017.
 */

/// <reference path="../../app.module.ts" />

module employees {
    'use strict';
    import IComponentController = angular.IComponentController;

    const NavbarComponent: ng.IComponentOptions = {
        bindings: {},
        controller: NavbarCtrl,
        controllerAs: 'navbar',
        templateUrl: 'content/component/navbar/navbar.template.html'
    };

    angular.module('employees').component('navbar', NavbarComponent);
}
