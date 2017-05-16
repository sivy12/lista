module employees {
  import ICacheObject = angular.ICacheObject;
  export interface ICacheTimeObject {
    cacheObject: ICacheObject;
    lastCache: Date;
  }
}