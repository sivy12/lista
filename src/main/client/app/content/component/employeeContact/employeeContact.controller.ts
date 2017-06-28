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


        // @ngInject
        constructor(private $translatePartialLoader: ng.translate.ITranslatePartialLoaderService,
                    private EmployeeBackService: IEmployeeBackService,
                    private ContactTypeService: IContactTypeService,
                    private $stateParams: ActorsStateParams
                    //private JQueryUtilsService: IJQueryUtilsService,
                    //private $translate: ITranslateService,
        ) {
            this.init();
            this.$translatePartialLoader.addPart('contact');
            this.$translatePartialLoader.addPart('icons');


        }

        private init() {
                this.ContactTypeService.getContacts(this.employeeId).then(this.getContactCallBack);
                this.ContactTypeService.getContactsType().then(this.getContactsTypeCallBack);
        }

        /*jeżeli przyjmuje tablice musze ja zadeklarowac w servisie oraz res oznacza to ze bierze całą tablicę*/
        private getContactCallBack = (res: Array<IContact>) => {
            this.details = res;

        };

        private getContactsTypeCallBack = (res: IContactArrayBase<IContactType>) => {
            this.contactType = res;

            console.log(res);
        };


        private deleteContactId(contactId: number) {
            this.ContactTypeService.deleteContacts(this.employeeId, contactId).then(this.contactDeleteCallBack);

        };


        private contactDeleteCallBack = (res: IEmployee) => {
            this.init();
        };

        /*save*/

        private saveContact = () => {
            if (this.contact != null) {
                this.ContactTypeService.saveContact(this.employeeId, this.contact).then(this.saveContactCallBack);
            }
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

        formContainerVisible = false;

        private formContainer() {

            this.formContainerVisible = !this.formContainerVisible;
        };


    }

    angular.module('employees').controller('EmployeeContactCtrl', EmployeeContactCtrl);
}
