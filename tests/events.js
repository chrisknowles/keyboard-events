/**
 * Wrapper for dispatching events for testing
 */

function triggerEvent(elm, evt) {
  const event = document.createEvent('HTMLEvents');
  event.initEvent(evt, true, false);
  elm.dispatchEvent(event);
}

triggerEvent.mouse = function(elm, evt, data, window = window) {
  const e = new window.MouseEvent(evt, {
    view: window,
    bubbles: true,
    cancelable: true
  });
  e.data = data;
  elm.dispatchEvent(e);
};

triggerEvent.keyboard = function(elm, evt, key, data, window = window) {
  const e = new window.KeyboardEvent(evt, {
    view: window,
    bubbles: true,
    cancelable: true,
    keyCode: key,
    which: key,
    code: key
  });
  e.data = data;
  elm.dispatchEvent(e);
};

export {triggerEvent};
