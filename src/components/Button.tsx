import React from 'react';
import { Button as ThemeButton, ThemeUIStyleObject } from 'theme-ui';

type TextVariations = 'primary' | 'disabled';

interface IProps {
  children: React.ReactNode;
  variant: TextVariations;
  onClick: () => void;

  disabled?: boolean;
  sx?: ThemeUIStyleObject;
}

const styles = {
  primary: {
    backgroundColor: 'buttonPrimary',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  disabled: {
    backgroundColor: 'buttonDisabled',
  },
};

export const Button: React.FC<IProps> = ({
  children,
  onClick,
  disabled,
  variant,
  sx,
}) => {
  return (
    <ThemeButton
      disabled={disabled}
      onClick={onClick}
      sx={{ ...styles[disabled ? 'disabled' : variant], ...sx }}
    >
      {children}
    </ThemeButton>
  );
};
