/**
 * Created by Damian on 11.05.2017.
 */
/// <reference path="../../app.module.ts" />

module employees {
    'use strict';

    export interface IEmployeeList{
        employees:Array<IEmployee>;
        details:Array<IContact>
        newList: boolean;
    }

    export class EmployeeListCtrl implements IEmployeeList{

        employees: IEmployee[] = [];
        details: IContact[];
        public numer: number;
        public name: string;
        public onSelectEmployee: ($event) => void;
        public newList: boolean = true;
        private newEmployee: boolean;

        // @ngInject
        constructor(private EmployeeBackService: IEmployeeBackService) {
            this.init();
        }

        /*to chcę wywoływać za każdym przekazaniem true*/
        private init() {
        if (this.newList == true){
            this.EmployeeBackService.getEmployee().then(this.getEmpoloyeeCallBack);
            this.newList = false;
            console.log(this.newList);
        }
        }
        /*przy zmianie onChange wyłapuje*/
        public $onChanges(changesObj) {
            console.log(changesObj)
            if (changesObj && changesObj.newEmployee && changesObj.newEmployee.currentValue){
                this.newList = changesObj.newEmployee.currentValue;
                this.init();
            }
        }



        private getEmpoloyeeCallBack =(res:IPageResponseArgs<IEmployee>) =>{
            console.log(this.employees.length);

            this.employees=res.content;
            console.log(res.content.length);
            this.numer=res.totalPages;

        }


        public selectEmployeeId(employeeId: number) {
            console.log("tutaj jest maly kontroler", employeeId);
            this.onSelectEmployee({$event: angular.copy(employeeId)});
        };



    }

    angular.module('employees').controller('EmployeeListCtrl', EmployeeListCtrl); /*nazwa kontrolera*/
}
