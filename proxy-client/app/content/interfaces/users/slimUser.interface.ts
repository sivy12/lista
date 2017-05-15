/// <reference path="../../app.module.ts" />
module employees {
  export interface ISlimUser extends IUserProfile {
    displayName?: string;
    avatar?: string;
  }
}