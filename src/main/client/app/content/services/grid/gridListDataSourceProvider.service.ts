/// <reference path="../../app.module.ts" />
module employees {
  'use strict';

  export class GridListDataSourceProvider {

    private dataSources: {[key: string]: IGridListDataSource} = {};

    constructor(EmployeeDataSourceService: EmployeeDataSourceService) {
      this.add(EActorType.EMPLOYEE, EmployeeDataSourceService);
    }

    public add(key: EActorType, service: IGridListDataSource) {
      if (angular.isUndefined(this.dataSources[key])) {
        this.dataSources[key] = service;
      }
    }

    public get(key: EActorType): IGridListDataSource {
      return this.dataSources[key];
    }
  }

  angular.module('employees').service("GridListDataSourceProvider", GridListDataSourceProvider);
}