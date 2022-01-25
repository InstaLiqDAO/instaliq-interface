import { BigNumber } from "ethers";
import { formatEther as ethersFormatter } from 'ethers/lib/utils';

export function getShortenedAddress(address: string | undefined) {
  if (!address) {
    return '';
  }

  return (
    address.substring(0, 5) +
    '...' +
    address.substring(address.length - 5, address.length)
  );
}

export function formatEther(number: BigNumber) {
    const maxLength = 10;
    return ethersFormatter(number).substring(0, maxLength);
}
