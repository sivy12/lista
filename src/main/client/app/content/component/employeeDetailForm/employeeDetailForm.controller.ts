/**
 * Created by Damian on 15.05.2017.
 */
/**
 * Created by Damian on 11.05.2017.
 */
/// <reference path="../../app.module.ts" />

module employees {
    'use strict';

    export interface IEmployeeForm{
        employees:Array<IEmployee>;

    }

    export class EmployeeDetailFormCtrl implements IEmployeeForm{

        employees: employees.IEmployee[];

        // @ngInject
        constructor(private EmployeeBackService: IEmployeeBackService) {
        }




    }

    angular.module('employees').controller('EmployeeDetailFormCtrl', EmployeeDetailFormCtrl); /*nazwa kontrolera*/
}
