/// <reference path="../../app.module.ts" />

module employees {
    'use strict';

    export interface IEmployeeBackService {
        getEmployee(): ng.IHttpPromise<IPageResponseArgs<IEmployee>>;
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
            return this.$resource(`${this.ConfigService.getHost()}/employee/findAll`, {}, {
                'query': {
                    method: 'GET'
                }
            }).query({}).$promise
            // return this.getEmployeesCallback()

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
                        "avatarFilePath": "../images/avatar3.jpg"
                    }
                ]);
            return defer.promise;

        }

    }

    angular.module('employees').service('employeeBackService', EmployeeBackService);
}
