import { BigNumber } from 'ethers';
import React, { useState } from 'react';
import { Box, Spinner } from 'theme-ui';
import { formatEther } from '../../util/util';
import { Text, Button, TokenInput } from '../../components';
import { useListingStore } from '../../hooks/useListing';

export const WithdrawForm: React.FC = () => {
  const { listingData, refreshListingData } = useListingStore();
  const [withdrawValue, setWithdrawValue] = useState(
    undefined as BigNumber | undefined
  );
  const [withdrawLoading, setWithdrawLoading] = useState(false);

  async function withdrawBid(amount: BigNumber) {
    const tx = await listingData.contract.withdrawBid(amount);
    setWithdrawLoading(true);
    await tx.wait();

    await refreshListingData();
    setWithdrawLoading(false);
    setWithdrawValue(undefined);
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column' }}>
      <Box sx={{ mb: '8px' }}>
        <TokenInput value={withdrawValue} setValue={setWithdrawValue} />
      </Box>
      <Box sx={{ display: 'flex', flexDirection: 'row' }}>
        <Box sx={{ flex: 1, display: 'flex' }}>
          <Button
            sx={{ flex: 1 }}
            variant="primary"
            onClick={() => withdrawBid(withdrawValue)}
            disabled={
              !(
                withdrawValue &&
                withdrawValue.gt(0) &&
                listingData.userBid.gte(withdrawValue)
              )
            }
          >
            {withdrawLoading ? (
              <Spinner size={17} />
            ) : (
              <Text variant="primary">Withdraw</Text>
            )}
          </Button>
        </Box>
      </Box>
      <Box sx={{ mt: 12 }}>
        <Text variant="primary" sx={{ fontSize: 14 }}>
          {`Available WETH Bid: ${formatEther(listingData.userBid)}`}
        </Text>
      </Box>
    </Box>
  );
};
