/**
 * Created by Damian on 15.05.2017.
 */
/**
 * Created by Damian on 11.05.2017.
 */
/// <reference path="../../app.module.ts" />

module employees {
    'use strict';

    export class EmployeeDetailFormCtrl {

        private update: boolean = true;
        employeeId = this.$stateParams.id;
        employee: IEmployee;

        public onEdit: ($event) => void;


        // @ngInject
        constructor(private $translatePartialLoader: ng.translate.ITranslatePartialLoaderService,
                    private EmployeeBackService: IEmployeeBackService,
                    private $stateParams: ActorsStateParams,
                    private $state: ng.ui.IStateService,
                    private $timeout: ng.ITimeoutService) {
            this.init(this.update);
            this.$translatePartialLoader.addPart('detail');
            this.$translatePartialLoader.addPart('icons');

        }

        private init(newContact: boolean) {
            if (newContact == true) {
                this.EmployeeBackService.getEmployeeDetail(this.employeeId).then(this.getEmployeeFormCallBack);
                this.update = false;
            }
        }

        private getEmployeeFormCallBack = (det: IEmployee) => {

            this.employee = det;
            console.log("dane aktualne przed zapisaniem to: " + this.employee);

        }

        public saveEmployee = () => {
            this.onEdit({$event: angular.copy(false)});

            this.EmployeeBackService.saveEmployee(this.employee).then(this.saveEmployeeCallBack);

        };

        private saveEmployeeCallBack = (response) => {

        };


    }

    angular.module('employees').controller('EmployeeDetailFormCtrl', EmployeeDetailFormCtrl);
}
