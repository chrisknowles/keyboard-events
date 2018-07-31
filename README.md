# Keyboard Events

> CAUTION: This library is not considered production ready and currently has no published tests.

A module to wrap keyboard events on the DOM that

- exposes key combinations as user friendly names
- allows you to bind these combinations to functions
- allows you to attach data to events
- allows creation of reusable custom action modules (see Action Modules below)

The goal is to provide a means to add keyboard accessibility that is easily extensible.

Written as an ES module with no dependencies.

## Usage

```
$ npm i keyboard-events --save
```

```javascript
import Keyboard from 'keyboard-events';
```

```javascript
<script type='text/javascript' src='/dist/keyboard-events.js'></script>
<script type='text/javascript' src='/dist/keyboard-events.min.js'></script>
```

### Example

For elements that aren't focusable by default you will need to make them focusable e.g. by adding `tabindex='0'`

```html
<form>
  <input type='text' id='input'>
</form>

<ul>
  <li tabindex='0'></li>
</ul>
```

```javascript
Keyboard({
  elm: document.querySelector('#input'), // listen to the '#input' element
  props: {},                             // pass props to all actions
  actions: [                             // define your actions
    ['enter', {                          // the key name to listen to (see commands below)
      fn: process,                       // calls the 'process' function below
      data: {}                           // pass data to this action only
      once: true                         // automatically unsubscribe this listener after one event
    }],
    ['esc', {                            // define as many actions as you like
      fn: data => data.element.blur()
    }]
  ]
});

function process(data) {
  data.event.preventDefault(); // stop the form from submitting
  // ...                       // do processing
}

// the data arg will have this structure:
{
    command     // the key name listened to e.g. 'enter'
  , element     // the element listened to e.g. '#input'
  , target      // the event target e.g. '#input' but could be a child element 
  , event       // the actual event object itself 
                // (target above is for convenience and is event.target from this property)
  , props       // the props passed to all actions
  , data        // the data passed to this action
}

// keep a reference to unsubscribe with
const k = Keyboard(
  // ...
);
k.unsubscribe();

// cancel all keyboard subscriptions
// (it's unlikely you will want this)
Keyboard.clear();
```

> NOTE: It is possible to have nested listeners as the module will map over any elements that are subscribed. So you can set global listeners on the body that will still execute if another registered element has focus. In the case where two elements are registered for the same action e.g. `enter`, then the action for both will be executed.

## Action Modules

Action modules can be useful if you want to define a set of reusable keyboard modules. There is a module provided with this library in `src/actions/keyboard-tarverse.js` that implements traversing a list.

### Example

```javascript
// my-actions.js
// ----------------
const actions = [
  ['arrow-up', {fn: prev}],
  ['arrow-left', {fn: prev}],
  ['arrow-down', {fn: next}],
  ['arrow-right', {fn: next}]
];

function prev(data) {
  // ...
}

function next(data) {
  // ...
}

export default actions

// app.js
// ----------------
import Keyboard from 'keyboard';
import MyActions from 'my-actions.js';

Keyboard({
  elm: document.querySelector('#input'),
  props: {},                             
  use: MyActions,    // import the actions from my-actions.js
  actions: [            // extend/overwrite the imported actions with your own              
    ['enter', {                          
      fn: process
    }]
  ]
});
```

## Commands

These are the user friendly commands exposed by Keyboard (and purely for reference the key codes being used to trigger them).

<table
  <tr><td>8</td><td>backspace</td></tr>
  <tr><td>9</td><td>tab</td></tr>
  <tr><td>13</td><td>enter</td></tr>
  <tr><td>14</td><td>numlock</td></tr>
  <tr><td>20</td><td>capslock</td></tr>
  <tr><td>27</td><td>esc</td></tr>
  <tr><td>32</td><td>space</td></tr>
  <tr><td>33</td><td>page-up</td></tr>
  <tr><td>34</td><td>page-down</td></tr>
  <tr><td>35</td><td>end</td></tr>
  <tr><td>36</td><td>home</td></tr>
  <tr><td>37</td><td>arrow-left</td></tr>
  <tr><td>38</td><td>arrow-up</td></tr>
  <tr><td>39</td><td>arrow-right</td></tr>
  <tr><td>40</td><td>arrow-down</td></tr>
  <tr><td>45</td><td>insert</td></tr>
  <tr><td>46</td><td>delete</td></tr>
</table>

Use them like this:

```javascript
Keyboard({
  actions: [
    ['backspace', {}],
    ['ctrl+alt+backspace', {}]
  ]
});
```

## Special Keys

`cmd`  

`ctrl`  (on a mac the `cmd` key will be translated to `ctrl`)  

`shift`  

`alt`  

You can create combinations like so: 

```
ctrl+b  

ctrl+shift+arrow-right 

ctrl+shift+alt+backspace
```

### Order Matters !!  

The order in which the user presses the keys DOES NOT matter but the order in which you write your actions does.

```javascript
// correct order
cmd ctrl shift alt
```

```javascript
// yes 
Keyboard({
  actions: [
    ['cmd+ctrl+shift+alt+b', {}]
  ]
});

// no (any other order)
Keyboard({
  actions: [
    ['ctrl+cmd+shift+alt+b', {}],
    ['cmd+ctrl+alt+shift+b', {}]
  ]
});
```

### The `Cmd` Key

There is an option to pass that allows for using the `cmd` key. If you don't set it, the `cmd` key gets converted to the `ctrl` key. It will depend on what you are doing but you may or may not wish to us this option. If you do, you may need to assign both `cmd` and `ctrl` to the same function.

```javascript
// in this example, if cmd+b were not defined then pressing cmd+b would have no effect
Keyboard({
  useCmd: true,
  actions: [
    ['cmd+b', {}],
    ['ctrl+b', {}]
  ]
});

// in this case cmd+b and ctrl+b both work and are mapped to ctrl+b
Keyboard({
  actions: [
    ['ctrl+b', {}]
  ]
});
```

## License

MIT - see LICENSE.md
