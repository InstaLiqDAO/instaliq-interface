import React from 'react';
import { Link } from 'react-router-dom';
import { Box } from 'theme-ui';
import { Button, Text } from './components';
import { getShortenedAddress } from './util/util';
import { useEthersStore } from './hooks/useEthers';
import instaliqLogo from './assets/instaliq-logo.png';

export const Nav: React.FC = () => {
  const { establishConnection, connected, address } = useEthersStore();

  return (
    <Box
      sx={{
        padding: 24,
        backgroundColor: 'navColor',
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Box sx={{ flex: 1 }}>
        <img src={instaliqLogo} width="160px" />
      </Box>
      <Box sx={{ flex: 1, display: 'flex', justifyContent: 'flex-end' }}>
        <Box sx={{ alignSelf: 'center', mr: 32 }}>
          <Link to="/">
            <Text variant="primary">Home</Text>
          </Link>
        </Box>
        <Box sx={{ alignSelf: 'center', mr: 32 }}>
          <Link to="/">
            <Text variant="primary">Listings</Text>
          </Link>
        </Box>
        <Box sx={{ alignSelf: 'center', mr: 32 }}>
          <Link to="/">
            <Text variant="primary">Launchpad</Text>
          </Link>
        </Box>
        <Box>
          <Button
            sx={{ backgroundColor: 'buttonAddress' }}
            variant="primary"
            disabled={connected}
            onClick={establishConnection}
          >
            <Text variant="primary">
              {connected ? getShortenedAddress(address) : 'Connect wallet'}
            </Text>
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
