/**
 * Created by Damian on 11.05.2017.
 */
/// <reference path="../../app.module.ts" />

module employees {
    'use strict';

    export class EmployeeContactCtrl {

        details: Array<IContact>;
        employeeId = this.$stateParams.id;
        contact: IContact;
        contactType: IContactArrayBase<IContactType>;
        formContainerVisible = false;


        // @ngInject
        constructor(private $translatePartialLoader: ng.translate.ITranslatePartialLoaderService,
                    private EmployeeBackService: IEmployeeBackService,
                    private ContactTypeService: IContactTypeService,
                    private $stateParams: ActorsStateParams
        ) {
            this.init();
            this.$translatePartialLoader.addPart('contact');
            this.$translatePartialLoader.addPart('icons');
        }

        private init() {
                this.ContactTypeService.getContacts(this.employeeId).then(this.getContactCallBack);
                this.ContactTypeService.getContactsType().then(this.getContactsTypeCallBack);
        }

        private getContactCallBack = (res: Array<IContact>) => {
            this.details = res;
        };

        private getContactsTypeCallBack = (res: IContactArrayBase<IContactType>) => {
            this.contactType = res;
        };

        private deleteContactId(contactId: number) {
            this.ContactTypeService.deleteContacts(this.employeeId, contactId).then(this.contactDeleteCallBack);
        };

        private contactDeleteCallBack = (res: IEmployee) => {
            this.init();
        };

        private saveContact = () => {
                this.ContactTypeService.saveContact(this.employeeId, this.contact).then(this.saveContactCallBack);
        };

        private saveContactCallBack = (response) => {
            this.formContainerVisible = false;
            this.init();
            this.contact.contactValue = defaultStatus;
            this.contact.contactType = defaultStatus;
        };

        private back() {
            this.formContainerVisible = false;
        }

        private formContainer() {
            this.formContainerVisible = !this.formContainerVisible;
        };


    }

    angular.module('employees').controller('EmployeeContactCtrl', EmployeeContactCtrl);
}
