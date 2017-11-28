import {JSDOM} from 'jsdom';
import test from 'tape';
import html from './html.js';
import {triggerEvent} from './events.js';
import Keyboard from '../src/keyboard-events.js';

const dom = new JSDOM(html);
const document = dom.window.document;

/**
 * Basic test to check triggering an event on an element
 * passes the correct action object through to the
 * assigned handler function
 */
test('Enter', t => {
  const target = document.querySelector('#p');
  Keyboard({
    document,
    elm: target,
    props: {a: 1, b: {c: 1}},
    actions: [
      ['enter', {
        fn: testEventData(t, getExpectedData('enter')),
        data: {a: 1, b: {c: 1}}
      }]
    ]
  });
  triggerEvent.keyboard(
    target,
    'keydown', 13, {}, dom.window
  );
  triggerEvent.keyboard(
    target,
    'keyup', 27, {}, dom.window
  );
  t.end();
});

/**
 * Check meta key combination
 */
test('ctrl+alt+j', t => {
  const target = document.querySelector('#p');
  Keyboard({
    document,
    elm: target,
    props: {a: 1, b: {c: 1}},
    actions: [
      ['ctrl+alt+j', {
        fn: testEventData(t, getExpectedData('ctrl+alt+j')),
        data: {a: 1, b: {c: 1}}
      }]
    ]
  });
  triggerEvent.keyboard(
    target,
    'keydown', 17, {}, dom.window
  );
  triggerEvent.keyboard(
    target,
    'keydown', 18, {}, dom.window
  );
  triggerEvent.keyboard(
    target,
    'keydown', 74, {}, dom.window
  );
  triggerEvent.keyboard(
    target,
    'keyup', 27, {}, dom.window
  );
  t.end();
});

/**
 * Check cmd key override
 */
test('cmd+j', t => {
  const target = document.querySelector('#p');
  Keyboard({
    document,
    useCmdKey: true,
    elm: target,
    props: {a: 1, b: {c: 1}},
    actions: [
      ['cmd+j', {
        fn: testEventData(t, getExpectedData('cmd+j')),
        data: {a: 1, b: {c: 1}}
      }]
    ]
  });
  triggerEvent.keyboard(
    target,
    'keydown', 91, {}, dom.window
  );
  triggerEvent.keyboard(
    target,
    'keydown', 74, {}, dom.window
  );
  triggerEvent.keyboard(
    target,
    'keyup', 27, {}, dom.window
  );
  t.end();
});

const getExpectedData = command => ({
  command,
  element: document.querySelector('#p'),
  target: document.querySelector('#p'),
  props: {a: 1, b: {c: 1}},
  data: {a: 1, b: {c: 1}}
});

const testEventData = (t, expected, command) => obj => {
  t.equal(obj.command, expected.command);
  t.ok(obj.element.isEqualNode(expected.element));
  t.ok(obj.target.isEqualNode(expected.target));
  t.deepEqual(obj.props, expected.props);
  t.deepEqual(obj.data, expected.data);
}
