import {
  Chart,
  ChartItem,
} from 'chart.js';
import React, { useEffect, useState } from 'react';
import { Box, Card } from 'theme-ui';
import { Text } from '../../components';
import { useListingStore } from '../../hooks/useListing';

const ColorBox: React.FC<{ color: string }> = ({ color }) => {
  return <Card sx={{ backgroundColor: color, height: 8, width: 8 }} />;
};

const labels = [
  {
    label: 'Bidders',
    color: '#277344',
  },
  {
    label: 'Liquidity',
    color: '#86ac93',
  },
  {
    label: 'Team',
    color: '#5baa47',
  },
];

export const DistributionChart: React.FC = () => {
  const { listingData } = useListingStore();
  const [chart, setChart] = useState(undefined as Chart | undefined);

  useEffect(() => {
    if (chart) {
      chart.destroy();
    }
    const ctx = document.getElementById('distributionChart') as ChartItem;
    setChart(
      new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: [labels[0].label, labels[1].label, labels[2].label],
          datasets: [
            {
              label: 'My First Dataset',
              data: [
                listingData.totalSupply.toNumber() / 2,
                listingData.totalSupply.toNumber() / 2,
                listingData.devReserve.toNumber(),
              ],
              backgroundColor: [
                labels[0].color,
                labels[1].color,
                labels[2].color,
              ],
              hoverOffset: 4,
            },
          ],
        },
        options: {
          responsive: false,
          maintainAspectRatio: false,
          cutout: '60%',
          layout: {
            padding: 20,
          },
          elements: {
            arc: {
              borderWidth: 0,
            },
          },
          plugins: {
            tooltip: {
              enabled: true,
              displayColors: false,
            },
          },
        },
      })
    );
  }, [listingData]);

  const LabelItem: React.FC<{
    label: string;
    color: string;
  }> = ({ label, color }) => {
    return (
      <Box sx={{ mt: 12, display: 'flex', alignItems: 'center' }}>
        <ColorBox color={color} />
        <Box sx={{ ml: '8px' }}>
          <Text variant="primary">{label}</Text>
        </Box>
      </Box>
    );
  };

  return (
    <Box>
      <Box sx={{ mt: 48, mb: 24 }}>
        <Text variant="primary" sx={{ fontSize: 24 }}>
          Token Distribution
        </Text>
      </Box>
      <Box
        sx={{ display: 'flex', justifyContent: 'space-between', margin: 48 }}
      >
        <Box sx={{ height: 300, width: 300 }}>
          <canvas id="distributionChart" />
        </Box>
        <Card
          variant="secondary"
          sx={{ alignSelf: 'center', height: 150, display: 'flex' }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              pl: 40,
              pr: 40,
              justifyContent: 'center',
            }}
          >
            {labels.map((label, i) => (
              <LabelItem key={i} label={label.label} color={label.color} />
            ))}
          </Box>
        </Card>
      </Box>
    </Box>
  );
};
