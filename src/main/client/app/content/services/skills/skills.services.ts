/// <reference path="../../app.module.ts" />

module employees {
    'use strict';

    export interface ISkillsService {
        getSkills (id: number): ng.IHttpPromise<Array<ISkills>>;
        deleteSkills (id: number, idSkills: number): ng.IHttpPromise<ISkills>;
        saveSkills(id: number, skill: ISkills): ng.IHttpPromise<ISkills>;
        getSkillsByName (skillPart: string): ng.IHttpPromise<Array<ISkillsFindByName>>;
        getSkillsByDescription (skillDesc: string): ng.IHttpPromise<Array<ISkillsFindByDesc>>;
    }

    export class SkillsService
        implements ISkillsService {

        // @ngInject
        constructor(private ConfigService: employees.IConfigService,
                    private $resource: ng.resource.IResourceService,
                    private $q: ng.IQService) {

        }

        public getSkills (id: number): ng.IHttpPromise<Array<ISkills>> {
            return this.$resource(`${this.ConfigService.getHost()}/skill/:id`, {
                id: id,
            }, {
                'query': {
                    method: 'GET',
                    isArray: true
                }
            }).query({}).$promise

        };

        public getSkillsByName (skillPart: string): ng.IHttpPromise<Array<ISkillsFindByName>> {
            return this.$resource(`${this.ConfigService.getHost()}/skill/dict/:skillPart`, {
                skillPart: skillPart,
            }, {
                'query': {
                    method: 'GET',
                    isArray: true
                }
            }).query({}).$promise

        };

        public getSkillsByDescription (skillDesc: string): ng.IHttpPromise<Array<ISkillsFindByDesc>> {
            return this.$resource(`${this.ConfigService.getHost()}/skill/dict/desc/:skillDesc`, {
                skillDesc: skillDesc,
            }, {
                'query': {
                    method: 'GET',
                    isArray: true
                }
            }).query({}).$promise

        };

        public deleteSkills (id: number, idSkills: number): ng.IHttpPromise<ISkills> {
            return this.$resource(`${this.ConfigService.getHost()}/skill/:id/delete/:idSkills`, {
                id: id,
                idSkills: idSkills,
            }, {
                'query': {
                    method: 'DELETE'
                }
            }).query({}).$promise

        };

        public saveSkills(id: number, skill: ISkills): ng.IHttpPromise<ISkills> {
            return this.$resource(`${this.ConfigService.getHost()}/skill/:id`, {
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
