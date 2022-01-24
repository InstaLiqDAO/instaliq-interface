import { BigNumber, Contract } from 'ethers';
import React, { useEffect, useState } from 'react';
import { Box, Input } from 'theme-ui';
import { Text, Button } from '../../components';
import { useERC20 } from '../../hooks/useERC20';
import { useEthers } from '../../hooks/useEthers';
import { ListingData } from './Listings';

type ERC20Data = {
  allowance: BigNumber;
  balance: BigNumber;
};

export const BidForm: React.FC<{ listing: ListingData }> = ({ listing }) => {
  const erc20 = useERC20(listing.referenceToken);
  const { address } = useEthers();
  const [bidValue, setBidValue] = useState(undefined as BigNumber | undefined);
  const [erc20Data, setERC20Data] = useState(
    undefined as ERC20Data | undefined
  );

  async function approve(amount: BigNumber) {
    const tx1 = await erc20.approve(listing.contract.address, amount);
    await tx1.wait();

    await getERC20Data(erc20, address);
  }

  async function placeBid(amount: BigNumber) {
    const tx = await listing.contract.placeBid(amount);
    await tx.wait();

    await getERC20Data(erc20, address);
    setBidValue(undefined);
  }

  async function getERC20Data(erc20: Contract, address: string) {
    const data = await Promise.all([
      erc20.allowance(address, listing.contract.address),
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
        <Input
          sx={{
            backgroundColor: 'white',
            '::-webkit-inner-spin-button': {
              '-webkit-appearance': 'none',
              margin: 0,
            },
            '::-webkit-outer-spin-button': {
              '-webkit-appearance': 'none',
              margin: 0,
            },
          }}
          type="number"
          value={bidValue ? bidValue.toNumber() : undefined}
          onChange={(e) =>
            e.target.value
              ? setBidValue(BigNumber.from(e.target.value))
              : setBidValue(undefined)
          }
        />
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
    </Box>
  );
};
