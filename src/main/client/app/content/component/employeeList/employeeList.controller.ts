/**
 * Created by Damian on 11.05.2017.
 */
/// <reference path="../../app.module.ts" />

module employees {
    'use strict';

    interface IEmployeeList{
        employees:Array<IEmployee>;
    }

    export class EmployeeListCtrl implements IEmployeeList{

        employees: employees.IEmployee[];

        // @ngInject
        constructor(private employeeBackService: IEmployeeBackService) {
            this.employeeBackService.getEmployee().then(this.getUserCallBack);
        }
        private getUserCallBack =(res:IPageResponseArgs<IEmployee>) =>{
            this.employees=res.content;
        }

    }

    angular.module('employees').controller('EmployeeListCtrl', EmployeeListCtrl); /*nazwa kontrolera*/
}
