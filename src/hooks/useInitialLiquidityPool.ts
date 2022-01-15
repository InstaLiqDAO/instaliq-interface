import { useContract } from './useContract';
import { Contract } from 'ethers';
import { initialLiquidityPoolAbi } from '../abi/InitialLiquidityPool';

export const useInitialLiquidityPoolList = (addresses: string[]): Contract[] => {
  return addresses.map((address) =>
    useContract(address, initialLiquidityPoolAbi)
  );
};
