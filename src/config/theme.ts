import type { Theme } from 'theme-ui';

export const theme: Theme = {
  fonts: {
    body: 'Tahoma, sans-serif',
    heading: '"Avenir Next", sans-serif',
    monospace: 'Menlo, monospace',
  },
  colors: {
    textPrimary: '#fff',

    background: '#221b47',

    buttonPrimary: '#7b79f7',
    buttonDisabled: '#848884',
  },
  cards: {
    primary: {
      padding: 2,
      borderRadius: 4,
      boxShadow: '0 0 8px rgba(0, 0, 0, 0.125)',
      backgroundColor: '#3950a4'
    },
  },
};
