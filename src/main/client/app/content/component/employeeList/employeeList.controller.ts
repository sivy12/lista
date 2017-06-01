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
            this.refresh();
        }
        /*to chcę wywoływać za każdym przekazaniem true*/
        private init() {
        if (this.newList == true){
            this.EmployeeBackService.getEmployee().then(this.getEmpoloyeeCallBack);
            this.newList = false;
            console.log(this.newList);
        }
        }

        public $onChanges(changesObj) {
            console.log(changesObj)
            if (changesObj && changesObj.newEmployee && changesObj.newEmployee.currentValue){
                this.newList = changesObj.newEmployee.currentValue;
                this.init();
            }
        }


        /*niby w konsoli dziecka powinno pokazac te id co przekazałem z rodzica a krzyczy że to nie funkcja*/
        public refresh() {
            if(this.newEmployee==true)
            {
                console.log(this.newEmployee);
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
