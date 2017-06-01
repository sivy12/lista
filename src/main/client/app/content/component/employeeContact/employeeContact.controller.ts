/**
 * Created by Damian on 11.05.2017.
 */
/// <reference path="../../app.module.ts" />

module employees {
    'use strict';

    interface IContactDane{
        details:Array<IContact>
        employeeId: number;

    }


    export class EmployeeContactCtrl implements IContactDane{

        details: Array<IContact>;
        employeeId = this.$stateParams.id;
        contact: IContact;
        private newContact: boolean = true;
        private hideId: boolean = false;


        // @ngInject
        constructor(private EmployeeBackService: IEmployeeBackService,
                    private $stateParams: ActorsStateParams
                    //private JQueryUtilsService: IJQueryUtilsService,
                    //private $translate: ITranslateService,
                    ) {
            this.init(this.newContact);

        }

        private init(newContact: boolean) {
            if (newContact == true){
                this.EmployeeBackService.getContacts(this.employeeId).then(this.getContactCallBack);
                this.newContact = false;
            }
        }

        /*jeżeli przyjmuje tablice musze ja zadeklarowac w servisie oraz res oznacza to ze bierze całą tablicę*/
        private getContactCallBack =(res:Array<IContact>) =>{
            this.details = res;
        };


        public deleteContactId(contactId: number) {
            this.EmployeeBackService.deleteContacts(this.employeeId, contactId).then(this.contactDeleteCallBack);

        };


        private contactDeleteCallBack =(res:IEmployee) =>{
            //this.$state.go('access.userPage');
            this.newContact = true;
            this.init(this.newContact);
        };

        /*save*/

        public saveContact = ()=> {
                this.EmployeeBackService.saveContact(this.employeeId, this.contact).then(this.saveContactCallBack);
        };

        private saveContactCallBack = (response)=> {
            //this.JQueryUtilsService.showSuccessMessage(this.$translate.instant("userProfile.saveWithSuccess"));
            this.formContainerVisible = false;
            this.newContact = true;
            this.init(this.newContact);

        };




        formContainerVisible = false;
        public formcontainer() {

            this.formContainerVisible = !this.formContainerVisible;
        };



    }

    angular.module('employees').controller('EmployeeContactCtrl', EmployeeContactCtrl); /*nazwa kontrolera*/
}
