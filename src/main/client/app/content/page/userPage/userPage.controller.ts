/// <reference path="../../app.module.ts" />

module employees {
    'use strict';



    export class UserCtrl {

        public details: IContact[];
        public name: number;
        private refreshEmployee: boolean = false;


        // @ngInject
        constructor(private EmployeeBackService: IEmployeeBackService,
                    private $timeout: ng.ITimeoutService) {

        }
        /*TO jest kontroler RODZICA tutaj mam pod employee przekazany argument z dziecka
         innego i chcę go przekazać z rodzica do innego dziecka
         */
        public poka(employee: number) {
            console.log("jeste m tu tez wysoko ziom " + employee);
            this.refreshEmployee = true;
            this.$timeout(() => {  /*timeout żeby powracało do wartości wyjściowej*/
                this.refreshEmployee = false;

            });


        }


        public wyswietlId(employee: number) {
            this.EmployeeBackService.getEmployeeDetail(employee).then(this.getEmployeeDetailCallBack);

        }

        private getEmployeeDetailCallBack =(res:IEmployeeDetail<IContact>) =>{
            this.details = res.contacts;
        }

    }

    angular.module('employees').controller('UserCtrl', UserCtrl); /*nazwa kontrolera*/
}
