///<reference path="../app.module.ts"/>


//keep in sync with backend enum ERolePermission
module employees {

  export enum EPermission {
    ADMIN = <any>"ADMIN",
    LENDER = <any>"LENDER",
    SUPERVISOR = <any>"SUPERVISOR"
  }
}
