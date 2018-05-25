/* eslint no-return-assign:0 */
import store from './configureStore';
import {
  add,
  clear,
  divide,
  equals,
  inputNumber,
  multiply,
  percent,
  toggleSign,
  subtract,
} from './actions';

const calculatorElement = document.getElementById('calculator');
const display = document.getElementById('display');
const code = document.getElementById('code');
const clearButton = document.getElementById('clear');

calculatorElement.addEventListener(
  'click',
  ({
    target: {
      firstChild: { nodeValue },
    },
  }) => {
    switch (nodeValue) {
      case '+':
        return store.dispatch(add());
      case '-':
        return store.dispatch(subtract());
      case 'X':
        return store.dispatch(multiply());
      case '÷':
        return store.dispatch(divide());
      case '=':
        return store.dispatch(equals());
      case '+/-':
        return store.dispatch(toggleSign());
      case 'C':
      case 'AC':
        return store.dispatch(clear());
      case '%':
        return store.dispatch(percent());
      default:
        return store.dispatch(inputNumber(nodeValue));
    }
  }
);

const render = () => {
  const { displayValue, clearButtonText } = store.getState();
  clearButton.textContent = clearButtonText;
  display.textContent = displayValue;
  code.textContent = JSON.stringify(store.getState(), null, 2);
};

store.subscribe(render);
render();
