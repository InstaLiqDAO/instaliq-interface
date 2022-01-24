import { BigNumber, Contract } from 'ethers';

export type ListingData = {
  name: string;
  symbol: string;
  referenceToken: string;
  totalBid: BigNumber;
  contract: Contract;
};
