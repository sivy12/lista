interface JNotifyOptions {
  /**
   * whether to hide the notification on click
   */
  clickToHide?: boolean;
  /**
   * whether to auto-hide the notification
   */
  autoHide?: boolean;
  /**
   * if autoHide, hide after milliseconds
   */
  autoHideDelay?: number;
  /**
   * show the arrow pointing at the element
   */
  arrowShow?: boolean,
  /**
   * arrow size in pixels
   */
  arrowSize?: number,
  /**
   * position defines the notification position though uses the defaults below
   */
  position?: string;//'...',
  /**
   * default positions
   */
  elementPosition?: string;//'bottom left',
  globalPosition?: string; //'top right',
  /**
   * default style
   */
  style?: string;
  /**
   * default class (string or [string])
   */
  className?: string | string[];
  /**
   * show animation
   */
  showAnimation?: string;
  /**
   * show animation duration
   */
  showDuration?: number;
  /**
   * hide animation
   */
  hideAnimation?: string;
  /**
   * hide animation duration
   */
  hideDuration?: number;
  /**
   * padding between element and notification
   */
  gap?: number;
}

interface JNotifyStatic {
  addStyle(styleName: string, styleDefinition: JNotifyStyleDefinition): void
  defaults(options: JNotifyOptions): void
}

interface JNotifyStyleDefinition {
  /**
   * required html representing each notification
   */
  html: string;
  /**
   *optional object to be converted to css
   *   {
     *       <className>: {
     *           <propertyName>: <value>
     *       },
     *       <className>: {
     *           ...
     *       },
     *       ...
     *   },
   */
  classes?: any;
  /**
   *  optional css to be inserted onto the page
   */
  css?: string
}

interface JQueryStatic {
  notify(text: string|any, options?: JNotifyOptions): void;
  // notify: JNotifyStatic;
}

interface JNotifyObject {
  title?: JQuery|string;
  button?: string;
}

interface JQuery {
  notify(text: string|JNotifyObject, options?: JNotifyOptions): void;
  notify(element: JQuery, text: string|JNotifyObject, options?: JNotifyOptions): void;
  notify(text: string, type: string): void;

}
