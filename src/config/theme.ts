import type { Theme } from 'theme-ui';

export const theme: Theme = {
  fonts: {
    body: 'DM Sans, sans-serif',
    heading: '"Avenir Next", sans-serif',
    monospace: 'Menlo, monospace',
  },
  colors: {
    textPrimary: '#fff',

    background: '#222222',
    navColor: 'transparent',

    buttonPrimary: '#008ee0',
    buttonDisabled: '#848884',
    buttonAddress: '#f72585',

    positiveColor: '#277344',
    neutralColor: '#3397c1',
    negativeColor: '#ab273c',
  },
  cards: {
    primary: {
      padding: 2,
      borderRadius: 4,
      boxShadow: '0 0 8px rgba(0, 0, 0, 0.125)',
      backgroundColor: '#222222',
    },
    secondary: {
      padding: 2,
      borderRadius: 4,
      boxShadow: '0 0 8px rgba(0, 0, 0, 0.125)',
      backgroundColor: '#333333',
    },
    positive: {
      backgroundColor: 'positiveColor',
      borderRadius: 4,
      boxShadow: '0 0 8px rgba(0, 0, 0, 0.125)',
    },
    neutral: {
      backgroundColor: 'neutralColor',
      borderRadius: 4,
      boxShadow: '0 0 8px rgba(0, 0, 0, 0.125)',
    },
    negative: { 
      backgroundColor: 'negativeColor',
      borderRadius: 4,
      boxShadow: '0 0 8px rgba(0, 0, 0, 0.125)',
    },
  },
  badges: {
    positive: {
      backgroundColor: 'positiveColor',
    },
    neutral: {
      backgroundColor: 'neutralColor',
    },
    negative: { 
      backgroundColor: 'negativeColor' 
    },
  },
  styles: {
    hr: {
      color: 'darkslategray',
    },
    spinner: {
      color: '#848884',
    },
  },
};
