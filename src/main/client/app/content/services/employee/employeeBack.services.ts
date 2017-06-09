/// <reference path="../../app.module.ts" />

module employees {
    'use strict';

    export interface IEmployeeBackService {
        getEmployee(pageNumber: number): ng.IHttpPromise<IPageResponseArgs<IEmployee>>;
        getEmployeeDetail(employeeId: number): ng.IHttpPromise<IEmployee>;
        deleteEmployeeDetail (id: number): ng.IHttpPromise<IEmployee>;
        getContacts (id: number): ng.IHttpPromise<Array<IContact>>;
        deleteContacts (id: number, idContact: number): ng.IHttpPromise<IContact>;
        saveContact(id: number, contact: IContact): ng.IHttpPromise<IContact>;
        saveEmployee(employee: IEmployee): ng.IHttpPromise<IEmployee>;


    }
    /*obiekt*/

    export class EmployeeBackService
        implements IEmployeeBackService {


        // private modal: ng.ui.bootstrap.IModalServiceInstance = null;

        // @ngInject
        constructor(private ConfigService: employees.IConfigService,
                    private $resource: ng.resource.IResourceService,
                    private $q: ng.IQService) {

        }

        public getEmployee = (pageNumber: number): ng.IHttpPromise<IPageResponseArgs<IEmployee>> => {
            return this.$resource(`${this.ConfigService.getHost()}/employee/?`, {
                pageNumber: pageNumber,
            }, {
                'query': {
                    method: 'GET'
                }
            }).query({page:pageNumber}).$promise

        };


        public getEmployeeDetail (id: number): ng.IHttpPromise<IEmployee> {
            return this.$resource(`${this.ConfigService.getHost()}/employee/:id`, {
                id: id,
            }, {
                'query': {
                    method: 'GET'
                }
            }).query({}).$promise

        };

        /*brakuje corsa*/
        public deleteEmployeeDetail (id: number): ng.IHttpPromise<IEmployee> {
            return this.$resource(`${this.ConfigService.getHost()}/employee/:id`, {
                id: id,
            }, {
                'query': {
                    method: 'DELETE'
                }
            }).query({}).$promise

        };


        /*jeżeli biorę tablice musze ją zadeklarować*/
        public getContacts (id: number): ng.IHttpPromise<Array<IContact>> {
            return this.$resource(`${this.ConfigService.getHost()}/employee/:id/contacts`, {
                id: id,
            }, {
                'query': {
                    method: 'GET',
                    isArray: true
                }
            }).query({}).$promise

        };

        public deleteContacts (id: number, idContact: number): ng.IHttpPromise<IContact> {
            return this.$resource(`${this.ConfigService.getHost()}/employee/:id/contacts/:idContact`, {
                id: id,
                idContact: idContact,
            }, {
                'query': {
                    method: 'DELETE'
                }
            }).query({}).$promise

        };

        public saveContact(id: number, contact: IContact): ng.IHttpPromise<IContact> {
            return this.$resource(`${this.ConfigService.getHost()}/employee/:id/contacts`, {
                id: id,
            }, {
                'query': {
                    method: 'POST'
                }
            }).query(contact).$promise;
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
