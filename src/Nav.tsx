import React from 'react';
import { Box } from 'theme-ui';
import { Button, Text } from './components';
import { getShortenedAddress } from './util/util';
import { useEthersStore } from './hooks/useEthers';
import { Link } from 'react-router-dom';

export const Nav: React.FC = () => {
  const { establishConnection, connected, address } = useEthersStore();

  return (
    <Box
      sx={{
        padding: 24,
        backgroundColor: 'navColor',
        display: 'flex',
        justifyContent: 'flex-end',
      }}
    >
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
          sx={{ backgroundColor: 'buttonPrimary' }}
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
  );
};
