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
  Space,
  useCombobox,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Navbar } from '@/components/Navbar/Navbar';
import { RingCard } from '@/components/RingCard/RingCard';
import { StatsControls } from '@/components/StatsControls/StatsControls';
import { StatsGrid } from '@/components/StatsGrid/StatsGrid';
import Campo from '@/models/Campo';
import MediaMeseTemperatura from '@/models/MediaMeseTemperatura';
import NPKCampoMediaMeseCorrente from '@/models/NPKCampoMediaMeseCorrente';
import Utente from '@/models/Utente';
import classes from './DashBoard.module.css';

const apiUrl = import.meta.env.VITE_API_URL;

export function DashBoard() {
  const [opened, { toggle }] = useDisclosure();
  const [campi, setCampi] = useState<Campo[]>([]);
  const [idCampoSelezionato, setIdCampoSelezionato] = useState<number | null>(null);
  const [NPKCampoMediaMeseCorrente, setNPKCampoMediaMeseCorrente] =
    useState<NPKCampoMediaMeseCorrente | null>(null);
  const [temperatureMedieAnno, setTemperatureMedieAnno] = useState<MediaMeseTemperatura[]>([]);

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
  }, []); // Il secondo argomento vuoto significa che la chiamata viene fatta solo al montaggio del componente.

  // Funzione per eseguire una chiamata API quando cambia il campo selezionato
  useEffect(() => {
    if (idCampoSelezionato) {
      // Chiamata API per ottenere i delta NPK MESE del campo selezionato
      //
      fetch(
        apiUrl + `Dashboard/GetNPKcampoMediaMeseCorrente?idCampo=${idCampoSelezionato}`,
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
          setNPKCampoMediaMeseCorrente(data);

          console.log('Dati dettagli campo:', data);
          // Gestisci i dati ricevuti
        })
        .catch((error) => {
          alert('Errore:' + error);
        });

      // Chiamata API per ottenere GetTemperaturaMediaAnnoCampo
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
          // Gestisci i dati ricevuti
        })
        .catch((error) => {
          alert('Errore:' + error);
        });
    }
  }, [idCampoSelezionato]); // Dipende da campoSelezionato

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
        <Container size="responsive">
          <Grid gutter="xl">
            <Grid.Col>
              <Flex className={classes.CarouselFlex} mih={50} gap="xs" justify="center" align="center" direction="row" wrap="wrap">
                <RingCard />
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
            <Grid.Col>
              <StatsGrid NPKCampoMediaMeseCorrente={NPKCampoMediaMeseCorrente} />
            </Grid.Col>
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
                <StatsControls idCampo={idCampoSelezionato || 0} />
              </Flex>
            </Grid.Col>
          </Grid>
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}
