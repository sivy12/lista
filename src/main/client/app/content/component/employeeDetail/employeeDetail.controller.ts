/**
 * Created by Damian on 11.05.2017.
 */
/// <reference path="../../app.module.ts" />

module employees {
    'use strict';


    export class EmployeeDetailCtrl{

        private names: string;
        private lastname: string;
        private avatarFilePath: string;
        private position: string;
        public onDeleteEmployee: ($event) => void;
        employeeId = this.$stateParams.id;
        private delete: boolean = false;

        // @ngInject
        constructor(private EmployeeBackService: IEmployeeBackService,
                    private $stateParams: ActorsStateParams,
                    private $state: ng.ui.IStateService) {
            this.EmployeeBackService.getEmployeeDetail(this.employeeId).then(this.getEmployeeDetailCallBack);

        }


        private getEmployeeDetailCallBack =(det:IEmployee) =>{
            this.names=det.name;
            this.lastname=det.lastname;
            this.avatarFilePath=det.avatarFilePath;
            this.position=det.position;
        }

        private deleteEmployeeId() {
            this.delete = true;
       if(this.delete == true){
           this.EmployeeBackService.deleteEmployeeDetail(this.employeeId).then(this.getEmployeeDeleteCallBack);

       }

        };


        private getEmployeeDeleteCallBack =(res:IEmployee) =>{
            this.onDeleteEmployee({$event: angular.copy(this.employeeId)}); /*przypisanei dopeiro w callbacku,
            po wywołaniu metody*/
            this.delete = false;
            this.$state.go('access.userPage');

        }

        private hideForm(zmienna){
            this.formContainerVisible = zmienna;
        }


        /*variables for visible*/
        formContainerVisible = false;
        private formcontainer() {
            this.formContainerVisible = !this.formContainerVisible;
        };


    }

    angular.module('employees').controller('EmployeeDetailCtrl', EmployeeDetailCtrl); /*nazwa kontrolera*/
}
