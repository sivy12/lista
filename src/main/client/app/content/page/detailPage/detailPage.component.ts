/**
 * Created by Damian on 11.05.2017.
 */
/// <reference path="../../app.module.ts" />

module employees {
    'use strict';
    import IComponentController = angular.IComponentController;

    const DetailPageComponent: ng.IComponentOptions = {
        bindings: {

        },
        controller: DetailPageCtrl,
        controllerAs: 'detailCtr',
        templateUrl: 'content/page/detailPage/detailPage.template.html'
    };

    angular.module('employees').component('detpage', DetailPageComponent); /*nazwa komponentu*/
}
