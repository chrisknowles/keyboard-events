'use strict';

var slicedToArray = function () {
  function sliceIterator(arr, i) {
    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"]) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  return function (arr, i) {
    if (Array.isArray(arr)) {
      return arr;
    } else if (Symbol.iterator in Object(arr)) {
      return sliceIterator(arr, i);
    } else {
      throw new TypeError("Invalid attempt to destructure non-iterable instance");
    }
  };
}();













var toConsumableArray = function (arr) {
  if (Array.isArray(arr)) {
    for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

    return arr2;
  } else {
    return Array.from(arr);
  }
};

/**
 * A module to wrap keyboard events on the DOM.
 *
 * Provides ability to listen for keyboard events
 * occurring on elements and provides user friendly
 * names for key combinations and the ability to attach
 * data to events.
 *
 * It is used by mapping key combinations to functions and
 * allows for custom action modules to be defined and
 * included with your own actions.
 */

var document = void 0;

/**
 * Key code to friendly name mappings
 */
var fns = {
  8: 'backspace',
  9: 'tab',
  13: 'enter',
  20: 'capslock',
  27: 'esc',
  32: 'space',
  33: 'page-up',
  34: 'page-down',
  35: 'end',
  36: 'home',
  37: 'arrow-left',
  38: 'arrow-up',
  39: 'arrow-right',
  40: 'arrow-down',
  45: 'insert',
  46: 'delete',
  144: 'numlock'
};

/**
 * Key code to special key friendly name mappings
 */
var metaKeys = {
  16: 'shift',
  17: 'ctrl',
  18: 'alt',
  91: 'cmd'
};

/**
 * Keeps the special key states for building
 * command strings from
 */
var metaKeysState = new Map([[91, { name: 'cmd', selected: false }], [17, { name: 'ctrl', selected: false }], [16, { name: 'shift', selected: false }], [18, { name: 'alt', selected: false }]]);

/**
 * Flag to denote special key(s) have
 * been pressed
 */
var hasMetaKeys = false;

/**
 * The current command string
 */
var command = '';

/**
 * A Map of all the subscriptions
 */
var subscriptions = new Map();

/**
 * Listen to key events on the body element
 */
function listen(elm) {
  unlisten(elm);
  elm.addEventListener('keydown', map);
  elm.addEventListener('keyup', resetMetaKeys);
}

/**
 * Stop listening to key events on the body element
 */
function unlisten(elm) {
  elm.removeEventListener('keydown', map);
  elm.removeEventListener('keyup', resetMetaKeys);
}

/**
 * Get any registered elements and map over them
 *
 * @param {Event} event - Keyboard event
 */
function map(event) {
  findElements(event).map(doMap(event));
}

/**
 * Map the key(s) that were pressed to any actions on the
 * current element
 *
 * @param {Event} event - Keyboard event
 * @param {HTMLElement} element - The HTML element to check subscriptions on
 */
var doMap = function doMap(event) {
  return function (element) {
    // get the subcription for the element
    var subscription = subscriptions.get(element);
    // get the key to use based on the cmd key settings
    var key = getKey(subscription.useCmdKey, event);
    // check if the key is a special key and set it if so
    if (!isMetaKey(key)) {
      // add meta keys to the command sring
      addMetaKeysToCommand();
      // add the key to the command string
      addKeyToCommand(key);
      // get the action associated with the command
      var action = subscription.actions.get(command.toLowerCase());
      // do callback
      executeCallback(element, subscription, action, event);
      // clear command
      command = '';
    }
  };
};

/**
 * Adds the key to the command string
 *
 * @param {integer} key - The key code of the event
 */
function addKeyToCommand(key) {
  command += fns[key] || String.fromCharCode(key).toLowerCase();
}

/**
 * Execute the action callback function
 *
 * @param {HTMLElement} element - The HTML element to execute the callback on
 * @param {Object} subscription - The subscription for this element
 * @param {Object} action - The action asscoiated with the key sequence
 * @param {Event} event - Keyboard event
 */
function executeCallback(element, subscription, action, event) {
  if (action && action.fn && action.fn !== '-') {
    action.fn({
      element: element,
      event: event,
      command: command,
      target: event.target,
      data: action.data,
      props: subscription.props
    });
    if (action.once) {
      subscriptions.delete(element);
    }
  }
}

