import { useContract } from './useContract';
import { Contract } from 'ethers';
import { initialLiquidityPoolAbi } from '../abi/InitialLiquidityPool';
import { ListingData } from '../constant/types';

export const useInitialLiquidityPoolList = (
  addresses: string[]
): Contract[] => {
  return addresses.map((address) =>
    useContract(address, initialLiquidityPoolAbi)
  );
};

export const useInitialLiquidityPool = (address: string): Contract => {
  return useContract(address, initialLiquidityPoolAbi);
};

export async function fetchListingData(
  listing: Contract
): Promise<ListingData> {
  const listingData = await Promise.all([
    listing.name(),
    listing.symbol(),
    listing.referenceToken(),
    listing.totalBid(),
    listing.totalSupply(),
    listing.currentPrice(),
    listing.devReserveTokenNumber(),
    listing.getBid(),
    listing.getAllBids()
  ]);

  return {
    name: listingData[0],
    symbol: listingData[1],
    referenceToken: listingData[2],
    totalBid: listingData[3],
    totalSupply: listingData[4],
    currentPrice: listingData[5],
    devReserve: listingData[6],
    userBid: listingData[7],
    allBids: listingData[8],
    contract: listing,
  };
}
