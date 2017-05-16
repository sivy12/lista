/**
 * Created by jakub on 14.03.17.
 */
/// <reference path="../../app.module.ts" />
module employees {
  export interface IUserProfile extends BaseDTO {
    email?: string;
    phone?: string;
    firstName?: string;
    lastName?: string;
    permissions?: Array<EPermission>;
    surname?: string;
    department?: string;
    location?: string;
  }
}