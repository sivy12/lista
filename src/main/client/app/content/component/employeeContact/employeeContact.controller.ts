/**
 * Created by Damian on 11.05.2017.
 */
/// <reference path="../../app.module.ts" />

module employees {
    'use strict';

    interface IContactDane{
        details: employees.IContact[];
        employeeId: number;

    }


    export class EmployeeContactCtrl implements IContactDane{

        details: Array<IContact>;
        employeeId = this.$stateParams.id;

        // @ngInject
        constructor(private EmployeeBackService: IEmployeeBackService,
                    private $stateParams: ActorsStateParams) {
            this.EmployeeBackService.getEmployeeDetail(this.employeeId).then(this.getUserDetailCallBack);


        }

        formContainerVisible = false;
        public formcontainer() {

            this.formContainerVisible = !this.formContainerVisible;
        };


        private getUserDetailCallBack =(det:IEmployeeDetail<IContact>) =>{
            this.details=det.contacts;
        }

    }

    angular.module('employees').controller('EmployeeContactCtrl', EmployeeContactCtrl); /*nazwa kontrolera*/
}
