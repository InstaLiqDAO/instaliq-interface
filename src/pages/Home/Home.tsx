import React, { useEffect, useState } from 'react';
import { Box } from 'theme-ui';

import { useEthersStore } from '../../hooks/useEthers';
import { Text, Button } from '../../components';
import { useILSListingHub } from '../../hooks/useILSListingHub';
import { Listings } from './Listings';

export const Home: React.FC = () => {
  const { establishConnection, connected, address, signer } = useEthersStore();
  const ilsListingHub = useILSListingHub();
  const [listings, setListings] = useState([] as string[]);

  const getListings = async () => {
    // const tx = await ilsListingHub.createInitialLiquidityPool(
    //   'testToken',
    //   'TEST',
    //   1000,
    //   0,
    //   '0xc778417e063141139fce010982780140aa0cd5ab',
    //   Date.now(),
    //   0
    // );

    //await tx.wait();

    setListings(await ilsListingHub.getListings());
  };
  useEffect(() => {
    if (connected && signer) {
      getListings();
    }
  }, [connected, signer]);

  return (
    <Box sx={{ mt: 24, ml: 24 }}>
      <Button
        variant="primary"
        disabled={connected}
        onClick={establishConnection}
      >
        <Text variant="primary">{connected ? address : 'Connect wallet'}</Text>
      </Button>
      {listings.length && <Listings listings={listings} />}
    </Box>
  );
};
