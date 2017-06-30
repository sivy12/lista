/// <reference path="../../app.module.ts" />

module employees {
    'use strict';

    export interface IProjectsService {
        getProjects (id: number): ng.IHttpPromise<Array<IProjects>>;
        // deleteSkills (id: number, idSkills: number): ng.IHttpPromise<ISkills>;
        // saveSkills(id: number, skill: ISkills): ng.IHttpPromise<ISkills>;
        // getSkillsByName (skillPart: string): ng.IHttpPromise<Array<ISkillsFindByName>>;
        // getSkillsByDescription (skillDesc: string): ng.IHttpPromise<Array<ISkillsFindByDesc>>;
    }

    export class ProjectsService
        implements IProjectsService {

        // @ngInject
        constructor(private ConfigService: employees.IConfigService,
                    private $resource: ng.resource.IResourceService,
                    private $q: ng.IQService) {

        }

        public getProjects (id: number): ng.IHttpPromise<Array<IProjects>> {
            return this.$resource(`${this.ConfigService.getHost()}/employee/:id/projects`, {
                id: id,
            }, {
                'query': {
                    method: 'GET',
                    isArray: true
                }
            }).query({}).$promise

        };
        //
        // public getSkillsByName (skillPart: string): ng.IHttpPromise<Array<ISkillsFindByName>> {
        //     return this.$resource(`${this.ConfigService.getHost()}/employee/skill/dict/:skillPart`, {
        //         skillPart: skillPart,
        //     }, {
        //         'query': {
        //             method: 'GET',
        //             isArray: true
        //         }
        //     }).query({}).$promise
        //
        // };
        //
        // public getSkillsByDescription (skillDesc: string): ng.IHttpPromise<Array<ISkillsFindByDesc>> {
        //     return this.$resource(`${this.ConfigService.getHost()}/employee/skill/dict/desc/:skillDesc`, {
        //         skillDesc: skillDesc,
        //     }, {
        //         'query': {
        //             method: 'GET',
        //             isArray: true
        //         }
        //     }).query({}).$promise
        //
        // };
        //
        // public deleteSkills (id: number, idSkills: number): ng.IHttpPromise<ISkills> {
        //     return this.$resource(`${this.ConfigService.getHost()}/employee/skill/:id/delete/:idSkills`, {
        //         id: id,
        //         idSkills: idSkills,
        //     }, {
        //         'query': {
        //             method: 'DELETE'
        //         }
        //     }).query({}).$promise
        //
        // };
        //
        // public saveSkills(id: number, skill: ISkills): ng.IHttpPromise<ISkills> {
        //     return this.$resource(`${this.ConfigService.getHost()}/employee/skill/:id`, {
        //         id: id,
        //     }, {
        //         'query': {
        //             method: 'POST'
        //         }
        //     }).query(skill).$promise;
        // };

    }

    angular.module('employees').service('ProjectsService', ProjectsService);
}
