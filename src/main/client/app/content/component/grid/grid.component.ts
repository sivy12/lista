/// <reference path="../../app.module.ts" />
module employees {
  'use strict';
  import IComponentOptions = angular.IComponentOptions;
  import IComponentController = angular.IComponentController;

  const grid: IComponentOptions = {
    bindings: {
      actorType: '<',
      currentActor: '<',
      onUpdateActor: '&',
      onChangeViewType: '&',
      onRowDoubleClicked: '&',
      addEvent: '&',
      onlyGrid: '<',
      itemsPerPage: '<',
      update: '<',
      updateSelected: '<',
      itemForUpdate: '<',
      parentId: '<',
      onDeleteList: '&'
    },
    controller: GridListCtrl,
    controllerAs: 'ctrl',
    templateUrl: 'content/component/grid/grid.component.tpl.html',
  };

  angular.module('employees').component('gridList', grid);
}
