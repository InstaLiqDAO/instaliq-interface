import { BigNumber } from 'ethers';
import { parseEther } from 'ethers/lib/utils';
import React, { useState } from 'react';
import { Input, ThemeUIStyleObject } from 'theme-ui';
import { formatEther } from '../util/util';

interface IProps {
  value: BigNumber;
  setValue: (value: BigNumber) => void;

  sx?: ThemeUIStyleObject;
}

const style = {
  backgroundColor: 'white',
  '::-webkit-inner-spin-button': {
    '-webkit-appearance': 'none',
    margin: 0,
  },
  '::-webkit-outer-spin-button': {
    '-webkit-appearance': 'none',
    margin: 0,
  },
};

export const TokenInput: React.FC<IProps> = ({ value, setValue, sx }) => {
  const [stringValue, setStringValue] = useState(value ? formatEther(value) : '');

  const validateTokenInput = (value: string) => {
    console.log(value);
    const regexp = /^\d{0,6}((\d\.)|(\.\d))?\d{0,9}$/;

    if (regexp.test(value)) {
      setStringValue(value);
      setValue(parseEther(value));
    }
  };

  const setEmpty = () => {
    setValue(BigNumber.from(0));
    setStringValue('');
  }

  return (
    <Input
      sx={{ ...style, ...sx }}
      type="string"
      value={stringValue}
      onChange={(e) =>
        e.target.value
          ? validateTokenInput(e.target.value)
          : setEmpty()
      }
    />
  );
};
