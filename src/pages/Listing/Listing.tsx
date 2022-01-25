import { BigNumber, Contract } from 'ethers';
import {
  fetchListingData,
  useInitialLiquidityPool,
} from '../../hooks/useInitialLiquidityPool';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { Box, Card, Divider } from 'theme-ui';
import { ListingData } from '../../constant/types';
import { BidForm } from './BidForm';
import { Text } from '../../components';
import { WithdrawForm } from './WithdrawForm';
import { formatEther } from '../../util/util';
import {
  ListingProvider,
  useListing,
  useListingStore,
} from '../../hooks/useListing';

export const Listing: React.FC = () => {
  const [searchParams, _] = useSearchParams();
  const listingAddress = searchParams.get('address');

  return (
    <ListingProvider value={useListing(listingAddress)}>
      <Inner />
    </ListingProvider>
  );
};

const Inner: React.FC = () => {
  const [searchParams, _] = useSearchParams();
  const listingAddress = searchParams.get('address');
  const { listingData } = useListingStore();

  return listingData ? (
    <Box sx={{ margin: 24, display: 'flex', flexDirection: 'row' }}>
      <Box sx={{ margin: 12, flex: 2 }}>
        <Card>
          <Box sx={{ margin: 24 }}>
            <Text variant="primary" sx={{ fontSize: 24 }}>
              InstaLiq Token Listing
            </Text>
          </Box>
          <Box sx={{ ml: 24, mr: 24, mb: 24 }}>
            <TableItem header="Name" data="InstaLiq Token" />
            <Divider />
            <TableItem header="Symbol" data="LIQ" />
            <Divider />
            <TableItem header="Listing Address" data={listingAddress} />
            <Divider />
            <TableItem
              header="Total Bid"
              data={`${formatEther(listingData.totalBid)} WETH`}
            />
            <Divider />
            <TableItem
              header="Total Supply for Liquidity"
              data={listingData.totalSupply.toString()}
            />
            <Divider />
            <TableItem
              header="Current Price"
              data={`${formatEther(listingData.currentPrice)} WETH`}
            />
            <Divider />
            <TableItem
              header="Supply Reserved for Team"
              data={listingData.devReserve.toString()}
            />
            <Divider />
            <TableItem
              header="Your Bid"
              data={`${formatEther(listingData.userBid)} WETH`}
            />
          </Box>
        </Card>
      </Box>
      <Box
        sx={{ margin: 12, flex: 1, display: 'flex', flexDirection: 'column' }}
      >
        <Card sx={{ padding: 24, mb: 24 }}>
          <Box sx={{ mb: 12 }}>
            <Text variant="primary">Place bids for LIQ</Text>
          </Box>
          <BidForm />
        </Card>
        {listingData.userBid.gt(0) && (
          <Card sx={{ padding: 24 }}>
            <Box sx={{ mb: 12 }}>
              <Text variant="primary">Withdraw</Text>
            </Box>
            <WithdrawForm />
          </Card>
        )}
      </Box>
    </Box>
  ) : null;
};

const TableItem: React.FC<{
  header: string;
  data: string | number;
}> = ({ header, data }) => {
  return (
    <Box sx={{ mt: 12, display: 'flex', justifyContent: 'space-between' }}>
      <Box>
        <Text variant="primary">{header}</Text>
      </Box>
      <Box>
        <Text variant="primary" sx={{ alignSelf: 'flex-end' }}>
          {data}
        </Text>
      </Box>
    </Box>
  );
};
