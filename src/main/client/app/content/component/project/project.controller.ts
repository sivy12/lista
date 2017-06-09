/**
 * Created by Damian on 11.05.2017.
 */
/// <reference path="../../app.module.ts" />

module employees {
    'use strict';

    export class ProjectCtrl {

        user: IUser = {};

        // @ngInject
        constructor(private $translatePartialLoader: ng.translate.ITranslatePartialLoaderService) {
            this.$translatePartialLoader.addPart('project');
            this.$translatePartialLoader.addPart('icons');


        }


        formContainerVisible = false;

        private formContainer() {
            this.formContainerVisible = !this.formContainerVisible;
        };

    }

    angular.module('employees').controller('ProjectCtrl', ProjectCtrl);
}
