/**
 * Created by Damian on 11.05.2017.
 */
/// <reference path="../../app.module.ts" />

module employees {
    'use strict';

    export class ProjectCtrl {

        user: IUser = {};
        employeeId = this.$stateParams.id;
        projectsArray: Array<IProjects>;
        projectsArrayMaintenance: Array<IProjects> = [];
        projectsArrayConceptual: Array<IProjects> = [];
        projectsArrayDevelop: Array<IProjects> = [];
        projectsArrayRollout: Array<IProjects> = [];
        projectsArrayClosure: Array<IProjects> = [];
        formContainerVisible = false;

        // @ngInject
        constructor(private $translatePartialLoader: ng.translate.ITranslatePartialLoaderService,
                    private ProjectsService: IProjectsService,
                    private $stateParams: ActorsStateParams) {
            this.$translatePartialLoader.addPart('project');
            this.$translatePartialLoader.addPart('icons');
            this.init();

        }

        private init() {
            this.ProjectsService.getProjects(this.employeeId).then(this.getProjectsCallBack);
        };

        private getProjectsCallBack = (res: Array<IProjects>) => {
            this.projectsArray = res;

            for (var i = 0; i < this.projectsArray.length; i++){
                if (this.projectsArray[i].status == "MAINTENANCE"){
                    this.projectsArrayMaintenance.push(this.projectsArray[i]);
                }
                if (this.projectsArray[i].status == "CONCEPTUAL_FRAMEWORK"){
                    this.projectsArrayConceptual.push(this.projectsArray[i]);
                }
                if (this.projectsArray[i].status == "DEVELOPMENT"){
                    this.projectsArrayDevelop.push(this.projectsArray[i]);
                }
                if (this.projectsArray[i].status == "ROLLOUT"){
                    this.projectsArrayRollout.push(this.projectsArray[i]);
                }
                if (this.projectsArray[i].status == "CLOSURE"){
                    this.projectsArrayClosure.push(this.projectsArray[i]);
                }
            }

        };


        private formContainer() {
            this.formContainerVisible = !this.formContainerVisible;
        };

    }

    angular.module('employees').controller('ProjectCtrl', ProjectCtrl);
}
