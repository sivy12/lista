/**
 * Created by Damian on 11.05.2017.
 */
/// <reference path="../../app.module.ts" />

module employees {
    'use strict';

    export class SkillCtrl {

        user: IUser = {};

        // @ngInject
        constructor() {


        }

    }

    angular.module('employees').controller('SkillCtrl', SkillCtrl); /*nazwa kontrolera*/
}
