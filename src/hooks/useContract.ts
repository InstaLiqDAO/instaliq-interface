import { Contract, ContractInterface } from 'ethers';
import { useMemo } from 'react';
import { useEthersStore } from './useEthers';

export const useContract = (
  address: string,
  abi: ContractInterface
): Contract => {
  const { provider, connected, signer } = useEthersStore();
  return useMemo(() => {
    if (!provider) {
      return undefined;
    }
    return new Contract(address, abi, connected && signer ? signer : provider);
  }, [address, abi, provider, connected, signer]);
};
