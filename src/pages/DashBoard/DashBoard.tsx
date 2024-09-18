import { LineChart } from '@mantine/charts';
import { Flex, rem, SimpleGrid } from '@mantine/core';
import { Navbar } from '@/components/Navbar/Navbar';
import { RingCard } from '@/components/RingCard/RingCard';
import { StatsControls } from '@/components/StatsControls/StatsControls';
import { StatsGrid } from '@/components/StatsGrid/StatsGrid';
import { AppShell, Burger } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconLeaf } from '@tabler/icons-react';
import { Container, Grid, Skeleton } from '@mantine/core';

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

export function DashBoard() {
  const [opened, { toggle }] = useDisclosure();

  const PRIMARY_COL_HEIGHT = '100vh'; // Occupiamo tutto lo spazio della viewport

  const SECONDARY_COL_HEIGHT = `calc(${PRIMARY_COL_HEIGHT} / 2 - var(--mantine-spacing-md) / 2)`;

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: 'sm',
        collapsed: { mobile: !opened },
      }}
      padding="md"
    >
      <AppShell.Header>
        <Flex
          justify="space-between" // Distribuisce lo spazio tra il Burger e l'icona
          align="center" // Centra verticalmente gli elementi
          style={{ height: '100%' }} // Imposta l'altezza per occupare tutto lo spazio disponibile dell'header
        >
          <Burger
            opened={opened}
            onClick={toggle}
            hiddenFrom="sm"
            size="md"
          />
          <IconLeaf stroke={2} style={{ width: rem(50), height: rem(50) }} />
        </Flex>
      </AppShell.Header>

      <AppShell.Navbar>
        <Navbar />
      </AppShell.Navbar>

      <AppShell.Main>
        <Container size="xl">
          <Grid gutter="xl">
            <Grid.Col>
              <Flex mih={50} gap="md" justify="center" align="center" direction="row" wrap="wrap">
                <RingCard />
                <RingCard />
                <RingCard />
                <RingCard />
                <RingCard />
              </Flex>
            </Grid.Col>
            <Grid.Col>
              <StatsGrid />
            </Grid.Col>
            <Grid.Col>
              <Flex gap="xl" justify="center" align="center" direction={{ base: 'column', lg: 'row' }}>
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
                <StatsControls />
              </Flex>
            </Grid.Col>
          </Grid>
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}




/*                      <LineChart
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
                        
                        
                        <Flex mih={50} gap="xl" justify="center" align="center" direction="row" wrap="wrap">
                <RingCard />
                <RingCard />
                <RingCard />
              </Flex>
                        
                        
                        */