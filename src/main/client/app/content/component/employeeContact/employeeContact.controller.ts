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
        private newContact: boolean = true;
        contactType: IContactType;


        // @ngInject
        constructor(private $translatePartialLoader: ng.translate.ITranslatePartialLoaderService,
                    private EmployeeBackService: IEmployeeBackService,
                    private $stateParams: ActorsStateParams
                    //private JQueryUtilsService: IJQueryUtilsService,
                    //private $translate: ITranslateService,
        ) {
            this.init();
            this.$translatePartialLoader.addPart('contact');
            this.$translatePartialLoader.addPart('icons');


        }

        private init() {
                this.EmployeeBackService.getContacts(this.employeeId).then(this.getContactCallBack);
                this.EmployeeBackService.getContactsType().then(this.getContactsTypeCallBack);
        }

        /*jeżeli przyjmuje tablice musze ja zadeklarowac w servisie oraz res oznacza to ze bierze całą tablicę*/
        private getContactCallBack = (res: Array<IContact>) => {
            this.details = res;

        };

        private getContactsTypeCallBack = (res: IContactType) => {
            this.contactType = res;

            console.log(res);
        };


        private deleteContactId(contactId: number) {
            this.EmployeeBackService.deleteContacts(this.employeeId, contactId).then(this.contactDeleteCallBack);

        };


        private contactDeleteCallBack = (res: IEmployee) => {
            this.newContact = true;
            this.init();
        };

        /*save*/

        private saveContact = () => {
            if (this.contact != null) {
                this.EmployeeBackService.saveContact(this.employeeId, this.contact).then(this.saveContactCallBack);
            }
        };

        private saveContactCallBack = (response) => {
            this.formContainerVisible = false;
            this.newContact = true;
            this.init();
            this.contact.contactValue = defaultStatus;
            this.contact.contactType = defaultStatus;
        };

        private back() {
            this.formContainerVisible = false;

        }

        formContainerVisible = false;

        private formcontainer() {

            this.formContainerVisible = !this.formContainerVisible;
        };


    }

    angular.module('employees').controller('EmployeeContactCtrl', EmployeeContactCtrl);
}
