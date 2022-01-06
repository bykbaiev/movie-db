import { debounce } from './utils';

describe('#debounce', () => {
  afterEach(() => {
    jest.useRealTimers();
  });

  test('should call fn immediately with passed arguments if queue is empty', () => {
    jest.useFakeTimers();
    const fn = jest.fn();
    const debounced = debounce(fn, 100);

    debounced(1, 2, 3);
    jest.runAllTimers();

    expect(fn).toHaveBeenCalled();
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(1, 2, 3);
  });

  test('should call fn only once with last arguments if queue is not empty', () => {
    jest.useFakeTimers();

    const fn = jest.fn();
    const debounced = debounce(fn, 100);

    debounced(1, 2, 3);
    debounced(4, 5, 6);
    debounced(7, 8, 9);

    jest.runAllTimers();

    expect(fn).toHaveBeenCalled();
    expect(fn).toHaveBeenCalledTimes(1);
    expect(fn).toHaveBeenCalledWith(7, 8, 9);
  });

  test('should call fn twice if between first and last call there was more than timeout ms gap', (done) => {
    const fn = jest.fn();
    const debounced = debounce(fn, 100);

    debounced(1, 2, 3);
    debounced(4, 5, 6);
    debounced(7, 8, 9);

    setTimeout(() => {
      jest.useFakeTimers();
      debounced(10, 11, 12);
      jest.runAllTimers();

      expect(fn).toHaveBeenCalledTimes(2);
      expect(fn).toHaveBeenCalledWith(7, 8, 9);
      expect(fn).toHaveBeenCalledWith(10, 11, 12);

      done();
    }, 500);
  });
});

export {};
