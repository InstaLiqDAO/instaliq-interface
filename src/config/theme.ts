import type { Theme } from 'theme-ui';

export const theme: Theme = {
  fonts: {
    body: 'DM Sans, sans-serif',
    heading: '"Avenir Next", sans-serif',
    monospace: 'Menlo, monospace',
  },
  colors: {
    textPrimary: '#fff',
//212429
    background: '#222222',
    navColor: 'transparent',

    buttonPrimary: '#008ee0',
    buttonDisabled: '#848884',
    buttonAddress: '#f72585'
  },
  cards: {
    primary: {
      padding: 2,
      borderRadius: 4,
      boxShadow: '0 0 8px rgba(0, 0, 0, 0.125)',
      backgroundColor: '#222222',
    },
  },
  styles: {
    hr: {
      color: 'darkslategray'
    },
    spinner: {
      color: '#848884',
    },
  }
};
