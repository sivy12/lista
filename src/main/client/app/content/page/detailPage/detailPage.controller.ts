/// <reference path="../../app.module.ts" />

module employees {
    'use strict';

    interface IDetail{
        details:Array<IContact>
    }

    export class DetailPageCtrl implements IDetail{


        details: IContact[];
        public name: string;
        // @ngInject
        constructor(private EmployeeBackService: IEmployeeBackService) {
            this.EmployeeBackService.getEmployeeDetail(50).then(this.getUserDetailCallBack);


        }

        private getUserDetailCallBack =(det:IEmployeeDetail<IContact>) =>{
            this.details=det.contacts;
            this.name=det.name;
        }

    }

    angular.module('employees').controller('DetailPageCtrl', DetailPageCtrl); /*nazwa kontrolera*/
}
