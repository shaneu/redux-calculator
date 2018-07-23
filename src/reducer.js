/* eslint no-nested-ternary: 0 */
/* eslint no-return-assign: 0 */
import {
  ADD,
  CLEAR,
  DIVIDE,
  EQUALS,
  INPUT_NUMBER,
  MULTIPLY,
  TOGGLE_SIGN,
  SUBTRACT,
  PERCENT,
} from './actions';

const operations = {
  ADD: { func: (x, y) => x + y, precedence: 1 },
  MULTIPLY: { func: (x, y) => x * y, precedence: 2 },
  DIVIDE: { func: (x, y) => x / y, precedence: 2 },
  SUBTRACT: { func: (x, y) => x - y, precedence: 1 },
};

const toggleSign = x => (x ? -x : x);
const getPercent = x => x / 100;

const calculateTotal = inputStack => {
  const { outputQueue, stack } = inputStack.reduce(
    (acc, token) => {
      if (!Number.isNaN(Number(token))) {
        acc.outputQueue = [...acc.outputQueue, Number(token)];
        return acc;
      }
      let [operator] = acc.stack.slice(-1);
      while (
        operator &&
        operations[token].precedence <= operations[operator].precedence
      ) {
        acc.outputQueue.push(operator);
        acc.stack.pop();
        [operator] = acc.stack.slice(-1);
      }
      acc.stack.push(token);
      return acc;
    },
    { outputQueue: [], stack: [] }
  );
  const postfix = [...outputQueue, ...stack.reverse()];
  const [result] = postfix.reduce((acc, token) => {
    if (!Number.isNaN(Number(token))) {
      return [...acc, Number(token)];
    }
    const operand2 = acc.pop();
    const operand1 = acc.pop();
    return [...acc, operations[token].func(operand1, operand2)];
  }, []);
  return result;
};

const initialState = {
  clearButtonText: 'AC',
  currentInput: '',
  displayValue: '0',
  equalPressed: false,
  totalBeforeClear: '0',
  history: [],
  input: [],
  total: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case INPUT_NUMBER: {
      const input = `${
        state.currentInput && !Number.isNaN(Number(state.currentInput))
          ? state.currentInput
          : ''
      }${action.value}`;
      const formatInput = input.charAt(0) === '0' ? input.slice(1) : input;
      return {
        ...state,
        clearButtonText: 'C',
        currentInput: formatInput || '0',
        displayValue: formatInput || '0',
      };
    }
    case ADD:
    case SUBTRACT:
    case MULTIPLY:
    case DIVIDE: {
      const input = [...state.input, state.currentInput || action.type];
      const [previousOperator] = input.slice(1, 2);
      const currentOperator = action.type;
      const total =
        previousOperator &&
        operations[currentOperator].precedence <=
          operations[previousOperator].precedence &&
        calculateTotal(input);
      return total
        ? {
            ...state,
            currentInput: action.type,
            history: [...state.history, state.currentInput, action.type],
            input: [String(total), action.type],
            total,
            displayValue: String(total),
          }
        : {
            ...state,
            currentInput: action.type,
            history: state.currentInput
              ? [...state.history, state.currentInput, action.type]
              : [...state.history, action.type],
            input: state.currentInput
              ? [...state.input, state.currentInput, action.type]
              : [...state.input, action.type],
          };
    }
    case PERCENT: {
      const percent = String(getPercent(Number(state.currentInput)));
      return { ...state, currentInput: percent, displayValue: percent };
    }
    case TOGGLE_SIGN: {
      const toggledSign = String(
        toggleSign(Number(state.currentInput || state.total))
      );
      return { ...state, currentInput: toggledSign, displayValue: toggledSign };
    }
    case EQUALS: {
      if (!state.input.length && !state.history.length) {
        return { ...state };
      }
      const [lastOperator] = state.history.slice(-2, -1);
      const currentInput =
        state.currentInput && Number.isNaN(Number(state.currentInput))
          ? lastOperator
          : !state.currentInput
            ? state.history.slice(-2)
            : [state.currentInput];
      const inputStack = state.input.length
        ? [...state.input, ...currentInput]
        : [...state.history];
      const total = calculateTotal(inputStack);
      return {
        ...state,
        currentInput: '',
        displayValue: String(total),
        equalPressed: true,
        history: state.input.length
          ? [...state.history, ...currentInput]
          : state.totalBeforeClear
            ? [...state.history, lastOperator, state.totalBeforeClear]
            : state.history,
        input: [String(total)],
        total,
      };
    }
    case CLEAR:
      return {
        currentInput: '',
        displayValue: '0',
        equalPressed: false,
        input: [],
        history: state.clearButtonText === 'AC' ? [] : state.history,
        totalBeforeClear:
          state.clearButtonText === 'AC' ? '0' : String(state.total),
        clearButtonText: 'AC',
        total: 0,
      };
    default:
      return state;
  }
};
