/// <reference path="../../app.module.ts" />

module employees {
    'use strict';

    export interface IContactTypeService {
        //getEmployee(pageNumber: number, pageSize: number): ng.IHttpPromise<IPageResponseArgs<IEmployee>>;



    }
    /*obiekt*/

    export class ContactTypeService
        implements IContactTypeService {


        // private modal: ng.ui.bootstrap.IModalServiceInstance = null;

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


    }

    angular.module('employees').service('ContactTypeService', ContactTypeService);
}
