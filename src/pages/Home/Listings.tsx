import React, { useEffect, useState } from 'react';
import { Contract } from 'ethers';
import { Box, Card } from 'theme-ui';
import { useInitialLiquidityPoolList } from '../../hooks/useInitialLiquidityPool';
import { Text } from '../../components';
import { BidForm } from './BidForm';

export type ListingData = {
  name: string;
  symbol: string;
  referenceToken: string;
  contract: Contract;
};

export const Listings: React.FC<{ listings: string[] }> = ({ listings }) => {
  const listingContracts = useInitialLiquidityPoolList(listings);
  const [listingData, setListingData] = useState([] as ListingData[]);

  const getListingData = async (listings: Contract[]) => {
    const listingDataPromises = listings.map((listing) => {
      return Promise.all([
        listing.name(),
        listing.symbol(),
        listing.referenceToken(),
        listing,
      ]);
    });
    const listingData = (await Promise.all(listingDataPromises)).map(
      (listing) => {
        return {
          name: listing[0],
          symbol: listing[1],
          referenceToken: listing[2],
          contract: listing[3],
        };
      }
    );

    setListingData(listingData);
  };

  useEffect(() => {
    if (listingContracts) {
      getListingData(listingContracts);
    }
  }, [listingContracts]);

  return (
    <Box sx={{ mt: 56 }}>
      <Box sx={{ mb: 24 }}>
        <Text variant="primary" sx={{ fontSize: 32 }}>
          Listings
        </Text>
      </Box>
      {listingData.map((listing, i) => {
        return (
          <Box key={`listing-${i}`} sx={{ mb: 24 }}>
            <Card sx={{ maxWidth: 500, minHeight: 180 }}>
              <Listing listing={listing} />
            </Card>
          </Box>
        );
      })}
    </Box>
  );
};

export const Listing: React.FC<{ listing: ListingData }> = ({ listing }) => {
  return (
    <>
      <Box sx={{ mb: 12 }}>
        <Text variant="primary" sx={{ fontSize: 24 }}>
          {listing.name}
        </Text>
      </Box>
      <Box sx={{ mb: 12 }}>
        <Text variant="primary">{listing.symbol}</Text>
      </Box>
      <Box sx={{ mt: 24, display: 'flex' }}>
        <BidForm listing={listing}/>
      </Box>
    </>
  );
};
