/// <reference path="../../typings/index.d.ts" />
/// <reference path="../../custom_typings/angular-translate/angular-translate.d.ts" />
/// <reference path="../../custom_typings/angular-cookies/angular-cookies.d.ts" />
/// <reference path="../../custom_typings/notifyjs/jquery.notifyjs.d.ts" />
/// <reference path="../../custom_typings/ng-file-upload/ng-file-upload.d.ts" />
/// <reference path="main/config.service.ts" />

/// <reference path="types/realizationTypes.type.ts" />
/// <reference path="types/orderTypes.type.ts" />

/// <reference path="enums/actorType.enum.ts" />
/// <reference path="enums/dictionaryTypes.enum.ts" />
/// <reference path="enums/permission.enum.ts" />
/// <reference path="enums/dropdownType.enum.ts" />

/// <reference path="interfaces/array.d.ts" />
/// <reference path="interfaces/angular-block-ui.d.ts" />
/// <reference path="interfaces/pageResponseArgs.interfaces.ts" />
/// <reference path="interfaces/actorEditAccessRequest.interfaces.ts" />
/// <reference path="interfaces/actorsStateParams.interfaces.ts" />
/// <reference path="interfaces/base.interface.ts" />
/// <reference path="interfaces/config.interface.ts" />
/// <reference path="interfaces/dataResponse.interface.ts" />
/// <reference path="interfaces/dictionary.interface.ts" />
/// <reference path="interfaces/entry.interface.ts" />
/// <reference path="interfaces/pageResponse.interface.ts" />
/// <reference path="interfaces/pageResponseArgs.interfaces.ts" />
/// <reference path="interfaces/token.interface.ts" />

/// <reference path="../../app/content/services/errors/error.service.ts" />
/// <reference path="../../app/content/services/data.service.ts" />
/// <reference path="../../app/content/utils/jquery.utils.service.ts" />
/// <reference path="../../app/content/services/auth/auth.service.ts" />
/// <reference path="utils/modal.utils.service.ts" />

module employees {

  'use strict';

  declare let agGrid: any;
  agGrid.initialiseAgGridWithAngular1(angular);
  angular.module('employees', [
    'config',
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ui.router',
    'ngMaterial',
    'ngStorage',
    'blockUI',
    'ui.utils',
    'rzModule',
    'ui.bootstrap',
    'ngFileUpload',
    'ngTagsInput',
    'ngFileSaver',
    'ui.mask',
    'pascalprecht.translate',
    'LocalStorageModule',
    'angularMoment',
    'agGrid'
  ]);
}
module employees {

  'use strict';

  declare let agGrid: any;
  agGrid.initialiseAgGridWithAngular1(angular);
  angular.module('employees', [
    'config',
    'ngAnimate',
    'ngAria',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ui.router',
    'ngMaterial',
    'ngStorage',
    'blockUI',
    'ui.utils',
    'rzModule',
    'ui.bootstrap',
    'ngFileUpload',
    'ngTagsInput',
    'ngFileSaver',
    'ui.mask',
    'pascalprecht.translate',
    'LocalStorageModule',
    'angularMoment',
    'agGrid'
  ]);
}
