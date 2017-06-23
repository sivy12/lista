/// <reference path="../../app.module.ts" />

module employees {
    'use strict';

    export interface ISkillsService {
        getSkills (id: number): ng.IHttpPromise<Array<ISkills>>;
        deleteSkills (id: number, idSkills: number): ng.IHttpPromise<ISkills>;
        saveSkills(id: number, skill: ISkills): ng.IHttpPromise<ISkills>;
        //getContactsType (): ng.IHttpPromise<IContactArrayBase<IContactType>>;
        getSkillsByName (skillPart: string): ng.IHttpPromise<Array<ISkillsFindByName>>;

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
        public getSkillsByName (skillPart: string): ng.IHttpPromise<Array<ISkillsFindByName>> {
            return this.$resource(`${this.ConfigService.getHost()}/employee/skills/:skillPart`, {
                skillPart: skillPart,
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

        public saveSkills(id: number, skill: ISkills): ng.IHttpPromise<ISkills> {
            return this.$resource(`${this.ConfigService.getHost()}/employee/:id/skills`, {
                id: id,
            }, {
                'query': {
                    method: 'POST'
                }
            }).query(skill).$promise;
        };


    }

    angular.module('employees').service('SkillsService', SkillsService);
}
