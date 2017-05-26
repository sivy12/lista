/// <reference path="../../app.module.ts" />

module employees {
    'use strict';

    export interface IEmployeeBackService {
        getEmployee(): ng.IHttpPromise<IPageResponseArgs<IEmployee>>;
        getEmployeeDetail(employeeId: number): ng.IHttpPromise<IEmployee>;
        deleteEmployeeDetail (id: number): ng.IHttpPromise<IEmployee>;
        getContacts (id: number): ng.IHttpPromise<Array<IContact>>;
        deleteContacts (id: number, idContact: number): ng.IHttpPromise<IContact>;
        saveContact(id: number, contact: IContact): ng.IHttpPromise<IContact>;

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

        public getEmployee = (): ng.IHttpPromise<IPageResponseArgs<IEmployee>> => {
            return this.$resource(`${this.ConfigService.getHost()}/employee/?`, {}, {
                'query': {
                    method: 'GET'
                }
            }).query({page:0}).$promise
            // return this.getEmployeesCallback()

        };


        public getEmployeeDetail (id: number): ng.IHttpPromise<IEmployee> {
            return this.$resource(`${this.ConfigService.getHost()}/employee/:id`, {
                id: id,
            }, {
                'query': {
                    method: 'GET'
                }
            }).query({}).$promise
            // return this.getEmployeesCallback()

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
            // return this.getEmployeesCallback()

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
            // return this.getEmployeesCallback()

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
            // return this.getEmployeesCallback()

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







        private getEmployeesCallback=():ng.IPromise<IPageResponseArgs<IEmployee>> =>{
         let defer = this.$q.defer();
         defer.resolve(
                [
                    {
                        "id": 1,
                        "name": "Damian",
                        "lastname": "Rabczewski",
                        "avatarFilePath": "../images/avatar.jpg"
                    },
                    {
                        "id": 2,
                        "name": "Maciej",
                        "lastname": "Krzyk",
                        "avatarFilePath": "../images/avatar2.jpg"
                    },
                    {
                        "id": 3,
                        "name": "Zbigniew",
                        "lastname": "Religa",
                        "avatarFilePath": "../images/avatar1.jpg"
                    }
                ]);
            return defer.promise;

        }

    }

    angular.module('employees').service('EmployeeBackService', EmployeeBackService);
}
