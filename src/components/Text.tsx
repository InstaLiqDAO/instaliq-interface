import React from 'react';
import { Text as ThemeText, ThemeUIStyleObject } from 'theme-ui';

type TextVariations = 'primary';

interface IProps {
  children: React.ReactNode;
  variant: TextVariations;

  sx?: ThemeUIStyleObject;
}

const textStyles = {
  primary: {
    fontSize: [16],
    color: 'textPrimary',
    fontFamily: 'body',
  },
};

export const Text: React.FC<IProps> = ({
  children,
  variant,
  sx,
}) => {
  return (
    <ThemeText sx={{ ...textStyles[variant], ...sx }}>
      {children}
    </ThemeText>
  );
};
