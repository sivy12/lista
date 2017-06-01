/**
 * Created by Damian on 15.05.2017.
 */
/**
 * Created by Damian on 11.05.2017.
 */
/// <reference path="../../app.module.ts" />

module employees {
    'use strict';

    export class EmployeeDetailFormCtrl{

        private name: string;
        private lastname: string;
        private avatarFilePath: string;
        private position: string;
        private hideForm: boolean = true;
        private update: boolean = true;
        employeeId = this.$stateParams.id;
        employee: IEmployee;

        public onEdit: ($event) => void;



        // @ngInject
        constructor(private EmployeeBackService: IEmployeeBackService,
                    private $stateParams: ActorsStateParams,
                    private $state: ng.ui.IStateService,
                    private $timeout: ng.ITimeoutService) {
            this.init(this.update);

        }

        private init(newContact: boolean) {
            if (newContact == true){
                this.EmployeeBackService.getEmployeeDetail(this.employeeId).then(this.getEmployeeFormCallBack);
                this.update = false;
            }
        }

        private getEmployeeFormCallBack =(det:IEmployee) =>{

            this.employee=det;
            console.log(this.employee);

        }

        public saveEmployee = ()=> {
            this.onEdit({$event: angular.copy(false)});

            this.EmployeeBackService.saveEmployee(this.employee).then(this.saveEmployeeCallBack);

        };

        private saveEmployeeCallBack = (response)=> {
            //this.JQueryUtilsService.showSuccessMessage(this.$translate.instant("userProfile.saveWithSuccess"));
            console.log(response);

        };


    }

    angular.module('employees').controller('EmployeeDetailFormCtrl', EmployeeDetailFormCtrl); /*nazwa kontrolera*/
}
