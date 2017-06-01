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
        public onDeleteEmployee: ($event) => void;



        employees: Array<IEmployee>;
        details: IContact[];



        // @ngInject
        constructor(private EmployeeBackService: IEmployeeBackService,
                    private $stateParams: ActorsStateParams,
                    private $state: ng.ui.IStateService) {
            this.EmployeeBackService.getEmployeeDetail(this.employeeId).then(this.getEmployeeDetailCallBack);

        }

        employeeId = this.$stateParams.id;

        private pokaz() {
            console.log(this.employeeId);
        }



        private getEmployeeDetailCallBack =(det:IEmployee) =>{
            this.names=det.name;
            this.lastname=det.lastname;
            this.avatarFilePath=det.avatarFilePath;
            this.position=det.position;
        }

        public deleteEmployeeId() {
            this.EmployeeBackService.deleteEmployeeDetail(this.employeeId).then(this.getEmployeeDeleteCallBack);


        };


        private getEmployeeDeleteCallBack =(res:IEmployee) =>{
            this.onDeleteEmployee({$event: angular.copy(this.employeeId)});
            this.$state.go('access.userPage');

        }

        private getEmpoloyeeCallBack =(res:IPageResponseArgs<IEmployee>) =>{
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
