/// <reference path="../../app.module.ts" />

module employees {
    'use strict';



    export class UserCtrl {

        public details: IContact[];
        public name: string;

        // @ngInject
        constructor(private EmployeeBackService: IEmployeeBackService) {


        }

        public wyswietlId(employee: number) {
            this.EmployeeBackService.getEmployeeDetail(employee).then(this.getEmployeeDetailCallBack);


            console.log("tutaj jest ID ", employee);
        }

        private getEmployeeDetailCallBack =(res:IEmployeeDetail<IContact>) =>{
            this.details = res.contacts;
            this.name = res.name;
        }

    }

    angular.module('employees').controller('UserCtrl', UserCtrl); /*nazwa kontrolera*/
}
