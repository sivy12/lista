/// <reference path="../../app.module.ts" />

module employees {
    'use strict';

    export interface IEmployeeBackService {
        //getEmployee(pageNumber: number, pageSize: number): ng.IHttpPromise<IPageResponseArgs<IEmployee>>;
        getEmployeeDetail(employeeId: number): ng.IHttpPromise<IEmployee>;
        deleteEmployeeDetail (id: number): ng.IHttpPromise<IEmployee>;
        saveEmployee(employee: IEmployee): ng.IHttpPromise<IEmployee>;

    }
    /*obiekt*/

    export class EmployeeBackService
        implements IEmployeeBackService {



        // @ngInject
        constructor(private ConfigService: employees.IConfigService,
                    private $resource: ng.resource.IResourceService,
                    private $q: ng.IQService) {

        }

        // public getEmployee = (pageNumber: number, pageSize: number): ng.IHttpPromise<IPageResponseArgs<IEmployee>> => {
        //     return this.$resource(`${this.ConfigService.getHost()}/employee/?`, {
        //         pageNumber: pageNumber,
        //         pageSize: pageSize,
        //     }, {
        //         'query': {
        //             method: 'GET'
        //         }
        //     }).query({page:pageNumber,pageSize:15}).$promise
        //
        // };


        public getEmployeeDetail (id: number): ng.IHttpPromise<IEmployee> {
            return this.$resource(`${this.ConfigService.getHost()}/employee/:id`, {
                id: id,
            }, {
                'query': {
                    method: 'GET'
                }
            }).query({}).$promise

        };

        public deleteEmployeeDetail (id: number): ng.IHttpPromise<IEmployee> {
            return this.$resource(`${this.ConfigService.getHost()}/employee/:id`, {
                id: id,
            }, {
                'query': {
                    method: 'DELETE'
                }
            }).query({}).$promise

        };


        public saveEmployee(employee: IEmployee): ng.IHttpPromise<IEmployee> {
            return this.$resource(`${this.ConfigService.getHost()}/employee/`, {
            }, {
                'query': {
                    method: 'POST'
                }
            }).query(employee).$promise;
        };


    }

    angular.module('employees').service('EmployeeBackService', EmployeeBackService);
}
