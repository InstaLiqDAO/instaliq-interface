import { Contract } from 'ethers';
import { useMemo } from 'react';
import { useEthersStore } from './useEthers';

export const useContractReadOnly = (address: string, abi: any): Contract => {
  const { provider } = useEthersStore();
  return useMemo(() => {
    return new Contract(address, abi, provider);
  }, [address, abi, provider]);
};

export const useContractWithSigner = (
  address: string,
  abi: any
): Contract | undefined => {
  const { signer, connected } = useEthersStore();
  return useMemo(() => {
    return connected ? new Contract(address, abi, signer) : undefined;
  }, [address, abi, signer]);
};
