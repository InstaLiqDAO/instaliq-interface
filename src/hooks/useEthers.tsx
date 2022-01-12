import { ethers, Signer } from 'ethers';
import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';

interface IEthersContext {
  establishConnection: () => void;
  connected: boolean;
  signer?: Signer;
}

const context = createContext<IEthersContext>(undefined);

export const EthersProvider: React.FC<{
  children: ReactNode;
  value: IEthersContext;
}> = ({ children, value }) => (
  <context.Provider value={value}>{children}</context.Provider>
);

export const useEthers = (): IEthersContext => {
  const [connected, setConnected] = useState(false);
  const [signer, setSigner] = useState(undefined);

  async function establishConnection() {
    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum
    );
    await provider.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    console.log('Account:', await signer.getAddress());

    setConnected(true);
    setSigner(signer);
  }

  return {
    establishConnection,
    connected,
    signer,
  };
};

export const useEthersStore = (): IEthersContext => {
  const ethersStore = useContext(context);
  if (!ethersStore) {
    throw new Error('useEthers: context init error');
  }
  return ethersStore;
};
