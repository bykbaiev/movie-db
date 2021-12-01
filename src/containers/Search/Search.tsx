import { useState } from 'react';
import { compose, getTargetValue } from 'utils';

export const Search = () => {
  const [value, update] = useState<string>('');
  const onChange = compose(update, getTargetValue);

  return (
    <input
      value={value}
      onChange={onChange}
    />
  );
};
