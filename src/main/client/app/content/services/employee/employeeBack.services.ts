/// <reference path="../../app.module.ts" />

module employees {
    'use strict';

    export interface IEmployeeBackService {
        //getEmployee(pageNumber: number, pageSize: number): ng.IHttpPromise<IPageResponseArgs<IEmployee>>;
        getEmployeeDetail(employeeId: number): ng.IHttpPromise<IEmployee>;
        deleteEmployeeDetail (id: number): ng.IHttpPromise<IEmployee>;
        getContacts (id: number): ng.IHttpPromise<Array<IContact>>;
        deleteContacts (id: number, idContact: number): ng.IHttpPromise<IContact>;
        saveContact(id: number, contact: IContact): ng.IHttpPromise<IContact>;
        saveEmployee(employee: IEmployee): ng.IHttpPromise<IEmployee>;
        getContactsType (): ng.IHttpPromise<IContactType>;



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
        public getContactsType (): ng.IHttpPromise<IContactType> {
            return this.$resource(`${this.ConfigService.getHost()}/employee/contacts`, {
            }, {
                'query': {
                    method: 'GET'
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
