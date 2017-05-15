/// <reference path="../../app.module.ts" />

module employees {
  'use strict';

  const KEY = 'version';

  export interface ICookieManager {
    appLoaded(): void;
  }

  class CookieManager implements ICookieManager {

    // @ngInject
    constructor(private ENV: ENV,
                private $log: ng.ILogService,
                private $cookies: ng.cookies.ICookiesService,
                private $state: ng.ui.IStateService) {
    }

    public appLoaded() {
      const cookieVersionString = this.$cookies.get(KEY);
      const buildVersionString = this.buildString();
      if (!cookieVersionString) {
        this.$cookies.put(KEY, buildVersionString);
        return;
      }
      if (buildVersionString != cookieVersionString) {
        this.$log.info('cookie version do not match', buildVersionString, '!=', cookieVersionString);
        //clear cookies
        this.clearCookies();
        //reload app
        this.$state.reload();
      }
    }

    private buildString() {
      return `${this.ENV.version}.${this.ENV.buildNumber}`;
    }

    private clearCookies() {
      this.$cookies.remove(KEY);
      this.$cookies.remove('authToken');
    }
  }

  angular.module('employees').service('CookieManager', CookieManager);
}
