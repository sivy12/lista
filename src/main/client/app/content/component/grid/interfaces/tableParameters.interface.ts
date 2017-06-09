/// <reference path="../../../app.module.ts" />

module employees {

  export interface TableParametersDTO extends BaseDTO {
    actorType?: EActorType;
    tableState?: string;
    filterModel?: string;
    sortModel?: string;
  }
}