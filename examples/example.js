import ListTraverse from '../src/actions/keyboard-traverse.js';

Keyboard({
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

Keyboard({
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
