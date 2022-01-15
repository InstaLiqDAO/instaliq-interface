import { useContract } from './useContract';
import { appConfig } from '../config/config';
import { ilsListingHubAbi } from '../abi/ILSListingHub';
import { Contract } from 'ethers';

export const useILSListingHub = (): Contract => {
  return useContract(appConfig.ropsten.ILSListingHubAddress, ilsListingHubAbi);
};
