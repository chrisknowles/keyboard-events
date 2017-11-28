import KeyboardEvents from '../src/keyboard-events.js';
import ListTraverse from '../src/actions/keyboard-traverse.js';

KeyboardEvents({
  elm: document.querySelector('#list1'),
  use: ListTraverse,
  props: {
    traverseItemClass: 'list-item'
  },
  actions: [
    ['enter', {
      fn: process
    }]
  ]
});

KeyboardEvents({
  elm: document.querySelector('#list2'),
  use: ListTraverse,
  props: {
    traverseItemClass: 'list-item'
  },
  actions: [
    ['enter', {
      fn: process
    }]
  ]
});

function process(action) {
  console.log(action)
}
