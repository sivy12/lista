/// <reference path="../app.module.ts" />

module employees {
  'use strict';

  //FIXME define interfaces to use instead of using any (also this seems to have duplicate)
  export interface IDataService {
    setCurrentUser(userAccount: IUser): void;
    getCurrentUser(): IUser;



    setAuthToken(token: IToken): void;
    getAuthToken(): IToken;
    setCurrentPageTitle(currentPageTitle: string): void;
    getCurrentPageTitle(): string;
    setPressedKey(key: number): void;
    getPressedKey(): number;
  }

  export class DataService implements IDataService {

    private user: IUser;
    private authToken: IToken;
    private currentPageTitle: string;
    private pressedKey: number = null;

    // @ngInject
    constructor(private ConfigService: IConfigService) {

    }

    public setCurrentUser(user: IUser) {
      this.user = user;
    }

    public getCurrentUser(): IUser {
      return this.user;
    };

    public setAuthToken(token: IToken) {
      this.authToken = token;
    }

    public getAuthToken = (): IToken => {
      return this.authToken;
    };

    public setCurrentPageTitle(currentPageTitle: string) {
      this.currentPageTitle = currentPageTitle;
    }

    public getCurrentPageTitle = (): string => {
      return this.currentPageTitle;
    };

    public setPressedKey(pressed: number) {
      this.pressedKey = pressed;
    }

    public getPressedKey = (): number => {
      return this.pressedKey;
    };

  }


  angular.module('employees').service('DataService', employees.DataService);
}
