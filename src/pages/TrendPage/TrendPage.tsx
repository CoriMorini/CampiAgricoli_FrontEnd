import { useEffect, useState } from 'react';
import { IconLeaf } from '@tabler/icons-react';
import { LineChart } from '@mantine/charts';
import {
  AppShell,
  Burger,
  Combobox,
  Container,
  Flex,
  Grid,
  Input,
  InputBase,
  Paper,
  rem,
  Space,
  Text,
  useCombobox,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Navbar } from '@/components/Navbar/Navbar';
import { StatsRing } from '@/components/StatsRing/StatsRing';
import Campo from '@/models/Campo';
import Utente from '@/models/Utente';
import classes from './TrendPage.module.css';

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
];

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
  const [campi, setCampi] = useState<Campo[]>([]);
  const [idCampoSelezionato, setIdCampoSelezionato] = useState<number | null>(null);

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  var listaCampi = campi.map((item) => (
    <Combobox.Option value={item.IdCampo.toString()} key={item.IdCampo}>
      {item.NomeCampo}
    </Combobox.Option>
  ));

  useEffect(() => {
    // Recupero utente da local storage
    const utente: Utente = Utente.fromJson(JSON.parse(localStorage.getItem('user') || '{}'));

    if (utente) {
      fetch('https://localhost:44397/Campi/GetCampi?idUtente=' + utente.IdUtente, {
        method: 'GET',
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else {
            throw new Error(`Errore di rete! Status code: ${response.status}`);
          }
        })
        .then((data) => {
          setCampi(data);

          console.log('setto id campo selezionato:', data[0].IdCampo);
          setIdCampoSelezionato(data[0].IdCampo);

          listaCampi = campi.map((item) => (
            <Combobox.Option value={item.IdCampo.toString()} key={item.IdCampo}></Combobox.Option>
          ));

          console.log('Campi:', data);
        })
        .catch((error) => {
          alert('Errore:' + error);
        });
    }
  }, []); // Il secondo argomento vuoto significa che la chiamata viene fatta solo al montaggio del componente.

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
            style={{ paddingLeft: 20 }}
          />
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
                    setIdCampoSelezionato(parseInt(val));
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
                      {campi.find((x) => x.IdCampo == idCampoSelezionato)?.NomeCampo || (
                        <Input.Placeholder>Seleziona un campo</Input.Placeholder>
                      )}
                    </InputBase>
                  </Combobox.Target>

                  <Combobox.Dropdown>
                    <Combobox.Options mah={200} style={{ overflowY: 'auto' }}>
                      {listaCampi}
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
    </AppShell>
  );
}
