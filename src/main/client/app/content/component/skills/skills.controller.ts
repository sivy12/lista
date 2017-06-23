/**
 * Created by Damian on 11.05.2017.
 */
/// <reference path="../../app.module.ts" />

module employees {
    'use strict';

    export class SkillCtrl {

        employeeId = this.$stateParams.id;
        skillsArray: Array<ISkills>;
        skillsByName: Array<ISkillsFindByName> = [];
        addNewSkill: ISkills;



        // @ngInject
        constructor(private $translatePartialLoader: ng.translate.ITranslatePartialLoaderService,
                    private SkillsService: ISkillsService,
                    private $stateParams: ActorsStateParams

        ) {
            this.init();
            this.$translatePartialLoader.addPart('icons');
            this.$translatePartialLoader.addPart('skills');
        }
        private init() {
            this.SkillsService.getSkills(this.employeeId).then(this.getSkillsCallBack);
        }

        private getSkillsCallBack = (res: Array<ISkills>) => {
            this.skillsArray = res;
        };

        private deleteSkillsId(skillId: number) {
            this.SkillsService.deleteSkills(this.employeeId, skillId).then(this.deleteSkillsCallBack);

        };

        private deleteSkillsCallBack = (res: IEmployee) => {
            this.init();
        };

        private saveSkills = () => {
            if (this.addNewSkill != null) {
                this.SkillsService.saveSkills(this.employeeId, this.addNewSkill).then(this.saveSkillCallBack);
            }
        };

        private saveSkillCallBack = (response) => {
            this.formContainerVisible = false;
            this.init();
            this.addNewSkill.skillName = defaultStatus;
            this.addNewSkill.description = defaultStatus;
        };

        private variableFindSkillByName: string;

        private registerKeyPress(){
            this.SkillsService.getSkillsByName(this.addNewSkill.skillName).then(this.getSkillsByNameCallBack);
            console.log(this.variableFindSkillByName);
        }

        private getSkillsByNameCallBack = (res: Array<ISkillsFindByName>) => {
            this.skillsByName = res;
        };

        private back() {
            this.formContainerVisible = false;

        }

        formContainerVisible = false;

        private formcontainer() {

            this.formContainerVisible = !this.formContainerVisible;
        };

    }

    angular.module('employees').controller('SkillCtrl', SkillCtrl);
}
