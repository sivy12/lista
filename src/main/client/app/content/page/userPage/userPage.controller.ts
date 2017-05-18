/// <reference path="../../app.module.ts" />

module employees {
    'use strict';



    export class UserCtrl {

        public details: IContact[];
        public name: number;

        // @ngInject
        constructor(private EmployeeBackService: IEmployeeBackService) {


        }

        public wyswietlId(employee: number) {
            this.EmployeeBackService.getEmployeeDetail(employee).then(this.getEmployeeDetailCallBack);


            this.name = employee;
        }

        private getEmployeeDetailCallBack =(res:IEmployeeDetail<IContact>) =>{
            this.details = res.contacts;
        }

    }

    angular.module('employees').controller('UserCtrl', UserCtrl); /*nazwa kontrolera*/
}
