/// <reference path="../../app.module.ts" />

module employees {
  'use strict';

  export interface IUsersService {
    getUsers(): ng.IHttpPromise<Array<ISlimUser>>;
    getUsersProfiles(): ng.IHttpPromise<Array<ISlimUser>>;
    saveUserProfile(user: ISlimUser): ng.IHttpPromise<ISlimUser>;
    changeUserPrivileges(userId: number, permission: EPermission, value: boolean): ng.IHttpPromise<ISlimUser>;
  }

  export class UsersService implements IUsersService {

    // @ngInject
    constructor(private ConfigService: IConfigService,
                private $resource: ng.resource.IResourceService) {

    }

    public getUsers = (): ng.IHttpPromise<Array<ISlimUser>> => {
      return this.$resource(`${this.ConfigService.getHost()}/api/users/light`, {}, {
        'query': {
          method: 'GET',
          isArray: true
        }
      }).query().$promise
    };

    public getUsersProfiles = (): ng.IHttpPromise<Array<ISlimUser>> => {
      return this.$resource(`${this.ConfigService.getHost()}/api/users/profile`, {}, {
        'query': {
          method: 'GET',
          isArray: true
        }
      }).query().$promise
    };

    public saveUserProfile(user: ISlimUser): ng.IHttpPromise<ISlimUser> {
      return this.$resource(`${this.ConfigService.getHost()}/api/users/profile`, {}, {
        'query': {
          method: 'POST'
        }
      }).query(user).$promise;
    }

    public changeUserPrivileges(userId: number, permission: EPermission, value: boolean): ng.IHttpPromise<Array<string>> {
      return this.$resource(`${this.ConfigService.getHost()}/api/users/privilege`, {}, {
        'query': {
          method: 'POST',
          isArray: true
        }
      }).query({
        id: userId,
        permission,
        value
      }).$promise;
    }
  }

  angular.module('employees').service('UsersService', employees.UsersService);
}
