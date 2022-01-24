import { useContract } from './useContract';
import { erc20Abi } from '../abi/ERC20';
import { Contract } from 'ethers';

export const useERC20 = (address: string): Contract => {
  return useContract(address, erc20Abi);
};
