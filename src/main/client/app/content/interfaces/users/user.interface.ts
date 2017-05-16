/// <reference path="../../app.module.ts" />
module employees {
  export interface IUser extends ISlimUser {
    loginId?: string;
    password?: string;
    isActive?: boolean;
    showLogin?: boolean;
    displayName?: string;
  }
}