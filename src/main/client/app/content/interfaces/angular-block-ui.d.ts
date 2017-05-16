declare namespace angular.blockUI {

  export interface Options {
    message?: string;
  }

  export type MessageOrOptions = string|Options;
  type DoneCallback = () => any;

  export interface ILookupService {
    get(id: string): IBlockUIService;
  }

  export interface IBlockUIService {
    start(messageOrOptions?: MessageOrOptions): void;
    stop(): void;
    reset(): void;
    done(callback: DoneCallback): void;
    isBlocking(): boolean;
    instances: ILookupService;
  }

  type HttpMethod = 'GET' | 'POST' | 'DELETE' | 'PUT' | 'OPTIONS' | 'HEAD' | 'CONNECT' | 'TRACE';

  export interface IRequestFilterConfig {
    url: string;
    method: HttpMethod;
  }

  type RequestFilterCallback = (config: IRequestFilterConfig) => any;

  export interface IBlockUIConfig {
    message?: String;
    delay?: number;
    template?: string;
    templateUrl?: string;
    autoBlock?: boolean;
    resetOnException?: boolean;
    requestFilter?: RequestFilterCallback;
    autoInjectBodyBlock?: boolean;
    cssClass?: string;
    blockBrowserNavigation?: boolean;
  }
}
