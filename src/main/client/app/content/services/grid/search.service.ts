/// <reference path="../../app.module.ts" />

module employees {
  'use strict';
  import IResourceArray = angular.resource.IResourceArray;
  import IPromise = angular.IPromise;
  import IResource = angular.resource.IResource;
  import IQuery = employees.IQuery;

  export interface ISearchService {

    createSearchModal(query: IQuery): ng.IPromise<IQuery>;
    closeSearchModal(result: IQuery);
    getEmployee(query: IQuery): ng.IHttpPromise<IPageResponseArgs<IEmployee>>;

  }

  export class SearchService implements ISearchService {

    private modal: ng.ui.bootstrap.IModalServiceInstance = null;

    // @ngInject
    constructor(private $resource: ng.resource.IResourceService,
                private ConfigService: IConfigService,
                private $uibModal: ng.ui.bootstrap.IModalService) {
    }



    public createSearchModal(query: IQuery): ng.IPromise<IQuery> {
      this.modal = this.$uibModal.open({
        templateUrl: 'content/modals/search/search.template.html',
        backdrop: 'static',
        controller: 'SearchModalController',
        controllerAs: 'searchModal',
        size: 'md',
        resolve: {
          query: query
        }
      });
      return this.modal.result;
    };

    public closeSearchModal(result: IQuery) {
      if (!angular.isUndefined(this.modal) && this.modal != null) {
        this.modal.close(result);
        this.modal = null;
      }
    }

    public getEmployee(query: IQuery): ng.IHttpPromise<IPageResponseArgs<IEmployee>>{
      return this.$resource(`${this.ConfigService.getHost()}/employee/?`, {}, {
        'query': {
          method: 'GET'
        }
      }).query({page:query.page,pageSize:query.size}).$promise

    };


  }
  angular.module('employees').service('SearchService', SearchService);
}
