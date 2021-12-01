import { ChangeEvent } from 'react';

type UnknownFn<R = any> = (...args: any) => R;

export const compose = <R>(...fns: Array<UnknownFn>): UnknownFn<R> =>
  fns.reduce((composed, fn) => (...args) => composed(fn(...args)));

export const getTargetValue = (event: ChangeEvent<HTMLInputElement>) => event.currentTarget.value;
