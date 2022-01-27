import { BigNumber, Contract } from 'ethers';

export type ListingData = {
  name: string;
  symbol: string;
  referenceToken: string;
  totalBid: BigNumber;
  totalSupply: BigNumber;
  currentPrice: BigNumber;
  devReserve: BigNumber;
  userBid: BigNumber;
  allBids: BigNumber[];
  contract: Contract;
};
