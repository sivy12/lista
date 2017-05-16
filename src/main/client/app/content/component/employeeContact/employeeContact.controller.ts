/**
 * Created by Damian on 11.05.2017.
 */
/// <reference path="../../app.module.ts" />

module employees {
    'use strict';

    export class EmployeeContactCtrl {

        user: IUser = {};

        // @ngInject
        constructor() {


        }

        formContainerVisible = false;
        public formcontainer() {

            this.formContainerVisible = !this.formContainerVisible;
        };

    }

    angular.module('employees').controller('EmployeeContactCtrl', EmployeeContactCtrl); /*nazwa kontrolera*/
}
