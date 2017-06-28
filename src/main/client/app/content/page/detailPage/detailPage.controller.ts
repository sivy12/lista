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
        public onDeleteRefresh: ($event) => void;


        // @ngInject
        constructor(private EmployeeBackService: IEmployeeBackService,
                    private $stateParams: ActorsStateParams) {
            this.EmployeeBackService.getEmployeeDetail(this.employeeId).then(this.getUserDetailCallBack);


        }
        employeeId = this.$stateParams.id;


        private getUserDetailCallBack =(det:IEmployeeDetail<IContact>) =>{
            this.details=det.contacts;
            this.name=det.name;
        }

        public takeRefreshList(employee: number) {
            this.onDeleteRefresh({$event: angular.copy(employee)});
        }
        
        

    }

    angular.module('employees').controller('DetailPageCtrl', DetailPageCtrl);
}
