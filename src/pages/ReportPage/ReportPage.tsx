import { useEffect, useState } from 'react';
import { IconLeaf } from '@tabler/icons-react';
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
  Table,
  useCombobox,
} from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { Navbar } from '@/components/Navbar/Navbar';
import Campo from '@/models/Campo';
import { NPK, ReportGenerale, Temperatura, Umidita } from '@/models/ReportGenerale';
import Utente from '@/models/Utente';

const apiUrl = import.meta.env.VITE_API_URL;

export function ReportPage() {
  const [opened, { toggle }] = useDisclosure();
  const [campi, setCampi] = useState<Campo[]>([]);
  const [idCampoSelezionato, setIdCampoSelezionato] = useState<number | null>(null);
  const [reportGenerale, setReportGenerale] = useState<ReportGenerale | null>(null);

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

  // Funzione per eseguire una chiamata API quando cambia il campo selezionato
  useEffect(() => {
    if (idCampoSelezionato) {
      // Chiamata API per ottenere i delta NPK MESE del campo selezionato
      //
      fetch(apiUrl + `Report/GetReportGenerale?idCampo=${idCampoSelezionato}`, {
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
          data.npk.forEach((element: NPK) => {
            element.dataOraCerta = new Date(element.dataOraCerta).toLocaleString();
          });
          data.umidita.forEach((element: Umidita) => {
            element.dataOraCerta = new Date(element.dataOraCerta).toLocaleString();
          });
          data.temperaturaAmb.forEach((element: Temperatura) => {
            element.dataOraCerta = new Date(element.dataOraCerta).toLocaleString();
          });
          data.temperaturaSuolo.forEach((element: Temperatura) => {
            element.dataOraCerta = new Date(element.dataOraCerta).toLocaleString();
          });

          setReportGenerale(data);

          console.log('Dati dettagli campo:', data);
          // Gestisci i dati ricevuti
        })
        .catch((error) => {
          alert('Errore:' + error);
        });
    }
  }, [idCampoSelezionato]); // Dipende da campoSelezionato

  const npk = reportGenerale?.npk.map((npk: NPK, index: number) => (
    <Table.Tr key={index}>
      <Table.Td>{npk.N}</Table.Td>
      <Table.Td>{npk.P}</Table.Td>
      <Table.Td>{npk.K}</Table.Td>
      <Table.Td>{npk.dataOraCerta}</Table.Td>
    </Table.Tr>
  ));

  const umidita = reportGenerale?.umidita.map((umidita: Umidita, index: number) => (
    <Table.Tr key={index}>
      <Table.Td>{umidita.Umidita}</Table.Td>
      <Table.Td>{umidita.dataOraCerta}</Table.Td>
    </Table.Tr>
  ));

  const tempAmbiente = reportGenerale?.temperaturaAmb.map(
    (tempAmbiente: Temperatura, index: number) => (
      <Table.Tr key={index}>
        <Table.Td>{tempAmbiente.Temperatura}</Table.Td>
        <Table.Td>{tempAmbiente.dataOraCerta}</Table.Td>
      </Table.Tr>
    )
  );

  const tempSuolo = reportGenerale?.temperaturaSuolo.map(
    (tempSuolo: Temperatura, index: number) => (
      <Table.Tr key={index}>
        <Table.Td>{tempSuolo.Temperatura}</Table.Td>
        <Table.Td>{tempSuolo.dataOraCerta}</Table.Td>
      </Table.Tr>
    )
  );

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [value, setValue] = useState<string | null>(null);

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
            </Grid.Col>
            <Grid.Col>
              <Flex
                gap="xl"
                justify="center"
                align="center"
                direction={{ base: 'column', md: 'row' }}
              >
                <Table verticalSpacing="md" withColumnBorders striped highlightOnHover withTableBorder>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>N (Azoto)</Table.Th>
                      <Table.Th>P (Fosforo)</Table.Th>
                      <Table.Th>K (Potassio)</Table.Th>
                      <Table.Th>Data misurazione</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>{npk}</Table.Tbody>
                  <Table.Caption>
                    Ultime misurazioni di azoto (N), fosforo (P) e potassio (K) nel terreno
                  </Table.Caption>
                </Table>
                <Table verticalSpacing="md" withColumnBorders striped highlightOnHover withTableBorder>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Umidità del suolo (%)</Table.Th>
                      <Table.Th>Data misurazione</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>{umidita}</Table.Tbody>
                  <Table.Caption>Ultime misurazioni di umidità nel terreno</Table.Caption>
                </Table>
              </Flex>
            </Grid.Col>
            <Grid.Col>
              <Flex
                gap="xl"
                justify="center"
                align="center"
                direction={{ base: 'column', md: 'row' }}
              >
                <Table verticalSpacing="md" withColumnBorders striped highlightOnHover withTableBorder>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Temperatura ambiente</Table.Th>
                      <Table.Th>Data misurazione</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>{tempAmbiente}</Table.Tbody>
                  <Table.Caption>
                    Ultime misurazioni della temperatura dell'aria nel campo (°C)
                  </Table.Caption>
                </Table>

                <Table verticalSpacing="md" withColumnBorders striped highlightOnHover withTableBorder>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Temperatura del suolo</Table.Th>
                      <Table.Th>Data misurazione</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>{tempSuolo}</Table.Tbody>
                  <Table.Caption>Ultime misurazioni della temperatura del suolo (°C)</Table.Caption>
                </Table>
              </Flex>
            </Grid.Col>
          </Grid>
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}
