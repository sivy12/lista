/**
 * Created by Damian on 11.05.2017.
 */
/// <reference path="../../app.module.ts" />

module employees {
    'use strict';

    interface IEmployeeDetail{
        employees: employees.IEmployee[];
    }

    export class EmployeeDetailCtrl implements IEmployeeDetail{




        employees: Array<IEmployee>;


        // @ngInject
        constructor(private employeeBackService: IEmployeeBackService) {
            this.employeeBackService.getEmployee().then(this.getEmployeeCallBack);
        }

        private getEmployeeCallBack =(res:IPageResponseArgs<IEmployee>) =>{
            console.log("getEmployeeCallBack ",res);
            this.employees=res.content;
        }




        /*variables for visible*/
        formContainerVisible = false;
        public formcontainer() {

            this.formContainerVisible = !this.formContainerVisible;
        };


    }

    angular.module('employees').controller('EmployeeDetailCtrl', EmployeeDetailCtrl); /*nazwa kontrolera*/
}
