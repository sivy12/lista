/// <reference path="../../app.module.ts" />

module employees {
    'use strict';

    export interface ISkillsService {
        getSkills (id: number): ng.IHttpPromise<Array<ISkills>>;
        deleteSkills (id: number, idSkills: number): ng.IHttpPromise<ISkills>;
        //saveContact(id: number, contact: IContact): ng.IHttpPromise<IContact>;
        //getContactsType (): ng.IHttpPromise<IContactArrayBase<IContactType>>;
    }
    /*obiekt*/

    export class SkillsService
        implements ISkillsService {


        // @ngInject
        constructor(private ConfigService: employees.IConfigService,
                    private $resource: ng.resource.IResourceService,
                    private $q: ng.IQService) {

        }

        /*jeżeli biorę tablice musze ją zadeklarować*/
        public getSkills (id: number): ng.IHttpPromise<Array<ISkills>> {
            return this.$resource(`${this.ConfigService.getHost()}/employee/:id/skills`, {
                id: id,
            }, {
                'query': {
                    method: 'GET',
                    isArray: true
                }
            }).query({}).$promise

        };
        // public getContactsType (): ng.IHttpPromise<IContactArrayBase<IContactType>> {
        //     return this.$resource(`${this.ConfigService.getHost()}/employee/contacts`, {
        //     }, {
        //         'query': {
        //             method: 'GET'
        //         }
        //     }).query({}).$promise
        //
        // };
        //
        public deleteSkills (id: number, idSkills: number): ng.IHttpPromise<ISkills> {
            return this.$resource(`${this.ConfigService.getHost()}/employee/:id/skills/:idSkills`, {
                id: id,
                idSkills: idSkills,
            }, {
                'query': {
                    method: 'DELETE'
                }
            }).query({}).$promise

        };
        //
        // public saveContact(id: number, contact: IContact): ng.IHttpPromise<IContact> {
        //     return this.$resource(`${this.ConfigService.getHost()}/employee/:id/contacts`, {
        //         id: id,
        //     }, {
        //         'query': {
        //             method: 'POST'
        //         }
        //     }).query(contact).$promise;
        // };


    }

    angular.module('employees').service('SkillsService', SkillsService);
}
