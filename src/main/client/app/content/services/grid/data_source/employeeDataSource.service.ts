/// <reference path="../../../app.module.ts" />

module employees {
  'use strict';
  import ITranslateService = angular.translate.ITranslateService;

  export class EmployeeDataSourceService extends AbstractGridListDataSource {

    public key: EmployeeDataSourceService;

    constructor($translate: ITranslateService,
                SearchService: ISearchService) {
      super($translate, SearchService);
    }

    public getColumns(): any {
      return [
        idColumn,
        this.column('juxtaposition.name', "orderNumber"),
        this.envelopeColumn()
      ];
    }

    private envelopeColumn() {
      return {
        headerName: "",
        template: '<list-element employee="data" ></list-element>',
        suppressSorting: true,
        suppressFiltering: true,
        suppressMenu: true,
        suppressResize: true,
        suppressToolPanel: true,
        suppressNavigable: true,
        field: 'envelope',
        suppressMovable: true
      }
    }

    public getAdvancedViewColumns() {
      return ['#'];
    }

    public getSimpleViewColumns() {
      return ['envelope'];
    }

    public getData(query: IQuery): ng.IPromise<IPageResponseArgs<BaseDTO>> {
      return this.SearchService.getEmployee(query);
    }
  }

  angular.module('employees').service("EmployeeDataSourceService", EmployeeDataSourceService);
}