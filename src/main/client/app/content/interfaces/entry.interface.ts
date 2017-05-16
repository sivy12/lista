/**
 * Created by jakub on 28.03.17.
 */
/// <reference path="../app.module.ts" />

module employees {

  export interface IEntry extends BaseDTO {
    name?: string;
    validFrom?: Date;
    validTo?: Date;
    value?: string;
    defaultValue?: boolean;
    dictionaryId?: number;
    pictureId?: number;
    picturePath?: string;
    translatedName?: string;
    editable?: boolean;
    removable?: boolean;
  }
}

