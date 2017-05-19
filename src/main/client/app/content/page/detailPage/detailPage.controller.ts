/// <reference path="../../app.module.ts" />

module employees {
    'use strict';

    interface IDetail{
        details:Array<IContact>
        employeeId: number
    }

    export class DetailPageCtrl implements IDetail{

        details: IContact[];
        public name: string;
        // @ngInject
        constructor(private EmployeeBackService: IEmployeeBackService,
                    private $stateParams: ActorsStateParams) {
            this.EmployeeBackService.getEmployeeDetail(this.employeeId).then(this.getUserDetailCallBack);


        }
        employeeId = this.$stateParams.id;

        private pokaz() {
            console.log(this.employeeId);
        }


        private getUserDetailCallBack =(det:IEmployeeDetail<IContact>) =>{
            this.details=det.contacts;
            this.name=det.name;
        }

    }

    angular.module('employees').controller('DetailPageCtrl', DetailPageCtrl); /*nazwa kontrolera*/
}
