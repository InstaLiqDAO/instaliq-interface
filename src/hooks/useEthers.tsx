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
  provider: ethers.providers.JsonRpcProvider;
  signer?: Signer;
  address?: string;
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
  const [provider, setProvider] = useState(
    new ethers.providers.CloudflareProvider() as ethers.providers.JsonRpcProvider
  );
  const [address, setAddress] = useState(undefined);

  // TODO: Add loading state to fix stutter
  useEffect(() => {
    const getInitialProvider = async () => {
      const provider = new ethers.providers.Web3Provider(
        (window as any).ethereum
      );
      if (provider) {
        const accounts = await provider.listAccounts();
        if (accounts.length > 0) {
          const signer = provider.getSigner();
          const address = await signer.getAddress();
          setProvider(provider);
          setConnected(true);
          setSigner(signer);
          setAddress(address);
        }
      }
    };

    getInitialProvider();
  }, []);

  async function establishConnection() {
    const provider = new ethers.providers.Web3Provider(
      (window as any).ethereum
    );
    await provider?.send('eth_requestAccounts', []);
    const signer = provider.getSigner();
    const address = await signer.getAddress();
    setConnected(true);
    setProvider(provider);
    setSigner(signer);
    setAddress(address);
  }

  return {
    establishConnection,
    connected,
    provider,
    signer,
    address,
  };
};

export const useEthersStore = (): IEthersContext => {
  const ethersStore = useContext(context);
  if (!ethersStore) {
    throw new Error('useEthers: context init error');
  }
  return ethersStore;
};
