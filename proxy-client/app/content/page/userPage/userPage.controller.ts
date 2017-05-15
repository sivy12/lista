/// <reference path="../../app.module.ts" />

module employees {
    'use strict';

    export class UserCtrl {

        user: IUser = {};

        // @ngInject
        constructor() {


        }

    }

    angular.module('employees').controller('UserCtrl', UserCtrl); /*nazwa kontrolera*/
}
