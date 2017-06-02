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


        // @ngInject
        constructor(private EmployeeBackService: IEmployeeBackService,
                    private $stateParams: ActorsStateParams
                    //private JQueryUtilsService: IJQueryUtilsService,
                    //private $translate: ITranslateService,
        ) {
            this.init(this.newContact);

        }

        private init(newContact: boolean) {
            if (newContact == true) {
                this.EmployeeBackService.getContacts(this.employeeId).then(this.getContactCallBack);
                this.newContact = false;
            }
        }

        /*jeżeli przyjmuje tablice musze ja zadeklarowac w servisie oraz res oznacza to ze bierze całą tablicę*/
        private getContactCallBack = (res: Array<IContact>) => {
            this.details = res;
        };


        private deleteContactId(contactId: number) {
            this.EmployeeBackService.deleteContacts(this.employeeId, contactId).then(this.contactDeleteCallBack);

        };


        private contactDeleteCallBack = (res: IEmployee) => {
            this.newContact = true;
            this.init(this.newContact);
        };

        /*save*/

        private saveContact = () => {
            if (this.contact != null) {
                this.EmployeeBackService.saveContact(this.employeeId, this.contact).then(this.saveContactCallBack);
            } else {
                // this.formContainerVisible = false; moge wstecz kontaktow zrobić na 1 guziku zrobic
            }
        };

        private saveContactCallBack = (response) => {
            this.formContainerVisible = false;
            this.newContact = true;
            this.init(this.newContact);
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
