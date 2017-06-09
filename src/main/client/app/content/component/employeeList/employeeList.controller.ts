/**
 * Created by Damian on 11.05.2017.
 */
/// <reference path="../../app.module.ts" />

module employees {
    'use strict';


    export class EmployeeListCtrl {

        employees: IEmployee[] = [];
        public numer: number;
        public onSelectEmployee: ($event) => void;
        public newList: boolean = true;
        private newEmployee: boolean;
        private pageNumber: number = 0;
        public actorType = EActorType.EMPLOYEE;

        // @ngInject
        constructor(private $translatePartialLoader: ng.translate.ITranslatePartialLoaderService,
                    private EmployeeBackService: IEmployeeBackService) {
            this.$translatePartialLoader.addPart('icons');
            this.$translatePartialLoader.addPart('search');

        }
        public onScroll() {
            console.log(this.pageNumber);
            this.pageNumber++;
            console.log(this.pageNumber);
            this.newList = true;
            this.init();
        }

        /*to chcę wywoływać za każdym przekazaniem true*/
        private init() {
            if (this.newList == true) {
                this.EmployeeBackService.getEmployee(this.pageNumber).then(this.getEmpoloyeeCallBack);
                this.newList = false;
            }
        }



        public $onChanges(changesObj) {
            /*przy zmianie onChange wyłapuje co się zmienia w current value jest nowa wartość*/
            console.log("z rodzica po bindingu newEmployee usunięcia przychodzi wartość: " + changesObj.newEmployee.currentValue)
            if (changesObj && changesObj.newEmployee && changesObj.newEmployee.currentValue) {
                this.newList = changesObj.newEmployee.currentValue;
                this.init();
            }
        }


        private getEmpoloyeeCallBack = (res: IPageResponseArgs<IEmployee>) => {
            /*sprawdzam ilość przesłanych rekordów w tablicy*/
            console.log("ilość rekordów w tablicy : " + this.employees.length);
            this.employees = res.content;
            this.numer = res.totalPages;

        }


        public selectEmployeeId(employeeId: number) {
            console.log("wysyłam id z dziecka do rodzica selectEmployeId ", employeeId);
            this.onSelectEmployee({$event: angular.copy(employeeId)});
        };


    }

    angular.module('employees').controller('EmployeeListCtrl', EmployeeListCtrl);
}
