import store from './configureStore';

import {
  add,
  clear,
  divide,
  equals,
  inputNumber,
  multiply,
  subtract,
  toggleSign,
  percent,
} from './actions';

describe('calculator store', () => {
  describe('basic operations', () => {
    beforeEach(() => {
      store.dispatch(clear());
      store.dispatch(clear());
    });
    describe('CLEAR', () => {
      describe('when a user enters number', () => {
        it('should clear the users input', () => {
          const expectedState = {
            clearButtonText: 'AC',
            currentInput: '',
            displayValue: '0',
            history: [],
            input: [],
            total: 0,
          };
          store.dispatch(inputNumber('0'));
          store.dispatch(inputNumber('4'));
          store.dispatch(inputNumber('7'));
          expect(store.getState().displayValue).toBe('47');
          store.dispatch(clear());
          expect(store.getState()).toMatchObject(expectedState);
        });
      });
    });

    describe('ADD', () => {
      describe('when a user enters 2 numbers and presses equals', () => {
        it('should display the result', () => {
          store.dispatch(inputNumber('0'));
          store.dispatch(inputNumber('4'));
          store.dispatch(inputNumber('7'));
          store.dispatch(add());
          store.dispatch(inputNumber('7'));

          store.dispatch(equals());
          expect(store.getState().total).toBe(54);
        });
      });

      describe('when a user enters multiple numbers to add', () => {
        it('should display the result', () => {
          store.dispatch(inputNumber('0'));
          store.dispatch(inputNumber('2'));
          store.dispatch(inputNumber('0'));
          store.dispatch(add());
          store.dispatch(inputNumber('7'));
          store.dispatch(add());
          expect(store.getState().total).toBe(27);
          store.dispatch(inputNumber('8'));
          store.dispatch(equals());
          expect(store.getState().total).toBe(35);
        });
      });

      describe('when a user enters 0 as the first operand', () => {
        it('should display the result', () => {
          store.dispatch(inputNumber('0'));
          store.dispatch(add());
          store.dispatch(inputNumber('7'));
          store.dispatch(equals());
          expect(store.getState().total).toBe(7);
          expect(store.getState().history).toMatchObject(['0', 'ADD', '7']);
        });
      });
    });
    describe('SUBTRACT', () => {
      describe('when a user enters 2 numbers and presses equals', () => {
        it('should display the result', () => {
          store.dispatch(inputNumber('0'));
          store.dispatch(inputNumber('4'));
          store.dispatch(inputNumber('7'));
          store.dispatch(subtract());
          store.dispatch(inputNumber('7'));
          store.dispatch(equals());
          expect(store.getState().total).toBe(40);
        });
      });

      describe('when a user enters multiple numbers to subtract', () => {
        it('should display the result', () => {
          store.dispatch(inputNumber('0'));
          store.dispatch(inputNumber('2'));
          store.dispatch(inputNumber('0'));
          store.dispatch(subtract());
          store.dispatch(inputNumber('7'));
          store.dispatch(subtract());
          expect(store.getState().total).toBe(13);
          store.dispatch(inputNumber('8'));
          store.dispatch(equals());
          expect(store.getState().total).toBe(5);
        });
      });

      describe('when a user enters 0 as the first operand', () => {
        it('should display the result', () => {
          store.dispatch(inputNumber('0'));
          store.dispatch(subtract());
          store.dispatch(inputNumber('7'));
          store.dispatch(equals());
          expect(store.getState().total).toBe(-7);
        });
      });
    });
    describe('MULTIPLY', () => {
      describe('when a user enters 2 numbers and presses equals', () => {
        it('should display the result', () => {
          store.dispatch(inputNumber('0'));
          store.dispatch(inputNumber('4'));
          store.dispatch(inputNumber('7'));
          store.dispatch(multiply());
          store.dispatch(inputNumber('7'));
          store.dispatch(equals());
          expect(store.getState().total).toBe(329);
          // console.log(JSON.stringify(store.getState(), null, 2));
        });
      });

      describe('when a user enters multiple numbers to multiply', () => {
        it('should display the result', () => {
          store.dispatch(inputNumber('0'));
          store.dispatch(inputNumber('2'));
          store.dispatch(inputNumber('0'));
          store.dispatch(multiply());
          store.dispatch(inputNumber('7'));
          store.dispatch(multiply());
          expect(store.getState().total).toBe(140);
          store.dispatch(inputNumber('8'));
          store.dispatch(equals());
          expect(store.getState().total).toBe(1120);
        });
      });
      describe('when a user enters 0 as the first operand', () => {
        it('should display the result', () => {
          store.dispatch(inputNumber('0'));
          store.dispatch(multiply());
          store.dispatch(inputNumber('7'));
          store.dispatch(equals());
          expect(store.getState().total).toBe(0);
          expect(store.getState().history).toMatchObject([
            '0',
            'MULTIPLY',
            '7',
          ]);
        });
      });
    });
    describe('DIVIDE', () => {
      describe('when a user enters 2 numbers and presses equals', () => {
        it('should display the result', () => {
          store.dispatch(inputNumber('0'));
          store.dispatch(inputNumber('4'));
          store.dispatch(inputNumber('9'));
          store.dispatch(divide());
          store.dispatch(inputNumber('7'));
          store.dispatch(equals());
          expect(store.getState().total).toBe(7);
        });
      });

      describe('when a user enters multiple numbers to divide', () => {
        it('should display the result', () => {
          store.dispatch(inputNumber('0'));
          store.dispatch(inputNumber('2'));
          store.dispatch(inputNumber('1'));
          store.dispatch(divide());
          store.dispatch(inputNumber('7'));
          store.dispatch(divide());
          expect(store.getState().total).toBe(3);
          store.dispatch(inputNumber('8'));
          store.dispatch(equals());
          expect(store.getState().total).toBe(0.375);
        });
      });
      describe('when a user enters 0 as the first operand', () => {
        it('should display the result', () => {
          store.dispatch(inputNumber('0'));
          store.dispatch(divide());
          store.dispatch(inputNumber('7'));
          store.dispatch(equals());
          expect(store.getState().total).toBe(0);
          expect(store.getState().history).toMatchObject(['0', 'DIVIDE', '7']);
          // console.log(JSON.stringify(store.getState(), null, 2));
        });
      });
    });
    describe('TOGGLE SIGN', () => {
      it('should flip the sign', () => {
        store.dispatch(inputNumber('7'));
        store.dispatch(toggleSign());
        expect(store.getState().currentInput).toBe('-7');
        store.dispatch(toggleSign());
        expect(store.getState().currentInput).toBe('7');
      });
    });
    describe('PERCENT', () => {
      it('should convert the current nuber to a percent', () => {
        store.dispatch(inputNumber('7'));
        store.dispatch(percent());
        expect(store.getState().currentInput).toBe('0.07');
      });
    });
  });
  describe('edge cases', () => {
    beforeEach(() => {
      store.dispatch(clear());
      store.dispatch(clear());
    });
    describe('when a user enters a number and an operation', () => {
      it('should use last input if no current input is given', () => {
        store.dispatch(inputNumber('7'));
        store.dispatch(add());
        store.dispatch(equals());
        store.dispatch(equals());
        expect(store.getState().total).toBe(21);
      });
      it('should use previous total when new operation is entered', () => {
        store.dispatch(inputNumber('7'));
        store.dispatch(add());
        store.dispatch(equals());
        store.dispatch(equals());
        store.dispatch(equals());
        expect(store.getState().total).toBe(28);
        store.dispatch(add());
        store.dispatch(inputNumber('2'));
        store.dispatch(equals());
        expect(store.getState().total).toBe(30);
      });
    });
    describe('when a user enters multiple operations in a row', () => {
      it('should respect operator precedence', () => {
        store.dispatch(inputNumber('4'));
        store.dispatch(inputNumber('5'));
        store.dispatch(add());
        store.dispatch(inputNumber('5'));
        store.dispatch(multiply());
        store.dispatch(inputNumber('2'));
        store.dispatch(equals());
        expect(store.getState().total).toBe(55);
      });
    });
  });
  describe('sample flow', () => {
    beforeAll(() => {
      store.dispatch(clear());
      store.dispatch(clear());
    });
    it('should display number user enters', () => {
      store.dispatch(inputNumber('3'));
      expect(store.getState().displayValue).toBe('3');
    });
    it('should allow the user to enter an operation', () => {
      store.dispatch(add());
      expect(store.getState().input).toMatchObject(['3', 'ADD']);
    });
    it('should display next numbers user enters', () => {
      store.dispatch(inputNumber('4'));
      store.dispatch(inputNumber('3'));
      expect(store.getState().displayValue).toBe('43');
    });
    describe('when user presseses equals', () => {
      it('should display total', () => {
        store.dispatch(equals());
        expect(store.getState().total).toBe(46);
      });
      it('should display result of prevous operation and last number entered', () => {
        store.dispatch(equals());
        expect(store.getState().total).toBe(89);
        expect(store.getState().displayValue).toBe('89');
        store.dispatch(equals());
        expect(store.getState().displayValue).toBe('132');
        expect(store.getState().total).toBe(132);
      });
      describe('when the user presses clear', () => {
        it('should display 0 and give user option to clear all history', () => {
          store.dispatch(clear());
          expect(store.getState().displayValue).toBe('0');
          expect(store.getState().clearButtonText).toBe('AC');
        });
        describe('when the user presses enter again', () => {
          it('should display previous total', () => {
            store.dispatch(equals());
            expect(store.getState().total).toBe(132);
            expect(store.getState().displayValue).toBe('132');
          });
          it('should display previous total applied to the last operation', () => {
            store.dispatch(equals());
            expect(store.getState().displayValue).toBe('264');
            expect(store.getState().total).toBe(264);
            store.dispatch(equals());
            expect(store.getState().displayValue).toBe('396');
            expect(store.getState().total).toBe(396);
          });
          describe('when the user presses clear again', () => {
            it('should clear all history', () => {
              store.dispatch(clear());
              expect(store.getState().total).toBe(0);
              expect(store.getState().history).toMatchObject([]);
              expect(store.getState().input).toMatchObject([]);
            });
          });
        });
      });
    });
  });
});