/**
 * Adds meta keys to the command string if they exist
 */
function addMetaKeysToCommand() {
  if (hasMetaKeys) {
    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = metaKeysState.entries()[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var _step$value = slicedToArray(_step.value, 2),
            key = _step$value[0],
            value = _step$value[1];

        if (value.selected) {
          command += value.name + '+';
        }
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }
  }
}

/**
 * Checks if the key is a special key and sets it
 * if it is
 *
 * @param {integer} key - The key code of the event
 */
function isMetaKey(key) {
  if (metaKeys[key]) {
    hasMetaKeys = true;
    metaKeysState.get(key).selected = true;
    return true;
  }
  return false;
}

/**
 * Reset all the special keys to false
 */
function resetMetaKeys() {
  var _iteratorNormalCompletion2 = true;
  var _didIteratorError2 = false;
  var _iteratorError2 = undefined;

  try {
    for (var _iterator2 = metaKeysState.entries()[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
      var _step2$value = slicedToArray(_step2.value, 2),
          key = _step2$value[0],
          value = _step2$value[1];

      metaKeysState.get(key).selected = false;
    }
  } catch (err) {
    _didIteratorError2 = true;
    _iteratorError2 = err;
  } finally {
    try {
      if (!_iteratorNormalCompletion2 && _iterator2.return) {
        _iterator2.return();
      }
    } finally {
      if (_didIteratorError2) {
        throw _iteratorError2;
      }
    }
  }
}

/**
 * Find registered elements by traversing up from the
 * event target element and returning any registered elements
 *
 * @param {Event} event - Keyboard event
 */
function findElements(event) {
  // const path =
  return (event.path || event.composedPath && event.composedPath() || getPath(event)).filter(function (elm) {
    return subscriptions.get(elm);
  });
}

/**
 * Gets event path in browsers that don't support event.path
 * or event.composedPath()
 *
 * @param {Event} event - Keyboard event
 */
function getPath(event) {
  var elm = event.target;
  var path = [];
  while (elm.tagName.toLowerCase() !== 'html') {
    path.push(elm);
    elm = elm.parentElement;
  }
  if (document) {
    path.push(document);
  }
  if (typeof Window !== 'undefined') {
    path.push(Window);
  }
  return path;
}

/**
 * If not using the cmd key and the key pressed is the
 * cmd key then convert it to the ctrl key
 *
 * @param {Boolean} useCmdKey - Whether to use the command key
 *   or change it to the ctrl key
 * @param {Event} event - Keyboard event
 */
var getKey = function getKey(useCmdKey, event) {
  return useCmdKey ? event.which : event.which === 91 ? 17 : event._testCode || event.which;
};

var unsubscribe = function unsubscribe(elm) {
  return function () {
    subscriptions.delete(elm);
    unlisten(elm);
  };
};

function unsubscribeAll() {
  [].concat(toConsumableArray(subscriptions.keys())).forEach(function (key) {
    unlisten(key);
  });
  subscriptions.clear();
}

/**
 * Subscribes the element and it's actions
 *
 * @param {Object} options - Configuration options
 * @param {HTMLElement} options.elm - The HTML element to bind the actions to
 * @param {Array} options.use - An array of pre-configured actions
 * @param {Array} options.actions - An array of action defnitions
 * @param {Object} options.props - Properties to pass to all actions
 * @param {Array} options.useCmdKey - Flag to denote using the cmd key
 *
 * @returns {Object} An unsubscribe function and the listen function for testing purposes
 * @throws Throws an error if no element option is supplied
 */
function Keyboard(options) {
  if (!options.elm) {
    throw new Error('\n      Trying to create a keyboard event listener without providing\n      an element to listen on\n    ');
  }
  subscriptions.set(options.elm, {
    useCmdKey: options.useCmdKey || false,
    props: options.props || {},
    actions: new Map((options.use || []).concat(options.actions || []))
  });
  document = options.document ? options.document : window.document;
  listen(options.elm);
  return {
    unsubscribe: unsubscribe,
    listen: listen
  };
}

/**
 * Provide a means to stop listenting to all key events
 * on the body element
 */
Keyboard.clear = unsubscribeAll;

module.exports = Keyboard;
