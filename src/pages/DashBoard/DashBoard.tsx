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
  rem,
  useCombobox,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Navbar } from '@/components/Navbar/Navbar';
import { CardCampiDashboard } from '@/components/CardCampiDashboard/CardCampiDashboard';
import { CalendarDashboard } from '@/components/CalendarDashboard/CalendarDashboard';
import { NPKCardDashboard } from '@/components/NPKCardDashboard/NPKCardDashboard';
import Campo from '@/models/Campo';
import MediaMeseTemperatura from '@/models/MediaMeseTemperatura';
import NPKCampoMediaMeseCorrente from '@/models/NPKCampoMediaMeseCorrente';
import Utente from '@/models/Utente';
import classes from './DashBoard.module.css';

// URL dell'API prelevato dalle variabili d'ambiente
const apiUrl = import.meta.env.VITE_API_URL;

export function DashBoard() {
  const [opened, { toggle }] = useDisclosure();
  const [campi, setCampi] = useState<Campo[]>([]);
  const [idCampoSelezionato, setIdCampoSelezionato] = useState<number | null>(null);
  const [temperatureMedieAnno, setTemperatureMedieAnno] = useState<MediaMeseTemperatura[]>([]);

  // Gestione degli stati nella form:
  // - 'combobox': gestisce la selezione del campo con reset dell'opzione selezionata alla chiusura del dropdown.
  // - 'campi': recupera e mappa l'elenco dei campi dall'API all'avvio, impostando l'opzione selezionata predefinita.
  // - 'idCampoSelezionato': quando un campo è selezionato, si attivano due chiamate API per ottenere i dati NPK e la temperatura media dell'anno.

  // Logiche:
  // - Recupero dei campi e selezione automatica del primo campo disponibile.
  // - Fetch dinamico dei dati del campo selezionato (NPK e temperatura), con gestione delle risposte.
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
    // Recupero utente da local storage
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
    if (idCampoSelezionato) {

      fetch(
        apiUrl + `Dashboard/GetTemperaturaMediaAnnoCampo?idCampo=${idCampoSelezionato}`,
        {
          method: 'GET',
        }
      )
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else {
            throw new Error(`Errore di rete! Status code: ${response.status}`);
          }
        })
        .then((data) => {
          data.forEach((element: MediaMeseTemperatura) => {
            element.temperatura = parseFloat(element.temperatura.toFixed(2));
          });

          setTemperatureMedieAnno(data);

          console.log('Dati dettagli campo:', data);

        })
        .catch((error) => {
          alert('Errore:' + error);
        });
    }
  }, [idCampoSelezionato]);

  // Render form Dashboard
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
        <Container size="responsive">
          <Grid gutter="xl">
            <Grid.Col>
              <Flex className={classes.CarouselFlex} mih={50} gap="xs" justify="center" align="center" direction="row" wrap="wrap">
                <CardCampiDashboard />
              </Flex>
            </Grid.Col>
            <Grid.Col>
              <Flex mih={50} gap="xs" justify="center" align="center" direction="row" wrap="wrap">
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
            </Grid.Col>
            {/*
            <Grid.Col>
              <NPKCardDashboard NPKCampoMediaMeseCorrente={NPKCampoMediaMeseCorrente} />
            </Grid.Col>
            */}
            <Grid.Col>
              <Flex
                gap="xl"
                justify="center"
                align="center"
                direction={{ base: 'column', lg: 'row' }}
              >
                <LineChart
                  h={300}
                  data={temperatureMedieAnno}
                  series={[{ name: 'temperatura', label: 'temperatura media' }]}
                  dataKey="mese"
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
                  yAxisProps={{
                    domain: [
                      temperatureMedieAnno.length > 0
                        ? temperatureMedieAnno.reduce((min, current) => {
                          return current.temperatura < min.temperatura ? current : min;
                        }).temperatura - 3
                        : 0,
                      temperatureMedieAnno.length > 0
                        ? temperatureMedieAnno.reduce((max, current) => {
                          return current.temperatura > max.temperatura ? current : max;
                        }).temperatura + 3
                        : 50,
                    ],
                  }}
                  xAxisProps={{ padding: { left: 30, right: 30 } }}
                  valueFormatter={(value) => `${value}°C`}
                />
                <CalendarDashboard idCampo={idCampoSelezionato || 0} />
              </Flex>
            </Grid.Col>
          </Grid>
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}