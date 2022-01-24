export const initialLiquidityPoolAbi = [
    'function name() view returns (string memory)',
    'function symbol() view returns (string memory)',
    'function referenceToken() view returns (address)',
    'function totalBid() view returns (uint256)',

    'function placeBid(uint256 amount) returns (bool)',
    'function withdrawBid(uint256 amount) external returns (bool)'
];
  