/**
 * Created by jakub on 28.03.17.
 */
/// <reference path="../app.module.ts" />

module employees {
  export interface PageResponse<T> {
    totalPages: number;
    totalElements: number;
    content: Array<T>;
    number: number;
    size: number;
    numberOfElements: number;
  }
}
