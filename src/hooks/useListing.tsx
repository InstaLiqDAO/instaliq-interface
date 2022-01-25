import React, {
  createContext,
  ReactNode,
  useContext,
  useEffect,
  useState,
} from 'react';
import { ListingData } from '../constant/types';
import {
  fetchListingData,
  useInitialLiquidityPool,
} from './useInitialLiquidityPool';

interface IListingContext {
  listingData: ListingData;
  refreshListingData: () => void;
}

const context = createContext<IListingContext>(undefined);

export const ListingProvider: React.FC<{
  children: ReactNode;
  value: IListingContext;
}> = ({ children, value }) => (
  <context.Provider value={value}>{children}</context.Provider>
);

export const useListing = (listingAddress: string): IListingContext => {
  const listingContract = useInitialLiquidityPool(listingAddress);
  const [listingData, setListingData] = useState(
    undefined as ListingData | undefined
  );

  const refreshListingData = async () => {
    // TODO: optimize this instead of always fetching everything
    const listingData = await fetchListingData(listingContract);

    setListingData(listingData);
  };

  useEffect(() => {
    if (listingContract) {
      refreshListingData();
    }
  }, [listingContract]);

  return {
    listingData,
    refreshListingData,
  };
};

export const useListingStore = (): IListingContext => {
  const listingStore = useContext(context);
  if (!listingStore) {
    throw new Error('useEthers: context init error');
  }
  return listingStore;
};
