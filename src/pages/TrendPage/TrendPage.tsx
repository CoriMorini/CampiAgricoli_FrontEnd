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
import { CardSaluteTrend } from '@/components/CardSaluteTrend/CardSaluteTrend';
import Campo from '@/models/Campo';
import Utente from '@/models/Utente';
import classes from './TrendPage.module.css';
import DataInfoTrend from '@/models/DataInfoTrend';

// URL dell'API prelevato dalle variabili d'ambiente
const apiUrl = import.meta.env.VITE_API_URL;

export function TrendPage() {
  const [opened, { toggle }] = useDisclosure();
  const [campi, setCampi] = useState<Campo[]>([]);
  const [idCampoSelezionato, setIdCampoSelezionato] = useState<number | null>(null);
  const [trends, setTrends] = useState<DataInfoTrend[] | null>(null);

  // Gestione degli stati nella form:
  // - 'listaCampi': viene generata mappando l'elenco dei campi recuperati dall'API.
  // - 'idCampoSelezionato': viene impostato automaticamente al primo campo disponibile dopo il recupero dei campi.
  // - 'trends': aggiornato con i dati del trend generale quando cambia il campo selezionato.

  // Logiche:
  // - Recupero iniziale dei campi per l'utente corrente, con selezione automatica del primo campo.
  // - Ogni volta che cambia il campo selezionato, viene eseguita una chiamata API per ottenere i trend generali del campo selezionato, con formattazione dei valori delle misurazioni.
  // - Gestione degli errori.

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  var listaCampi = campi.map((item) => (
    <Combobox.Option value={item.IdCampo.toString()} key={item.IdCampo}>
      {item.NomeCampo}
    </Combobox.Option>
  ));

  useEffect(() => {

    const utente: Utente = Utente.fromJson(JSON.parse(localStorage.getItem('user') || '{}'));

    if (utente) {
      fetch(apiUrl + 'Campi/GetCampi?idUtente=' + utente.IdUtente, {
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
  }, []);

  useEffect(() => {

    if (idCampoSelezionato != null) {

      fetch(apiUrl + 'Trend/GetTrendGenerale?idCampo=' + idCampoSelezionato, {
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

          data.forEach((element: DataInfoTrend) => {
            element.MisurazioniAnnuali.forEach((misurazione) => {
              misurazione.valore = parseFloat(misurazione.valore.toFixed(2));
            });
          });

          setTrends(data);
        })
        .catch((error) => {
          alert('Errore:' + error);
        });

    }

  }, [idCampoSelezionato]);


  // Render form TrendPage
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
          justify="space-between"
          align="center"
          style={{ height: '100%' }}
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
                      <Text size="xl" className={classes.label}>
                        Azoto
                      </Text>
                    </div>

                    <Flex gap="lg" justify="space-between" align="center" mt="lg">
                      <CardSaluteTrend punteggioSalute={trends ? trends[0].PunteggioSalute ?? 0 : 0} />
                      <Space w="lg" />
                      <div style={{ width: '100%', maxWidth: '650px' }}>
                        <LineChart
                          h={300}
                          data={trends ? trends[0].MisurazioniAnnuali ?? [] : []}
                          dataKey="mese"
                          type="gradient"
                          gradientStops={[
                            { offset: 0, color: 'red.5' },
                            { offset: 10, color: 'orange.5' },
                            { offset: 30, color: 'lime.5' },
                            { offset: 50, color: 'green.6' },
                            { offset: 70, color: 'lime.6' },
                            { offset: 90, color: 'orange.6' },
                            { offset: 100, color: 'red.6' },
                          ]}
                          strokeWidth={5}
                          yAxisProps={{
                            domain: [trends ? trends[0].MisurazioniAnnuali.reduce((min, current) => {
                              return current.valore < min.valore ? current : min;
                            }).valore - 1 : 0, trends ? trends[0].MisurazioniAnnuali.reduce((max, current) => {
                              return current.valore > max.valore ? current : max;
                            }).valore + 1 : 100]
                          }}
                          series={[{ name: 'valore' }]}
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
                      <Text size="xl" className={classes.label}>
                        Fosforo
                      </Text>
                    </div>

                    <Flex gap="lg" justify="space-between" align="center" mt="lg">
                      <CardSaluteTrend punteggioSalute={trends ? trends[1].PunteggioSalute ?? 0 : 0} />
                      <Space w="lg" />
                      <div style={{ width: '100%', maxWidth: '650px' }}>
                        <LineChart
                          h={300}
                          data={trends ? trends[1].MisurazioniAnnuali ?? [] : []}
                          dataKey="mese"
                          type="gradient"
                          gradientStops={[
                            { offset: 0, color: 'red.5' },
                            { offset: 10, color: 'orange.5' },
                            { offset: 30, color: 'lime.5' },
                            { offset: 50, color: 'green.6' },
                            { offset: 70, color: 'lime.6' },
                            { offset: 90, color: 'orange.6' },
                            { offset: 100, color: 'red.6' },
                          ]}
                          strokeWidth={5}
                          yAxisProps={{
                            domain: [trends ? trends[1].MisurazioniAnnuali.reduce((min, current) => {
                              return current.valore < min.valore ? current : min;
                            }).valore - 1 : 0, trends ? trends[1].MisurazioniAnnuali.reduce((max, current) => {
                              return current.valore > max.valore ? current : max;
                            }).valore + 1 : 100]
                          }}
                          series={[{ name: 'valore' }]}
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
                      <Text size="xl" className={classes.label}>
                        Potassio
                      </Text>
                    </div>

                    <Flex gap="lg" justify="space-between" align="center" mt="lg">
                      <CardSaluteTrend punteggioSalute={trends ? trends[2].PunteggioSalute ?? 0 : 0} />
                      <Space w="lg" />
                      <div style={{ width: '100%', maxWidth: '650px' }}>
                        <LineChart
                          h={300}
                          data={trends ? trends[2].MisurazioniAnnuali ?? [] : []}
                          dataKey="mese"
                          type="gradient"
                          gradientStops={[
                            { offset: 0, color: 'red.5' },
                            { offset: 10, color: 'orange.5' },
                            { offset: 30, color: 'lime.5' },
                            { offset: 50, color: 'green.6' },
                            { offset: 70, color: 'lime.6' },
                            { offset: 90, color: 'orange.6' },
                            { offset: 100, color: 'red.6' },
                          ]}
                          strokeWidth={5}
                          yAxisProps={{
                            domain: [trends ? trends[2].MisurazioniAnnuali.reduce((min, current) => {
                              return current.valore < min.valore ? current : min;
                            }).valore - 1 : 0, trends ? trends[2].MisurazioniAnnuali.reduce((max, current) => {
                              return current.valore > max.valore ? current : max;
                            }).valore + 1 : 100]
                          }}
                          series={[{ name: 'valore' }]}
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
                      <Text size="xl" className={classes.label}>
                        Umidità
                      </Text>
                    </div>

                    <Flex gap="lg" justify="space-between" align="center" mt="lg">
                      <CardSaluteTrend punteggioSalute={trends ? trends[3].PunteggioSalute ?? 0 : 0} />
                      <Space w="lg" />
                      <div style={{ width: '100%', maxWidth: '650px' }}>
                        <LineChart
                          h={300}
                          data={trends ? trends[3].MisurazioniAnnuali ?? [] : []}
                          dataKey="mese"
                          type="gradient"
                          gradientStops={[
                            { offset: 0, color: 'red.5' },
                            { offset: 10, color: 'orange.5' },
                            { offset: 30, color: 'lime.5' },
                            { offset: 50, color: 'green.6' },
                            { offset: 70, color: 'lime.6' },
                            { offset: 90, color: 'orange.6' },
                            { offset: 100, color: 'red.6' },
                          ]}
                          strokeWidth={5}
                          yAxisProps={{
                            domain: [trends ? trends[3].MisurazioniAnnuali.reduce((min, current) => {
                              return current.valore < min.valore ? current : min;
                            }).valore - 1 : 0, trends ? trends[3].MisurazioniAnnuali.reduce((max, current) => {
                              return current.valore > max.valore ? current : max;
                            }).valore + 1 : 100]
                          }}
                          series={[{ name: 'valore' }]}
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
                      <Text size="xl" className={classes.label}>
                        Temperatura ambiente
                      </Text>
                    </div>

                    <Flex gap="lg" justify="space-between" align="center" mt="lg">
                      <CardSaluteTrend punteggioSalute={trends ? trends[4].PunteggioSalute ?? 0 : 0} />
                      <Space w="lg" />
                      <div style={{ width: '100%', maxWidth: '650px' }}>
                        <LineChart
                          h={300}
                          data={trends ? trends[4].MisurazioniAnnuali ?? [] : []}
                          dataKey="mese"
                          type="gradient"
                          gradientStops={[
                            { offset: 0, color: 'red.5' },
                            { offset: 10, color: 'orange.5' },
                            { offset: 30, color: 'lime.5' },
                            { offset: 50, color: 'green.6' },
                            { offset: 70, color: 'lime.6' },
                            { offset: 90, color: 'orange.6' },
                            { offset: 100, color: 'red.6' },
                          ]}
                          strokeWidth={5}
                          yAxisProps={{
                            domain: [trends ? trends[4].MisurazioniAnnuali.reduce((min, current) => {
                              return current.valore < min.valore ? current : min;
                            }).valore - 1 : 0, trends ? trends[4].MisurazioniAnnuali.reduce((max, current) => {
                              return current.valore > max.valore ? current : max;
                            }).valore + 1 : 100]
                          }}
                          series={[{ name: 'valore' }]}
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
                      <Text size="xl" className={classes.label}>
                        Temperatura del suolo
                      </Text>
                    </div>

                    <Flex gap="lg" justify="space-between" align="center" mt="lg">
                      <CardSaluteTrend punteggioSalute={trends ? trends[5].PunteggioSalute ?? 0 : 0} />
                      <Space w="lg" />
                      <div style={{ width: '100%', maxWidth: '650px' }}>
                        <LineChart
                          h={300}
                          data={trends ? trends[5].MisurazioniAnnuali ?? [] : []}
                          dataKey="mese"
                          type="gradient"
                          gradientStops={[
                            { offset: 0, color: 'red.5' },
                            { offset: 10, color: 'orange.5' },
                            { offset: 30, color: 'lime.5' },
                            { offset: 50, color: 'green.6' },
                            { offset: 70, color: 'lime.6' },
                            { offset: 90, color: 'orange.6' },
                            { offset: 100, color: 'red.6' },
                          ]}
                          strokeWidth={5}
                          yAxisProps={{
                            domain: [trends ? trends[5].MisurazioniAnnuali.reduce((min, current) => {
                              return current.valore < min.valore ? current : min;
                            }).valore - 1 : 0, trends ? trends[5].MisurazioniAnnuali.reduce((max, current) => {
                              return current.valore > max.valore ? current : max;
                            }).valore + 1 : 100]
                          }}
                          series={[{ name: 'valore' }]}
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
