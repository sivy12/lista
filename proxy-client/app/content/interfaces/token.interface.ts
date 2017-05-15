/**
 * Created by jakub on 28.03.17.
 */
/// <reference path="../app.module.ts" />

module employees {
  export interface IToken {
    username: string,
    token: string,
    temp: boolean,
    id: number,
    name: string,
    hasMultipleAccounts: boolean
  }
}