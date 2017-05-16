/**
 * Created by Damian on 12.05.2017.
 */

/// <reference path="../../app.module.ts" />

module employees {
    'use strict';
    import IComponentController = angular.IComponentController;

    const SkillsComponent: ng.IComponentOptions = {
        bindings: {},
        controller: SkillCtrl,
        controllerAs: 'skill',
        templateUrl: 'content/component/skills/skills.template.html'
    };

    angular.module('employees').component('skills', SkillsComponent); /*nazwa komponentu*/
}
