import React, { useEffect, useState } from 'react';
import { Box, Card } from 'theme-ui';

import { useEthersStore } from '../../hooks/useEthers';
import { Text, Button } from '../../components';
import { useILSListingHub } from '../../hooks/useILSListingHub';
import { getShortenedAddress } from '../../util/util';
import {
  fetchListingData,
  useInitialLiquidityPool,
} from '../../hooks/useInitialLiquidityPool';
import { ListingData } from '../../constant/types';
import { Contract } from 'ethers';

export const Home: React.FC = () => {
  const { establishConnection, connected, address, signer } = useEthersStore();
  const ilsListingHub = useILSListingHub();
  const [listings, setListings] = useState([] as string[]);

  const getListings = async () => {
    // const tx = await ilsListingHub.createInitialLiquidityPool(
    //   'InstaLiq Token',
    //   'LIQ',
    //   200000000,
    //   0,
    //   '0xc778417e063141139fce010982780140aa0cd5ab',
    //   Date.now() - 100000,
    //   0
    // );

    // await tx.wait();

    setListings(await ilsListingHub.getListings());
  };
  useEffect(() => {
    if (connected && signer) {
      getListings();
    }
  }, [connected, signer]);

  console.log(listings);

  return (
    <Box sx={{ margin: 24 }}>
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
      {listings.length && <LiqLaunch liqListing={listings[0]} />}
    </Box>
  );
};

const LiqLaunch: React.FC<{ liqListing: string }> = ({ liqListing }) => {
  const listingContracts = useInitialLiquidityPool(liqListing);
  const [listingData, setListingData] = useState(
    undefined as ListingData | undefined
  );

  const getListingData = async (liqListing: Contract) => {
    const listingData = await fetchListingData(liqListing);

    setListingData(listingData);
  };

  useEffect(() => {
    if (listingContracts) {
      getListingData(listingContracts);
    }
  }, [listingContracts]);

  return listingData ? (
    <Box sx={{ margin: 100 }}>
      <Card>
        <Box sx={{ margin: 12, textAlign: 'center' }}>
          <Text variant="primary" sx={{ fontSize: 36, fontWeight: 500 }}>
            InstaLiq Token Launch
          </Text>
        </Box>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            margin: 24,
            alignItems: 'center',
          }}
        >
          <Box sx={{ margin: 12 }}>
            <Text variant="primary" sx={{ fontSize: 16 }}>
              Time until token launch
            </Text>
          </Box>
          <Box sx={{ mb: 12 }}>
            <Text variant="primary" sx={{ fontSize: 24 }}>
              000:00:00:00
            </Text>
          </Box>
          <Box sx={{ margin: 12 }}>
            <Text variant="primary" sx={{ fontSize: 16 }}>
              Total bid placed
            </Text>
          </Box>
          <Box sx={{ mb: 24 }}>
            <Text variant="primary" sx={{ fontSize: 24 }}>
              {listingData.totalBid.toString()} ETH
            </Text>
          </Box>
          <Box sx={{ margin: 12 }}>
            <Button variant="primary" onClick={() => {}}>
              <Text variant="primary">Launch details</Text>
            </Button>
          </Box>
        </Box>
      </Card>
    </Box>
  ) : null;
};
