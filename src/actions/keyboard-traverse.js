/**
 * A pre-built set of actions for traversing a set
 * of focussable elements using the keyboard module
 */

/**
 * The list of keys mapped to functions
 */
const KeyboardTraverseActions = [
  ['arrow-up', {fn: prev}],
  ['arrow-left', {fn: prev}],
  ['arrow-down', {fn: next}],
  ['arrow-right', {fn: next}],
  ['ctrl+arrow-up', {fn: first}],
  ['ctrl+arrow-left', {fn: first}],
  ['ctrl+page-up', {fn: first}],
  ['ctrl+home', {fn: first}],
  ['ctrl+arrow-down', {fn: last}],
  ['ctrl+arrow-right', {fn: last}],
  ['ctrl+page-down', {fn: last}],
  ['ctrl+end', {fn: last}],
  ['ctrl+shift+arrow-up', {fn: up}],
  ['ctrl+shift+arrow-left', {fn: up}],
  ['ctrl+shift+arrow-down', {fn: down}],
  ['ctrl+shift+arrow-right', {fn: down}]
];

/**
 * Move focus to the previous element in the list
 *
 * @param {Object} data Keyboard action data
 */
function prev(data) {
  data.event.preventDefault();
  if (checkSibling(data, 'previousElementSibling')) {
    data.event.target.previousElementSibling.focus();
  }
}

/**
 * Move focus to the next element in the list
 *
 * @param {Object} data Keyboard action data
 */
function next(data) {
  data.event.preventDefault();
  if (checkSibling(data, 'nextElementSibling')) {
    data.event.target.nextElementSibling.focus();
  }
}

/**
 * Move focus to the first element in the list
 *
 * @param {Object} data Keyboard action data
 */
function first(data) {
  data.event.preventDefault();
  data.element.querySelectorAll(
    '.' + data.props.traverseItemClass + '[tabindex="0"]'
  )[0].focus();
}

/**
 * Move focus to the last element in the list
 *
 * @param {Object} data Keyboard action data
 */
function last(data) {
  data.event.preventDefault();
  const items = data.element.querySelectorAll(
    '.' + data.props.traverseItemClass + '[tabindex="0"]'
  );
  items[items.length - 1].focus();
}

/**
 * Move focus to the first focussable elemnt before the list
 *
 * @param {Object} data Keyboard action data
 */
function up(data) {
  data.event.preventDefault();
  const first = data.element.querySelectorAll(
    '.' + data.props.traverseItemClass + '[tabindex="0"]'
  )[0];
  const focussable = [...document.querySelectorAll('[tabindex="0"]')];
  if (focussable[focussable.indexOf(first) - 1]) {
    focussable[focussable.indexOf(first) - 1].focus();
  }
}

/**
 * Move focus to the first focussable elemnt after the list
 *
 * @param {Object} data Keyboard action data
 */
function down(data) {
  data.event.preventDefault();
  const items = data.element.querySelectorAll(
    '.' + data.props.traverseItemClass + '[tabindex="0"]'
  );
  const focussable = [...document.querySelectorAll('[tabindex="0"]')];
  if (focussable[focussable.indexOf(items[items.length - 1]) + 1]) {
    focussable[focussable.indexOf(items[items.length - 1]) + 1].focus();
  }

}

/**
 * Check that a sibling element exists to prevent errors
 * when the ends of the list are reached
 *
 * @param {Object} data Keyboard action data
 * @param {string} sibling The type of element sibling to check
 *                 (previous or next sibling)
 */
const checkSibling = (data, sibling) =>
  data.event.target[sibling]
    && data.event.target[sibling].classList
    && data.event.target[sibling]
      .classList.contains(data.props.traverseItemClass);

export {KeyboardTraverseActions};
