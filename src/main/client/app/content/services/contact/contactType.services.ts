/// <reference path="../../app.module.ts" />

module employees {
    'use strict';

    export interface IContactTypeService {
        getContacts (id: number): ng.IHttpPromise<Array<IContact>>;
        deleteContacts (id: number, idContact: number): ng.IHttpPromise<IContact>;
        saveContact(id: number, contact: IContact): ng.IHttpPromise<IContact>;
        getContactsType (): ng.IHttpPromise<IContactArrayBase<IContactType>>;
    }
    /*obiekt*/

    export class ContactTypeService
        implements IContactTypeService {


        // @ngInject
        constructor(private ConfigService: employees.IConfigService,
                    private $resource: ng.resource.IResourceService,
                    private $q: ng.IQService) {

        }

        /*jeżeli biorę tablice musze ją zadeklarować*/
        public getContacts (id: number): ng.IHttpPromise<Array<IContact>> {
            return this.$resource(`${this.ConfigService.getHost()}/employee/:id/contacts`, {
                id: id,
            }, {
                'query': {
                    method: 'GET',
                    isArray: true
                }
            }).query({}).$promise

        };
        public getContactsType (): ng.IHttpPromise<IContactArrayBase<IContactType>> {
            return this.$resource(`${this.ConfigService.getHost()}/employee/contacts`, {
            }, {
                'query': {
                    method: 'GET'
                }
            }).query({}).$promise

        };

        public deleteContacts (id: number, idContact: number): ng.IHttpPromise<IContact> {
            return this.$resource(`${this.ConfigService.getHost()}/employee/:id/contacts/:idContact`, {
                id: id,
                idContact: idContact,
            }, {
                'query': {
                    method: 'DELETE'
                }
            }).query({}).$promise

        };

        public saveContact(id: number, contact: IContact): ng.IHttpPromise<IContact> {
            return this.$resource(`${this.ConfigService.getHost()}/employee/:id/contacts`, {
                id: id,
            }, {
                'query': {
                    method: 'POST'
                }
            }).query(contact).$promise;
        };


    }

    angular.module('employees').service('ContactTypeService', ContactTypeService);
}
