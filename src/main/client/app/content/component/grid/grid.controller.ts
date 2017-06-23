/// <reference path="../../app.module.ts" />

module employees {
  'use strict';

  import IComponentController = angular.IComponentController;
  import ICompileService = angular.ICompileService;
  import ISCEService = angular.ISCEService;
  import IScope = angular.IScope;

  export class GridListCtrl {

    public currentActor: any;
    public onUpdateActor: ($event: {}) => void;
    public onChangeViewType: ($event: {}) => void;
    public onRowDoubleClicked: ($event: {}) => void;
    public addEvent: ($event: {}) => void;
    private selectedTableType: ETableType = null;
    public tableTypes = ETableType;
    public columnDefs: any[];
    public gridOptions: any;
    public actorType: EActorType;
    public actorTypes = EActorType;
    public onlyGrid: boolean;
    private dataSource: any;
    private itemsPerPage;
    private currentTableParameters: TableParametersDTO;
    public menuColumns = [];
    public update: boolean;
    public updateSelected: boolean;
    public itemForUpdate: any;
    public sideNavId: string;
    public totalElements: number = 0;
    private parentId: number;
    public query: IQuery;
    private onDeleteEmployee: boolean;

    constructor(private $scope: ng.IScope,
                private $stateParams: ActorsStateParams,
                private GridListDataSourceProvider: GridListDataSourceProvider,
                private $q: ng.IQService,
                private $timeout: ng.ITimeoutService,
                private SearchService: ISearchService) {
      this.initEvents();
      this.initDataSource();
      this.initAgGridOptions();
      this.initActors();
    }

    private initActors() {

    }


    private initEvents() {
      this.$scope.$watch(() => this.update, (newValue: boolean, oldValue: boolean) => {
        if (angular.isDefined(this.update) && this.update != null && this.update) {
          if (this.gridOptions.api.getModel().getVirtualRowCount() > 0) {
            this.gridOptions.api.getSelectedNodes().forEach((node) => {
              node.setSelected(false);
            });
            this.gridOptions.api.refreshVirtualPageCache();
          } else {
            this.setRowData();
          }
        }
      });
      this.$scope.$watch(() => this.updateSelected, (newValue: any, oldValue: any) => {
        if (angular.isDefined(this.updateSelected) && this.updateSelected != null && this.updateSelected) {
          if (this.gridOptions.api.getModel().getVirtualRowCount() > 0 &&
              this.gridOptions.api.getSelectedNodes().length == 1) {
            this.gridOptions.api.getSelectedNodes().forEach((node) => {
              node.data = this.itemForUpdate;
              this.gridOptions.api.refreshVirtualPageCache();
            });
          }
        }
      });
    }

    private initDataSource() {
      this.dataSource = {
        rowCount: null,
        getRows: (params) => {
          this.loadRows(params);
        }
      };
    }

    private loadRows(params: any) {
      const pageNumber = this.evalStartNumber(params);
      let query: QueryDTO = {
        page: pageNumber,
        size: this.itemsPerPage
      };
        query= Object.assign(query,this.query);
      this.getDataSource().getData(query).then((response: IPageResponseArgs<BaseDTO>) => {
        this.totalElements = response.totalElements;
        this.queryPromise(params, response);
      });

    }

    private queryPromise(params: any, response: IPageResponseArgs<BaseDTO>) {
      let defer = this.$q.defer();
      defer.resolve(params.successCallback(response.content, response.totalElements));
      defer.promise.then(() => {
        this.gridOptions.api.refreshView();
        if (!this.onlyGrid) {
          this.highlightSelectedActor();
        }
      });
    }

    private evalStartNumber(params: any): number {
      return (angular.isUndefined(params.startRow) || params.startRow == 0) ?
          params.startRow : params.startRow / this.itemsPerPage;
    }

    public initAgGridOptions() {
      this.columnDefs = this.getDataSource().getColumns();
      this.gridOptions = {
        enableColResize: true,
        debug: true,
        rowSelection: 'multiple',
        rowDeselection: true,
        columnDefs: this.columnDefs,
        rowModelType: 'virtual',
        onRowClicked: this.highlightActor,
        onRowDoubleClicked: this.setDoubleClickedEvent,
        enableServerSideSorting: true,
        paginationPageSize: this.itemsPerPage,
        angularCompileRows: true,
        rowHeight: 52,
        maxPagesInCache: 5,
        enableSorting: false,
        onGridReady: () => {
          if (!this.onlyGrid) {
            this.setTableType(ETableType.SIMPLE);
          } else {
            this.setTableType(ETableType.ADVANCED);
          }
          this.setRowData();
        },


        onGridSizeChanged: () => {
          this.sizeColumnsToFit();
        }
      };
    }

    private sizeColumnsToFit() {
      if (this.selectedTableType == ETableType.SIMPLE) {
        setTimeout(() => {
          this.gridOptions.api.sizeColumnsToFit();
        }, 500);
      }
    }


    public $onInit() {
      console.log('Creating list component for ', this);
    }

    public $onDestroy() {
      console.log('Destroying list component', this);
      this.currentActor = null;
    }

    public changeActor(node: any) {
      this.currentActor = node.data;
      this.onUpdateActor({
        $event: {
          actor: node.data
        }
      });
    };

    private visibleColumns = null;

    public setTableType(type: ETableType): void {
      this.selectedTableType = type;
      this.onChangeViewType({
        $event: {
          viewType: type
        }
      });
      if (type === ETableType.ADVANCED) {
        this.gridOptions.columnApi.setColumnsVisible(this.visibleColumns, true);
        this.gridOptions.columnApi.setColumnsVisible(this.getDataSource().getSimpleViewColumns(), false);
      } else {
        this.visibleColumns = this.gridOptions.columnApi.getAllDisplayedColumns();
        this.gridOptions.columnApi.setColumnsVisible(this.visibleColumns, false);
        this.gridOptions.columnApi.setColumnsVisible(this.getDataSource().getSimpleViewColumns(), true);
      }
    };

    private setDoubleClickedEvent = (event) => {
      this.$timeout(() => {
        this.onRowDoubleClicked({
              $event: event
            }
        );
      });
    };

    public highlightActor = (event) => {
      this.changeActor(event.node);
    };

    private takeNewListOfEmployee = true;

    public setRowData() {
      if (this.takeNewListOfEmployee){
        this.gridOptions.api.setDatasource(this.dataSource);
        this.sizeColumnsToFit();
        this.takeNewListOfEmployee = false;

      }
    };

    public refresz(){
      this.takeNewListOfEmployee = true;
      this.setRowData();
    }




    public highlightSelectedActor(): void {
      this.gridOptions.api.forEachNode((node, index) => {
        if (angular.isDefined(node.data) && !node.selected) {
          if (angular.isDefined(this.$stateParams.id) && (<any>this.$stateParams.id) != '') {
            if (Number(node.data.id) === Number(this.$stateParams.id)) {
              this.selectActor(node);
            }
          } else if (index == 0) {
            this.selectActor(node);
          }
        }
      });
    };

    private selectActor(node) {
      this.changeActor(node);
      node.setSelected(true);
    }

    public runSearchModal() {
      this.SearchService.createSearchModal(this.query).then(this.openSearchModalCallBack);
    }


    private openSearchModalCallBack = (response: IQuery | IQuery) => {
      if (response != null) {
        this.query = response;
        this.setRowData();
      }
    };

    private getDataSource(): IGridListDataSource {
      console.log(this.actorType);
      return this.GridListDataSourceProvider.get(this.actorType);

    }


  }
}
