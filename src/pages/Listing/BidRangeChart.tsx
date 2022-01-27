import { Chart, ChartItem } from 'chart.js';
import { BigNumber } from 'ethers';
import { BigNumber as BigDecimal } from 'bignumber.js';
import React, { useEffect, useMemo, useState } from 'react';
import { Badge, Box } from 'theme-ui';
import { Text } from '../../components';
import { useListingStore } from '../../hooks/useListing';
import { formatEther, parseEther } from 'ethers/lib/utils';

const labels = [
  {
    label: '< .01 WETH',
    color: 'rgba(23, 123, 189, 1)',
  },
  {
    label: '.01-.1 WETH',
    color: 'rgba(51, 181, 229, 1)',
  },
  {
    label: '.1-1 WETH',
    color: 'rgba(0, 160, 160, 1)',
  },
  {
    label: '1-10 WETH',
    color: 'rgba(146, 218, 211, 1)',
  },
];

const bidBuckets = [
  [parseEther('0'), parseEther('0.01')],
  [parseEther('0.01'), parseEther('0.1')],
  [parseEther('0.1'), parseEther('1')],
  [parseEther('1'), parseEther('10')],
];

const fairnessVals = {
  fair: {
    label: 'Fair',
    color: 'positive',
  },
  unfair: {
    label: 'Unfair',
    color: 'negative',
  },
};

function getFairness(bids: BigNumber[], totalBid: BigNumber): string {
  // sort desc
  const sortedBids = bids.sort((bid1: BigNumber, bid2: BigNumber) => {
    if (bid1.lt(bid2)) {
      return 1;
    }
    if (bid1.gt(bid2)) {
      return -1;
    }
    return 0;
  });

  let sum = BigNumber.from(0);
  let fairness = '';
  sortedBids.some((value: BigNumber, i: number) => {
    sum = sum.add(value);
    const sumPercent = new BigDecimal(formatEther(sum)).div(
      new BigDecimal(formatEther(totalBid))
    );
    if (sumPercent.gte(new BigDecimal(0.8))) {
        console.log(i + 1);
        console.log((i + 1) / bids.length <= 0.2);
      if ((i + 1) / bids.length <= 0.2) {
        fairness = 'unfair';
        return true;
      } else {
        fairness = 'fair';
        return true;
      }
    }
  });
  return fairness;
}

const FairnessBadge: React.FC = () => {
  const { listingData } = useListingStore();
  const [fairness, setFairness] = useState(undefined as string | undefined);
  useEffect(() => {
    setFairness(getFairness(listingData.allBids, listingData.totalBid));
  }, [listingData]);
  return fairness ? (
    <Badge
      variant={fairnessVals[fairness].color}
      sx={{ pt: '4px', pb: '4px', pl: 12, pr: 12 }}
    >
      <Text variant="primary" sx={{ fontWeight: 400 }}>
        {fairnessVals[fairness].label}
      </Text>
    </Badge>
  ) : null;
};

export const BidRangeChart: React.FC = () => {
  const { listingData } = useListingStore();
  const [chart, setChart] = useState(undefined as Chart | undefined);

  const bidRangeCounts = useMemo(() => {
    const buckets = Array(bidBuckets.length).fill(0);
    listingData.allBids.forEach((value: BigNumber) => {
      bidBuckets.forEach((bucket, i) => {
        if (value.gt(bucket[0]) && value.lte(bucket[1])) {
          buckets[i]++;
        }
      });
    });
    return buckets;
  }, [listingData]);

  useEffect(() => {
    if (chart) {
      chart.destroy();
    }
    const ctx = document.getElementById('bidRangeChart') as ChartItem;
    setChart(
      new Chart(ctx, {
        type: 'bar',

        data: {
          labels: labels.map((label) => label.label),
          datasets: [
            {
              label: 'Bidders',
              // using dummy data for now, but is retrievable from listingData.allBids
              data: bidRangeCounts,
              backgroundColor: labels.map((label) => label.color),
              // borderColor: [
              //   'rgba(23, 123, 189, 1)',
              //   'rgba(51, 181, 229, 1)',
              //   'rgba(0, 160, 160, 1)',
              //   'rgba(146, 218, 211, 1)',
              // ],
              borderWidth: 1,
            },
          ],
        },
        options: {
          plugins: {
            tooltip: {
              enabled: true,
              displayColors: false,
            },
          },
          scales: {
            x: {
              ticks: {
                color: 'white',
              },
            },
            y: {
              beginAtZero: true,
              ticks: {
                color: 'white',
              },
            },
          },
        },
      })
    );
  }, [listingData]);

  return listingData ? (
    <Box>
      <Box sx={{ mt: 48 }}>
        <Text variant="primary" sx={{ fontSize: 24 }}>
          Bidding Distribution
        </Text>
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 36 }}>
        <Box sx={{ height: 500, width: 500 }}>
          <Box sx={{ margin: 12, display: 'flex', justifyContent: 'flex-end' }}>
            <FairnessBadge />
          </Box>
          <canvas id="bidRangeChart" />
        </Box>
      </Box>
    </Box>
  ) : null;
};
