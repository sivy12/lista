/// <reference path="../../app.module.ts" />

module employees {
    'use strict';



    export class UserCtrl {

        private refreshEmployee: boolean = false;


        // @ngInject
        constructor(private EmployeeBackService: IEmployeeBackService,
                    private $timeout: ng.ITimeoutService) {

        }


        private refreshFromChild(employee: number) {
            console.log("Przekazanie z dziecka detailPage po usunięciu ID znajduje się u rodzica wszystkich komponentów: " + employee);
            this.refreshEmployee = true;
            this.$timeout(() => {  /*timeout żeby powracało do wartości wyjściowej*/
                this.refreshEmployee = false;

            });


        }

    }

    angular.module('employees').controller('UserCtrl', UserCtrl);
}
