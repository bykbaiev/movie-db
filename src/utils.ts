import { IMAGE_BASE_URL } from 'api';
import { ChangeEvent,useEffect } from 'react';
import { RecoilState, useRecoilValue } from 'recoil';

type UnknownFn<R = any> = (...args: any) => R;

export const compose = <R>(...fns: Array<UnknownFn>): UnknownFn<R> =>
  fns.reduce((composed, fn) => (...args) => composed(fn(...args)));

export const getTargetValue = (event: ChangeEvent<HTMLInputElement>): string => event.currentTarget.value;

export const getImagePath = (filePath: string | null | undefined): string | null => (filePath
  ? `${IMAGE_BASE_URL}${filePath}`
  : null);

const padWithZero = (amount: number): string => amount.toString().padStart(2, '0');

export const getReadableRuntime = (runtime?: number | null): string | null => {
  if (!runtime) {
    return null;
  }

  const hours = Math.floor(runtime / 60);
  const minutes = (runtime - 60 * hours);

  return `${padWithZero(hours)}:${padWithZero(minutes)}`;
};

type RecoilObserverProps = {
  node: RecoilState<any>;
  onChange: (value: any) => void;
}

export const RecoilObserver = ({ node, onChange }: RecoilObserverProps) => {
  const value = useRecoilValue(node);
  useEffect(() => onChange(value), [onChange, value]);
  return null;
};

export const debounce = (fn: UnknownFn, timeout = 300): (...args: any) => void => {
  let timer: ReturnType<typeof setTimeout> | null = null;

  return (...args: any) => {
    if (timer) {
      clearTimeout(timer);
    }
    timer = setTimeout(() => fn(...args), timeout);
  };
};
