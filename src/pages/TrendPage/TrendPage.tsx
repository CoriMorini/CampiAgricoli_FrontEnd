import { Flex, rem, AppShell, Burger, Container, Grid, Table, Input, InputBase, Combobox, useCombobox, Paper, Title, Text, Space } from '@mantine/core';
import { Navbar } from '@/components/Navbar/Navbar';
import { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { IconLeaf } from '@tabler/icons-react';
import { LineChart } from '@mantine/charts';
import classes from './TrendPage.module.css';
import { StatsRing } from '@/components/StatsRing/StatsRing';

const campi = [
  'Campo 1',
  'Campo 2',
  'Campo 3',
  'Campo 4',
  'Campo 5',
  'Campo 6',
  'Campo 7',
  'Campo 8',
  'Campo 9',
  'Campo 10',
]

const data = [
  {
    date: 'Mar 22',
    Apples: 50,
  },
  {
    date: 'Mar 23',
    Apples: 60,
  },
  {
    date: 'Mar 24',
    Apples: 40,
  },
  {
    date: 'Mar 25',
    Apples: 30,
  },
  {
    date: 'Mar 26',
    Apples: 0,
  },
  {
    date: 'Mar 27',
    Apples: 20,
  },
  {
    date: 'Mar 28',
    Apples: 20,
  },
  {
    date: 'Mar 29',
    Apples: 10,
  },
];

export function TrendPage() {
  const [opened, { toggle }] = useDisclosure();

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [value, setValue] = useState<string | null>(null);

  const options = campi.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
  ));

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
          <Burger opened={opened} onClick={toggle} hiddenFrom="sm" size="md" style={{ paddingLeft: 20 }} />
          <IconLeaf stroke={2} style={{ width: rem(60), height: rem(60), paddingLeft: rem(20) }} />
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
                <Combobox
                  store={combobox}
                  onOptionSubmit={(val) => {
                    setValue(val);
                    combobox.closeDropdown();
                  }}
                >
                  <Combobox.Target>
                    <InputBase
                      component="button"
                      type="button"
                      pointer
                      rightSection={<Combobox.Chevron />}
                      rightSectionPointerEvents="none"
                      onClick={() => combobox.toggleDropdown()}
                    >
                      {value || <Input.Placeholder>Seleziona un campo</Input.Placeholder>}
                    </InputBase>
                  </Combobox.Target>

                  <Combobox.Dropdown>
                    <Combobox.Options mah={200} style={{ overflowY: 'auto' }}>
                      {options}
                    </Combobox.Options>
                  </Combobox.Dropdown>
                </Combobox>
              </Flex>
              <Space h="lg" />
              <Flex gap="xl" justify="center" align="center">
                <div className={classes.container}>
                  <Paper shadow="xs" radius="lg" withBorder p="xl" className={classes.card}>
                    <div className={classes.inner}>
                      {/* Titolo in alto a sinistra */}
                      <Text size="xl" className={classes.label}>
                        Azoto
                      </Text>
                    </div>
                    {/* Layout StatsRing e LineChart fianco a fianco */}
                    <Flex gap="lg" justify="space-between" align="center" mt="lg">
                      <StatsRing />
                      <Space w="lg" />
                      <div style={{ width: '100%', maxWidth: '650px' }}>
                        <LineChart
                          h={300}
                          data={data}
                          dataKey="date"
                          yAxisProps={{ domain: [0, 100] }}
                          referenceLines={[
                            { y: 40, label: 'Average sales', color: 'red.6' },
                            { x: 'Mar 25', label: 'Report out' },
                          ]}
                          series={[{ name: 'Apples', color: 'indigo.6' }]}
                        />
                      </div>
                    </Flex>
                  </Paper>
                </div>
              </Flex>
              <Space h="lg" />
              <Flex gap="xl" justify="center" align="center">
                <div className={classes.container}>
                  <Paper shadow="xs" radius="lg" withBorder p="xl" className={classes.card}>
                    <div className={classes.inner}>
                      {/* Titolo in alto a sinistra */}
                      <Text size="xl" className={classes.label}>
                        Fosforo
                      </Text>
                    </div>
                    {/* Layout StatsRing e LineChart fianco a fianco */}
                    <Flex gap="lg" justify="space-between" align="center" mt="lg">
                      <StatsRing />
                      <Space w="lg" />
                      <div style={{ width: '100%', maxWidth: '650px' }}>
                        <LineChart
                          h={300}
                          data={data}
                          dataKey="date"
                          yAxisProps={{ domain: [0, 100] }}
                          referenceLines={[
                            { y: 40, label: 'Average sales', color: 'red.6' },
                            { x: 'Mar 25', label: 'Report out' },
                          ]}
                          series={[{ name: 'Apples', color: 'indigo.6' }]}
                        />
                      </div>
                    </Flex>
                  </Paper>
                </div>
              </Flex>
              <Space h="lg" />
              <Flex gap="xl" justify="center" align="center">
                <div className={classes.container}>
                  <Paper shadow="xs" radius="lg" withBorder p="xl" className={classes.card}>
                    <div className={classes.inner}>
                      {/* Titolo in alto a sinistra */}
                      <Text size="xl" className={classes.label}>
                        Potassio
                      </Text>
                    </div>
                    {/* Layout StatsRing e LineChart fianco a fianco */}
                    <Flex gap="lg" justify="space-between" align="center" mt="lg">
                      <StatsRing />
                      <Space w="lg" />
                      <div style={{ width: '100%', maxWidth: '650px' }}>
                        <LineChart
                          h={300}
                          data={data}
                          dataKey="date"
                          yAxisProps={{ domain: [0, 100] }}
                          referenceLines={[
                            { y: 40, label: 'Average sales', color: 'red.6' },
                            { x: 'Mar 25', label: 'Report out' },
                          ]}
                          series={[{ name: 'Apples', color: 'indigo.6' }]}
                        />
                      </div>
                    </Flex>
                  </Paper>
                </div>
              </Flex>
              <Space h="lg" />
              <Flex gap="xl" justify="center" align="center">
                <div className={classes.container}>
                  <Paper shadow="xs" radius="lg" withBorder p="xl" className={classes.card}>
                    <div className={classes.inner}>
                      {/* Titolo in alto a sinistra */}
                      <Text size="xl" className={classes.label}>
                        Umidità
                      </Text>
                    </div>
                    {/* Layout StatsRing e LineChart fianco a fianco */}
                    <Flex gap="lg" justify="space-between" align="center" mt="lg">
                      <StatsRing />
                      <Space w="lg" />
                      <div style={{ width: '100%', maxWidth: '650px' }}>
                        <LineChart
                          h={300}
                          data={data}
                          dataKey="date"
                          yAxisProps={{ domain: [0, 100] }}
                          referenceLines={[
                            { y: 40, label: 'Average sales', color: 'red.6' },
                            { x: 'Mar 25', label: 'Report out' },
                          ]}
                          series={[{ name: 'Apples', color: 'indigo.6' }]}
                        />
                      </div>
                    </Flex>
                  </Paper>
                </div>
              </Flex>
              <Space h="lg" />
              <Flex gap="xl" justify="center" align="center">
                <div className={classes.container}>
                  <Paper shadow="xs" radius="lg" withBorder p="xl" className={classes.card}>
                    <div className={classes.inner}>
                      {/* Titolo in alto a sinistra */}
                      <Text size="xl" className={classes.label}>
                        Temperatura ambiente
                      </Text>
                    </div>
                    {/* Layout StatsRing e LineChart fianco a fianco */}
                    <Flex gap="lg" justify="space-between" align="center" mt="lg">
                      <StatsRing />
                      <Space w="lg" />
                      <div style={{ width: '100%', maxWidth: '650px' }}>
                        <LineChart
                          h={300}
                          data={data}
                          dataKey="date"
                          yAxisProps={{ domain: [0, 100] }}
                          referenceLines={[
                            { y: 40, label: 'Average sales', color: 'red.6' },
                            { x: 'Mar 25', label: 'Report out' },
                          ]}
                          series={[{ name: 'Apples', color: 'indigo.6' }]}
                        />
                      </div>
                    </Flex>
                  </Paper>
                </div>
              </Flex>
              <Space h="lg" />
              <Flex gap="xl" justify="center" align="center">
                <div className={classes.container}>
                  <Paper shadow="xs" radius="lg" withBorder p="xl" className={classes.card}>
                    <div className={classes.inner}>
                      {/* Titolo in alto a sinistra */}
                      <Text size="xl" className={classes.label}>
                        Temperatura del suolo
                      </Text>
                    </div>
                    {/* Layout StatsRing e LineChart fianco a fianco */}
                    <Flex gap="lg" justify="space-between" align="center" mt="lg">
                      <StatsRing />
                      <Space w="lg" />
                      <div style={{ width: '100%', maxWidth: '650px' }}>
                        <LineChart
                          h={300}
                          data={data}
                          dataKey="date"
                          yAxisProps={{ domain: [0, 100] }}
                          referenceLines={[
                            { y: 40, label: 'Average sales', color: 'red.6' },
                            { x: 'Mar 25', label: 'Report out' },
                          ]}
                          series={[{ name: 'Apples', color: 'indigo.6' }]}
                        />
                      </div>
                    </Flex>
                  </Paper>
                </div>
              </Flex>
            </Grid.Col>
          </Grid>
        </Container>
      </AppShell.Main>
    </AppShell >
  );
}
