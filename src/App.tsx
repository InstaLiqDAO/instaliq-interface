import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box, ThemeProvider } from 'theme-ui';

import { useEthers } from './hooks/useEthers';
import { EthersProvider } from './hooks/useEthers';
import { Home } from './pages/Home/Home';
import { theme } from './config/theme';

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <EthersProvider value={useEthers()}>
        <BrowserRouter>
          <Inner />
        </BrowserRouter>
      </EthersProvider>
    </ThemeProvider>
  );
};

const Inner: React.FC = () => {
  return (
    <Box sx={{ backgroundColor: 'background' }}>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </Box>
  );
};

export default App;
