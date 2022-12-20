import { trimString, getIsValidNumber, removeObjPropImmutably } from './utils';

describe('trimString util', () => {
  it('positive trimming cases', () => {
    expect(trimString('LongName', 5)).toBe('LongN...');
    expect(trimString('LongName', 4)).toBe('Long...');
    expect(trimString('LongName', 10)).toBe('LongName');
    expect(trimString('   LongName   ', 3)).toBe('Lon...');
  });

  it('negative trimming cases', () => {
    expect(trimString('      ', 4)).toBe('      ');
    expect(trimString(null, 4)).toBeNull();
    expect(trimString(undefined, 4)).toBeUndefined();
  });
});

describe('getIsValidNumber util', () => {
  it('positive checking cases', () => {
    const numbers = [1, 0, 0.5, '123', '321asd'];

    for (let int = 1; int < numbers.length; int++) {
      expect(getIsValidNumber(numbers[int])).toBeTruthy();
    }
  });

  it('negative checking cases', () => {
    const notNumbers = ['321asd', 'qwe', undefined, Infinity, null, {}, []];

    for (let int = 1; int < notNumbers.length; int++) {
      expect(getIsValidNumber(notNumbers[int])).toBeFalsy();
    }
  });
});

describe('removeObjPropImmutably util', () => {
  it('positive removing', () => {
    expect(removeObjPropImmutably({ a: 1, b: 2 }, 'b')).toMatchObject({ a: 1 });
    expect(removeObjPropImmutably({ a: () => { }, b: 2 }, 'a')).toMatchObject({ b: 2 });
  });

  it('negative checking cases', () => {
    const notValidObjects = [null, undefined, {}, '', 1];

    for (let int = 1; int < notValidObjects.length; int++) {
      expect(removeObjPropImmutably(notValidObjects[int])).toMatchObject({});
    }
  });
});
