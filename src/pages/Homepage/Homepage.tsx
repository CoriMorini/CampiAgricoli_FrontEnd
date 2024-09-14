import { IconCapsuleHorizontal } from '@tabler/icons-react';
import { Flex } from '@mantine/core';
import { Navbar } from '@/components/Navbar/Navbar';
import { RingCard } from '@/components/RingCard/RingCard';
import { StatsControls } from '@/components/StatsControls/StatsControls';
import { StatsGrid } from '@/components/StatsGrid/StatsGrid';
import { LineChart } from '@mantine/charts';

const data = [
  { date: 'Jan', temperature: -25 },
  { date: 'Feb', temperature: -10 },
  { date: 'Mar', temperature: 5 },
  { date: 'Apr', temperature: 15 },
  { date: 'May', temperature: 30 },
  { date: 'Jun', temperature: 15 },
  { date: 'Jul', temperature: 30 },
  { date: 'Aug', temperature: 40 },
  { date: 'Sep', temperature: 15 },
  { date: 'Oct', temperature: 20 },
  { date: 'Nov', temperature: 0 },
  { date: 'Dec', temperature: -10 },
];

export function HomePage() {
  return (
    <div>
      <Flex
        mih={50}
        justify="flex-start"
        align="flex-start"
        direction="row"
        wrap="nowrap"
        flex="1"
      >
        <Navbar />
        <Flex
          mih={50}
          gap="xl"
          justify="center"
          align="center"
          direction="row"
          wrap="wrap"
          flex="2"
        >
          <RingCard />
          <RingCard />
          <RingCard />
          <StatsGrid />
          <StatsControls />
          <LineChart
            h={300}
            data={data}
            series={[{ name: 'temperature', label: 'Avg. Temperature' }]}
            dataKey="date"
            type="gradient"
            gradientStops={[
              { offset: 0, color: 'red.6' },
              { offset: 20, color: 'orange.6' },
              { offset: 40, color: 'yellow.5' },
              { offset: 70, color: 'lime.5' },
              { offset: 80, color: 'cyan.5' },
              { offset: 100, color: 'blue.5' },
            ]}
            strokeWidth={5}
            curveType="natural"
            yAxisProps={{ domain: [-25, 40] }}
            valueFormatter={(value) => `${value}°C`}
          />
        </Flex>
      </Flex>
    </div>
  );
}
