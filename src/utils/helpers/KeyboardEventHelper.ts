import * as React from 'react';

const NumberPanelKeys = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.'];
const InputControlKeys = [
  'Backspace',
  'Delete',
  'Home',
  'End',
  'ArrowLeft',
  'ArrowRight',
];

class KeyboardEventHelper {
  private static isAllowActions(e: React.KeyboardEvent<HTMLInputElement>) {
    const allows = ['a', 'z', 'x', 'c', 'v'];
    return (e.ctrlKey || e.metaKey) && allows.includes(e.key);
  }

  static handleDecimalInputKeyDown = (callback?: () => void) => {
    return (e: React.KeyboardEvent<HTMLInputElement>): boolean | void => {
      if (this.isAllowActions(e)) {
        return true;
      }
      const value = (e.target as HTMLInputElement).value;
      if (
        !NumberPanelKeys.includes(e.key) &&
        !InputControlKeys.includes(e.key)
      ) {
        e.preventDefault();
        return false;
      }

      if (
        value.length >= 32 ||
        (value.includes('.') && value.split('.')[1].length >= 18)
      ) {
        e.preventDefault();
        return false;
      }

      if (e.code == 'Period') {
        if (value.split('.').length > 1) {
          e.preventDefault();
          return false;
        }
      }

      if (value.length < 2 && value.slice(0, 1) == '0' && e.key == '0') {
        e.preventDefault();
        return false;
      }

      if (callback) {
        callback();
      }
    };
  };

  static handlerDecimalInputKeyUp = (callback?: () => void) => {
    return (e: React.KeyboardEvent<HTMLInputElement>): boolean | void => {
      const value = (e.target as HTMLInputElement).value;

      if (!value) {
        e.preventDefault();
        return false;
      }
      if (
        !NumberPanelKeys.includes(e.key) &&
        !['Backspace', 'Delete'].includes(e.key)
      ) {
        e.preventDefault();
        return false;
      }
      if (callback) {
        callback();
      }
    };
  };
}

export default KeyboardEventHelper;
