import Decimal from 'decimal.js';
import { formatUnits } from 'viem';

class NumberHelper {
  static numberInputValidation = (value: string, floatPrecision?: number) => {
    const precision = floatPrecision ?? 5;
    const regex = new RegExp(`^(\\d*)([,.]\\d{0,${precision}})?$`);
    return regex.test(value);
  };

  static numberInputConversion = (value: string) => {
    if (!value.includes('.') && value.length > 1 && value[0] === '0') {
      return `0.${value.slice(1)}`;
    }
    return value;
  };

  static toFloor(value: string, number = 4) {
    if (!value) {
      return '';
    }
    const decimal = new Decimal(value);
    const result = decimal.toFixed(number, 0);
    return result.toString();
  }

  static toLocalString(value: string) {
    if (!value) {
      return '';
    }
    const parts = value.split('.');
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    return parts.join('.');
  }

  static toLocalStringFloor(value: string, number = 4) {
    return this.toLocalString(this.toFloor(value, number));
  }

  static reverseLocalString(value: string) {
    if (!value) {
      return '';
    }
    const parts = value.split(',');
    return parts.join('');
  }

  static convertDotNumber(value: string): string {
    if (value == '') {
      return '';
    }
    if (value.endsWith('.0')) {
      const decimal = new Decimal(value);
      return decimal.toFixed(1).toString();
    }
    if (value.endsWith('.')) {
      const decimal = new Decimal(value);
      const result = decimal.toString();
      return result + '.';
    }
    if (/^([0.])\d+$/gm.test(value)) {
      const decimal = new Decimal(value.slice(1));
      return '0.' + decimal.toString();
    }
    return value;
  }

  static formatAptos(value: bigint): string {
    return formatUnits(value, 8);
  }
}

export default NumberHelper;
