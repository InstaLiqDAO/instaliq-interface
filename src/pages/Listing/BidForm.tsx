import { BigNumber, Contract } from 'ethers';
import React, { useEffect, useState } from 'react';
import { Box } from 'theme-ui';
import { formatEther } from '../../util/util';
import { Text, Button, TokenInput } from '../../components';
import { useERC20 } from '../../hooks/useERC20';
import { useEthers } from '../../hooks/useEthers';
import { useListingStore } from '../../hooks/useListing';

type ERC20Data = {
  allowance: BigNumber;
  balance: BigNumber;
};

export const BidForm: React.FC = () => {
  const { listingData, refreshListingData } = useListingStore()
  const erc20 = useERC20(listingData.referenceToken);
  const { address } = useEthers();
  const [bidValue, setBidValue] = useState(undefined as BigNumber | undefined);
  const [erc20Data, setERC20Data] = useState(
    undefined as ERC20Data | undefined
  );

  async function approve(amount: BigNumber) {
    const tx1 = await erc20.approve(listingData.contract.address, amount);
    await tx1.wait();

    await getERC20Data(erc20, address);
  }

  async function placeBid(amount: BigNumber) {
    const tx = await listingData.contract.placeBid(amount);
    await tx.wait();

    await getERC20Data(erc20, address);
    await refreshListingData();
    setBidValue(undefined);
  }

  async function getERC20Data(erc20: Contract, address: string) {
    const data = await Promise.all([
      erc20.allowance(address, listingData.contract.address),
      erc20.balanceOf(address),
    ]);

    setERC20Data({
      allowance: data[0],
      balance: data[1],
    });
  }

  useEffect(() => {
    if (erc20 && address) {
      getERC20Data(erc20, address);
    }
  }, [erc20, address]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ mb: '8px' }}>
        <TokenInput value={bidValue} setValue={setBidValue} />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <Box sx={{ flex: 1, display: 'flex', mr: '4px' }}>
          <Button
            sx={{ flex: 1 }}
            variant="primary"
            onClick={() => approve(bidValue)}
            disabled={
              !bidValue || !(erc20Data && erc20Data.balance.gte(bidValue))
            }
          >
            <Text variant="primary">Approve</Text>
          </Button>
        </Box>
        <Box sx={{ flex: 1, display: 'flex', ml: '4px' }}>
          <Button
            sx={{ flex: 1 }}
            variant="primary"
            onClick={() => placeBid(bidValue)}
            disabled={
              !bidValue || !(erc20Data && erc20Data.allowance.gte(bidValue))
            }
          >
            <Text variant="primary">Bid</Text>
          </Button>
        </Box>
      </Box>
      {erc20Data && (
        <Box sx={{ mt: 12 }}>
          <Text variant="primary" sx={{ fontSize: 14 }}>
            {`Available WETH: ${formatEther(erc20Data.balance)}`}
          </Text>
        </Box>
      )}
    </Box>
  );
};
