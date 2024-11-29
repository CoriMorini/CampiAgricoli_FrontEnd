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

// URL dell'API prelevato dalle variabili d'ambiente
const apiUrl = import.meta.env.VITE_API_URL;

export function ReportPage() {
  const [opened, { toggle }] = useDisclosure();
  const [campi, setCampi] = useState<Campo[]>([]);
  const [idCampoSelezionato, setIdCampoSelezionato] = useState<number | null>(null);
  const [reportGenerale, setReportGenerale] = useState<ReportGenerale | null>(null);

  // Gestione degli stati nella form:
  // - 'listaCampi': viene generata mappando l'elenco dei campi dall'API.
  // - 'idCampoSelezionato': viene impostato automaticamente al primo campo disponibile dopo il recupero dei campi.
  // - 'reportGenerale': aggiornato quando cambia il campo selezionato con dati dettagliati (NPK, umidità, temperature).

  // Logiche:
  // - Fetch iniziale dei campi per l'utente corrente, con impostazione del primo campo come selezionato.
  // - Ogni volta che cambia il campo selezionato, viene eseguita una chiamata API per ottenere i dettagli generali del campo (NPK, umidità, temperature), con formattazione delle date.
  // - Gestione degli errori.


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
    if (idCampoSelezionato) {
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
        })
        .catch((error) => {
          alert('Errore:' + error);
        });
    }
  }, [idCampoSelezionato]);

  /*const npk = reportGenerale?.npk.map((npk: NPK, index: number) => (
    <Table.Tr key={index}>
      <Table.Td>{npk.N}</Table.Td>
      <Table.Td>{npk.P}</Table.Td>
      <Table.Td>{npk.K}</Table.Td>
      <Table.Td>{npk.dataOraCerta}</Table.Td>
    </Table.Tr>
  ));*/

  const umidita = reportGenerale?.umidita.map((umidita: Umidita, index: number) => (
    <Table.Tr key={index}>
      <Table.Td>{umidita.Umidita}</Table.Td>
      <Table.Td>{umidita.dataOraCerta}</Table.Td>
    </Table.Tr>
  ));

  const umAmbiente = reportGenerale?.temperaturaAmb.map(
    (umAmbiente: Temperatura, index: number) => (
      <Table.Tr key={index}>
        <Table.Td>{umAmbiente.Temperatura}</Table.Td>
        <Table.Td>{umAmbiente.dataOraCerta}</Table.Td>
      </Table.Tr>
    )
  );

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

  // Render form ReportPage
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
                      <Table.Th>Umidità ambiente (%)</Table.Th>
                      <Table.Th>Data misurazione</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>{umAmbiente}</Table.Tbody>
                  <Table.Caption>
                      Ultime misurazioni di umidità nell'aria (ambiente) (%)
                  </Table.Caption>
                </Table>

                <Table verticalSpacing="md" withColumnBorders striped highlightOnHover withTableBorder>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Umidità suolo (%)</Table.Th>
                      <Table.Th>Data misurazione</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>{umidita}</Table.Tbody>
                  <Table.Caption>
                    Ultime misurazioni di umidità del suolo (%)
                  </Table.Caption>
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
                      <Table.Th>Temperatura suolo</Table.Th>
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
