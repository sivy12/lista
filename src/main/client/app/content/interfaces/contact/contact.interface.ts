/// <reference path="../../app.module.ts" />

module employees {
    'use strict';

    export interface IContact {
        id: number;
        contactType: string;
        contactValue: string;
        employee: string;
    }

}
