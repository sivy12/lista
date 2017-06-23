/**
 * Created by Damian on 11.05.2017.
 */
/// <reference path="../../app.module.ts" />

module employees {
    'use strict';

    export class SkillCtrl {

        employeeId = this.$stateParams.id;
        skillsArray: Array<ISkills>;


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
