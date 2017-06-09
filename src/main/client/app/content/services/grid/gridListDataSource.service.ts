/// <reference path="../../app.module.ts" />

module employees {
  'use strict';
  import ITranslateService = angular.translate.ITranslateService;

  export interface IGridListDataSource {
    getData(query: QueryDTO): ng.IPromise<IPageResponseArgs<BaseDTO>>;

    getColumns(): any;

    getAdvancedViewColumns(): any;

    getSimpleViewColumns(): any;
  }

  export const idColumn = {
    headerName: '#',
    field: '#',
    width: 50,
    cellRenderer(params){
      return Number(params.node.id) + 1;
    },
    suppressSorting: true,
    suppressFiltering: true,
    suppressSizeToFit: true
  };


  export abstract class AbstractGridListDataSource implements IGridListDataSource {

    constructor(protected $translate: ITranslateService,
                protected SearchService: ISearchService) {
    }

    public getData(query: QueryDTO, mainId?: number): ng.IPromise<IPageResponseArgs<BaseDTO>> {
      return null;
    }

    public getColumns() {
      return null;
    }

    public getAdvancedViewColumns() {
      return null;
    }

    public getSimpleViewColumns() {
      return null;
    }

    protected column(headerKey: string, field: string, width: number = 100) {
      // const suppressSorting = field.indexOf('.')!==-1;
      const suppressSorting = true;
      return {
        headerName: this.$translate.instant(headerKey),
        field,
        width,
        suppressSorting,
        suppressSizeToFit: true,
      }
    }
  }
}