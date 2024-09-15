import { IconCapsuleHorizontal } from '@tabler/icons-react';
import { Flex } from '@mantine/core';
import { Navbar } from '@/components/Navbar/Navbar';
import { RingCard } from '@/components/RingCard/RingCard';
import { StatsControls } from '@/components/StatsControls/StatsControls';
import { StatsGrid } from '@/components/StatsGrid/StatsGrid';
import { LineChart } from '@mantine/charts';
import { Grid } from '@mantine/core';
import { SimpleGrid } from '@mantine/core';

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
      <Grid overflow="hidden">
        <Grid.Col span="content">
          <Navbar />
        </Grid.Col>
        <Grid.Col span="auto">
          <Flex
            justify="center"
            align="center"
            style={{ width: '100%' }}
          >
            <SimpleGrid cols={1} verticalSpacing="xl">
              <Flex
                mih={50}
                gap="xl"
                justify="center"
                align="center"
                direction="row"
                wrap="wrap"
              >
                <RingCard />
                <RingCard />
                <RingCard />
              </Flex>
              <Flex
                mih={50}
                gap="xl"
                justify="center"
                align="center"
                direction="row"
                wrap="wrap"
              >
                <StatsGrid />
                <StatsControls />
                <div style={{ width: '100%', maxWidth: '800px' }}>
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
                    xAxisProps={{ padding: { left: 30, right: 30 } }}
                    valueFormatter={(value) => `${value}°C`}
                  />
                </div>
              </Flex>
            </SimpleGrid>
          </Flex>
        </Grid.Col>
      </Grid>
    </div>
  );
}
