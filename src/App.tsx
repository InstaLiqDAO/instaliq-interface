import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Box, ThemeProvider } from 'theme-ui';

import { useEthers } from './hooks/useEthers';
import { EthersProvider } from './hooks/useEthers';
import { Home } from './pages/Home/Home';
import { theme } from './config/theme';
import { Listing } from './pages/Listing/Listing';
import { Nav } from './Nav';
import { ArcElement, BarController, BarElement, CategoryScale, Chart, DoughnutController, LinearScale, Tooltip } from 'chart.js';

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
  useEffect(() => {
    Chart.register(DoughnutController);
    Chart.register(ArcElement);
    Chart.register(Tooltip);
    Chart.register(BarController);
    Chart.register(LinearScale);
    Chart.register(CategoryScale);
    Chart.register(BarElement);
  }, []);

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
