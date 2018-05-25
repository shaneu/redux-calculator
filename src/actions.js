// actions
export const ADD = 'ADD';
export const SUBTRACT = 'SUBTRACT';
export const MULTIPLY = 'MULTIPLY';
export const DIVIDE = 'DIVIDE';
export const INPUT_NUMBER = 'INPUT_NUMBER';
export const EQUALS = 'EQUALS';
export const CLEAR = 'CLEAR';
export const PERCENT = 'PERCENT';
export const TOGGLE_SIGN = 'TOGGLE_SIGN';

// action creators
export const add = () => ({ type: ADD });
export const subtract = () => ({ type: SUBTRACT });
export const multiply = () => ({ type: MULTIPLY });
export const divide = () => ({ type: DIVIDE });
export const equals = () => ({ type: EQUALS });
export const clear = () => ({ type: CLEAR });
export const percent = () => ({ type: PERCENT });
export const toggleSign = () => ({ type: TOGGLE_SIGN });
export const inputNumber = value => ({ type: INPUT_NUMBER, value });
