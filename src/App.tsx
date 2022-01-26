import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box, ThemeProvider } from 'theme-ui';

import { useEthers } from './hooks/useEthers';
import { EthersProvider } from './hooks/useEthers';
import { Home } from './pages/Home/Home';
import { theme } from './config/theme';
import { Listing } from './pages/Listing/Listing';
import { Nav } from './Nav';

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
    <Box sx={{ backgroundImage: 'linear-gradient(to bottom right, #222222 39%, #1b4748)', paddingBottom: 250}}>
      <Nav/>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/listing" element={<Listing />} />
      </Routes>
    </Box>
  );
};

export default App;
