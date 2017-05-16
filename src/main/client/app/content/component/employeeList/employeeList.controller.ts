/**
 * Created by Damian on 11.05.2017.
 */
/// <reference path="../../app.module.ts" />

module employees {
    'use strict';

    export interface IEmployeeList{
        employees:Array<IEmployee>;
        details:Array<IContact>

    }

    export class EmployeeListCtrl implements IEmployeeList{

        employees: employees.IEmployee[];
        details: IContact[];
        public numer: number;
        public name: string;
        public onSelectEmployee: ($event) => void;

        // @ngInject
        constructor(private EmployeeBackService: IEmployeeBackService) {
            this.EmployeeBackService.getEmployee().then(this.getEmpoloyeeCallBack);
            this.EmployeeBackService.getEmployeeDetail(50).then(this.getEmployeeDetailCallBack);
        }



        private getEmpoloyeeCallBack =(res:IPageResponseArgs<IEmployee>) =>{
            this.employees=res.content;
            this.numer=res.totalPages;

        }


        private getEmployeeDetailCallBack =(res:IEmployeeDetail<IContact>) =>{
            this.details = res.contacts;
            this.name = res.name;
        }

        public selectEmployeeId(employeeId: number) {
            console.log("tutaj jest maly kontroler", employeeId);
            this.onSelectEmployee({$event: angular.copy(employeeId)});
        };

    }

    angular.module('employees').controller('EmployeeListCtrl', EmployeeListCtrl); /*nazwa kontrolera*/
}
