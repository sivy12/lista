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

        // public selectEmployeeId(employeeId: number) {
        //     this.EmployeeBackService.getEmployeeDetail(employeeId).then(this.getEmployeeDetailCallBack);
        //
        // };
        //
        // private getEmployeeDetailCallBack =(res:IEmployeeDetail<IContact>) =>{
        //     this.details = res.contacts;
        //     this.name = res.name;
        // }


    }

    angular.module('employees').controller('EmployeeListCtrl', EmployeeListCtrl); /*nazwa kontrolera*/
}
