/**
 * Created by Damian on 11.05.2017.
 */
/// <reference path="../../app.module.ts" />

module employees {
    'use strict';

    interface IEmployeeDane{
        employees: employees.IEmployee[];
        employeeId: number;
        details:Array<IContact>


    }

    export class EmployeeDetailCtrl implements IEmployeeDane{

        private names: string;
        private lastname: string;
        private avatarFilePath: string;
        private position: string;


        employees: Array<IEmployee>;
        details: IContact[];



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
            this.names=det.name;
            this.lastname=det.lastname;
            this.avatarFilePath=det.avatarFilePath;
            this.position=det.position;
        }

        public deleteEmployeeId() {
            this.EmployeeBackService.deleteEmployeeDetail(this.employeeId).then(this.getEmployeeDeleteCallBack);

        };


        private getEmployeeDeleteCallBack =(res:IEmployeeDetail<IContact>) =>{
            this.details = res.contacts;
        }




        /*variables for visible*/
        formContainerVisible = false;
        public formcontainer() {

            this.formContainerVisible = !this.formContainerVisible;
        };


    }

    angular.module('employees').controller('EmployeeDetailCtrl', EmployeeDetailCtrl); /*nazwa kontrolera*/
}
