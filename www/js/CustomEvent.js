(function () {
    if(window.CustomEvent === undefined) {
      function CustomEvent ( event, params ) {
        params = params || { bubbles: false, cancelable: false, detail: undefined };
        var evt = document.createEvent( 'HTMLEvents' );
        if(evt.initCustomEvent !== null && evt.initCustomEvent !== undefined) {
            evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail );
        } else {
            evt.initEvent(event, params.bubbles, params.cancelable);
        }
        return evt;
       };

      CustomEvent.prototype = window.Event.prototype;

      window.CustomEvent = CustomEvent;


    }

})();	