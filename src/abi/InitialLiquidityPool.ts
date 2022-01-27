export const initialLiquidityPoolAbi = [
    'function name() view returns (string memory)',
    'function symbol() view returns (string memory)',
    'function referenceToken() view returns (address)',
    'function totalBid() view returns (uint256)',
    'function totalSupply() view returns (uint256)',
    'function currentPrice() view returns (uint256)',
    'function devReserveTokenNumber() view returns (uint256)',
    'function getBid() view returns (uint256)',
    'function getAllBids() view returns (uint[] memory)',

    'function placeBid(uint256 amount) returns (bool)',
    'function withdrawBid(uint256 amount) returns (bool)',
    'function withdrawBid(uint256 amount) external returns (bool)'
];
  