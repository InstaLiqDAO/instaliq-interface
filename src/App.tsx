import { useEthers, useEthersStore } from './hooks/useEthers';
import { EthersProvider } from './hooks/useEthers';
import React from 'react';

const App: React.FC = () => {
  return (
    <EthersProvider value={useEthers()}>
      <Inner />
    </EthersProvider>
  );
};

const Inner: React.FC = () => {
  const { establishConnection, connected } = useEthersStore();
  return (
    <>
      <button disabled={connected} onClick={establishConnection}>Connect wallet</button>
      {connected ? (
        <div>Connected to wallet</div>
      ) : (
        <div>Not connected to wallet</div>
      )}
    </>
  );
};
export default App;
