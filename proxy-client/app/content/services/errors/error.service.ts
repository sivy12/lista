module employees.errors {

  import IPromise = angular.IPromise;
  export interface IFieldError {
    message?: string;
    code: string;
    field: string;
  }

  export interface IErrorListener {
    id: string;
    onError(error: string);
    clearError();
  }

  const control = {code: 'control', field: "errors.control"};
  const HAS_ERROR = 'input_error';
  const ERROR_LISTENER_ID_PREFIX = 'errList_';
  var lastId = 0;

  export class ErrorService {

    private errors: Array<IFieldError> = [control];
    private listeners: {[field: string]: Array<IErrorListener>} = {};

    constructor(private $translatePartialLoader: ng.translate.ITranslatePartialLoaderService,
                private $translate: ng.translate.ITranslateService) {
      this.$translatePartialLoader.addPart('errors');
    }

    public setErrors(errors: Array<IFieldError>) {
      console.log('clearing up errors');
      this.errors = [];
      this.clearAllErrors();
      console.log('adding errors', errors);
      this.errors.push(control, ...errors);
      this.errors.forEach((value) => {
        this.notifyAboutError(value);
      });
    }

    public addError(field: string, code: string) {
      console.log('adding error', field, code);
      this.errors.push({code, field});
      this.errors.forEach((value) => {
        if (value.field === field) {
          this.notifyAboutError(value);
        }
      });
    }

    public getErrorsForField(field: string): Array<IPromise<string>> {
      return this.errors.filter((value)=> {
        return value.field === field;
      }).map((value)=> {
        return this.$translate(value.code);
      });
    }

    public addErrorListener(field: string, listener: IErrorListener) {
      let listeners = this.listeners[field];
      if (!listeners) {
        listeners = [];
        this.listeners[field] = listeners;
      }
      listeners.push(listener);
    }

    public removeErrorListener(field: string, listener: IErrorListener) {
      const fieldListeners: Array<IErrorListener> = this.listeners[field];
      const idx = fieldListeners.findIndex(l=> {
        return l.id === listener.id
      });
      fieldListeners.splice(idx, 1);
    }

    public clearErrorForField(field: string) {
      this.errors = this.errors.filter((value=> {
        return value.field !== field
      }));
      const listeners = this.listeners[field];
      if (listeners) {
        listeners.forEach((listener)=> {
          listener.clearError();
        });
      }
    }

    public clearAllErrors() {
      for (let field in this.listeners) {
        this.clearErrorForField(field);
      }
    }

    private notifyAboutError(value) {
      const listeners = this.listeners[value.field];
      if (listeners) {
        listeners.forEach((listener)=> {
          this.$translate(value.code).then(
              (message) => {
                console.log("error error", message);
                listener.onError(message)
              }, (originalMessage) => {
                listener.onError(originalMessage)
              }
          ).catch((rejection)=> {
            listener.onError(value.message);
          });
        });
      }
    }
  }

  export class ErrorListener implements IErrorListener {
    public id: string;
    public wrapperClass = '';

    constructor() {
      this.id = ERROR_LISTENER_ID_PREFIX + (lastId++);
    }

    public clearError() {
      this.wrapperClass = this.wrapperClass.replace(HAS_ERROR, '');
    }

    public onError(error: string) {
      const cssClass = this.wrapperClass;
      if (cssClass.indexOf(HAS_ERROR) === -1) {
        this.wrapperClass += ` ${HAS_ERROR}`;
      }
    }
  }

  angular.module('employees').service("ErrorService", ErrorService);

}
