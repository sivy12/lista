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


        }

    }

    angular.module('employees').controller('ProjectCtrl', ProjectCtrl);
}
