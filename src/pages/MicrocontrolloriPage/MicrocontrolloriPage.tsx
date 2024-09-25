import {
  Flex, rem, AppShell, Burger, Container, Grid, Table, ScrollArea, Text, TextInput, Space
} from '@mantine/core';
import { Navbar } from '@/components/Navbar/Navbar';
import { useDisclosure } from '@mantine/hooks';
import { IconLeaf } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { IconSearch } from '@tabler/icons-react';
import { ModalModifyArduino } from '@/components/ModalModifyArduino/ModalModifyArduino';
import Utente from '@/models/Utente';
import VistaMicrocontrolloriUtente from '@/models/VistaMicrocontrolloriUtente';
import { Pagination } from '@mantine/core';

const apiUrl = import.meta.env.VITE_API_URL;

const fetchMicrocontrollori = (idUtente: number, numeroPagina: number, filtro?: string, signal: AbortSignal | undefined = undefined) => {
  const url = apiUrl + 'Microcontrollori/GetMicrocontrollori?idUtente='
    + idUtente
    + '&numeroPagina='
    + numeroPagina
    + (filtro ? '&filtro=' + filtro : '');

  console.log('fetching microcontrollori from: ', url);

  return fetch(url, {
    method: 'GET',
    signal: signal ? signal : undefined,
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error(`Errore di rete! Status code: ${response.status}`);
      }
    })
    .catch((error) => {
      console.error('Error fetching microcontrollori:', error);
      throw error;
    });
};

const fetchNumeroPagine = (idUtente: number, filtro?: string, signal: AbortSignal | undefined = undefined) => {
  const url = apiUrl + 'Microcontrollori/GetNumeroPagine?idUtente='
    + idUtente
    + (filtro ? '&filtro=' + filtro : '');

  console.log('fetching numero pagine from: ', url);

  return fetch(url, {
    method: 'GET',
    signal: signal ? signal : undefined,
  })
    .then((response) => {
      if (response.status === 200) {
        return response.json();
      } else {
        throw new Error(`Errore di rete! Status code: ${response.status}`);
      }
    })
    .catch((error) => {
      console.error('Error fetching numero pagine:', error);
      throw error;
    });
};

export function MicrocontrolloriPage() {
  const [opened, { toggle }] = useDisclosure();
  const [filtro, setFiltro] = useState('');
  const [listaMicrontrolli, setListaMicrocontrolli] = useState([]);
  const [numeroPaginaSelezionata, setNumeroPaginaSelezionata] = useState(1);
  const [numeroPagineTotali, setNumeroPagineTotali] = useState(1);

  // Gestione degli stati nella form:
  // - 'filtro': usato per memorizzare il filtro di ricerca inserito dall'utente.
  // - 'listaMicrocontrolli': contiene la lista di microcontrollori recuperati dal server.
  // - 'numeroPaginaSelezionata': traccia la pagina attualmente visualizzata.
  // - 'numeroPagineTotali': indica il numero totale di pagine per i risultati.

  // Logiche:
  // - Aggiornamento automatico della lista e del numero di pagine quando l'utente cambia il filtro o la pagina.
  // - Funzione di ricerca che aggiorna il filtro e recupera i dati dal server.
  // - Cleanup per abortire richieste fetch in sospeso durante aggiornamenti o filtri successivi.


  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    console.log('searching for:', event.currentTarget.value);
    const { value } = event.currentTarget;
    setFiltro(value);
  };

  useEffect(() => {

    const utente: Utente = Utente.fromJson(JSON.parse(localStorage.getItem('user') || '{}'));

    if (utente) {

      fetchNumeroPagine(utente.IdUtente, filtro)
        .then((data) => {
          setNumeroPagineTotali(data);
          console.log('Numero pagine totali: ' + data);
          setNumeroPaginaSelezionata(1);
        })
        .catch((error) => {
          if (error.name === 'AbortError') {
            console.log('Request aborted');
          } else {
            alert('Errore:' + error)
          }
        }
        );

    }

  }, []);

  useEffect(() => {

    const utente: Utente = Utente.fromJson(JSON.parse(localStorage.getItem('user') || '{}'));

    if (utente) {

      fetchMicrocontrollori(utente.IdUtente, numeroPaginaSelezionata - 1, filtro)
        .then((data) => {
          setListaMicrocontrolli(data);
        })
        .catch((error) => {
          if (error.name === 'AbortError') {
            console.log('Request aborted');
          } else {
            alert('Errore:' + error)
          }
        });

    }

  }, [numeroPaginaSelezionata]);

  useEffect(() => {

    const utente: Utente = Utente.fromJson(JSON.parse(localStorage.getItem('user') || '{}'));

    const controller1 = new AbortController();
    const signal1 = controller1.signal;

    const controller2 = new AbortController();
    const signal2 = controller2.signal;

    if (utente && filtro != undefined && filtro != null) {

      fetchMicrocontrollori(utente.IdUtente, numeroPaginaSelezionata - 1, filtro, signal1)
        .then((data) => {
          setListaMicrocontrolli(data);
        })
        .catch((error) => {
          setListaMicrocontrolli([]);
          //alert('Errore:' + error);
        });

      // Get Numero Pagine Totali dopo aver filtrato
      fetch(apiUrl + 'Microcontrollori/GetNumeroPagine?idUtente='
        + utente.IdUtente
        + (filtro ? '&filtro=' + filtro : ''), {
        method: 'GET',
        signal: signal2,
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else {
            throw new Error(`Errore di rete! Status code: ${response.status}`);
          }
        })
        .then((data) => {
          setNumeroPagineTotali(data);
          console.log('Numero pagine totali: ' + data);
          setNumeroPaginaSelezionata(1);
        })
        .catch((error) => {
          if (error.name === 'AbortError') {
            console.log('Request aborted');
          } else {
            alert('Errore:' + error)
          }
        }
        );
    }

    // Cleanup function to abort ongoing requests
    return () => {
      controller1.abort();
      controller2.abort();
    };

  }, [filtro]);

  const refresh = () => {
    console.log('refresh');
    const utente: Utente = Utente.fromJson(JSON.parse(localStorage.getItem('user') || '{}'));

    if (filtro.length == 0) {
      fetchMicrocontrollori(utente.IdUtente, numeroPaginaSelezionata - 1, '')
        .then((data) => {
          setListaMicrocontrolli(data);
        });
    } {
      setFiltro('');
    }
  }

  const rows = listaMicrontrolli.map((row: VistaMicrocontrolloriUtente) => (
    <Table.Tr key={row.IdMicrocontrollore}>
      <Table.Td colSpan={3}  > <Text truncate="end">{row.NomeMicrocontrollore}</Text> </Table.Td>
      <Table.Td colSpan={3}> <Text truncate="end">{row.NomeCampo}</Text></Table.Td>
      <Table.Td colSpan={2}>
        <Text truncate="end">
          {row.Latitudine}
        </Text>
      </Table.Td>
      <Table.Td colSpan={2}>
        <Text truncate="end">
          {row.Longitudine}
        </Text>
      </Table.Td>
      <Table.Td colSpan={1}>
        <ModalModifyArduino idMicrocontrollore={row.IdMicrocontrollore} refreshTabellaPadre={refresh} /> {/* Passa il numero di Arduino */}
      </Table.Td>
    </Table.Tr>
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
          justify="space-between"
          align="center"
          style={{ height: '100%' }}
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
              <Flex
                gap="xl"
                justify="center"
                align="center"
                direction={{ base: 'column', sm: 'column', md: 'row' }}
              >
                <ScrollArea>

                  <TextInput
                    placeholder="Search by any field"
                    mb="md"
                    leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
                    value={filtro}
                    onChange={handleSearchChange}
                  />

                  <Table horizontalSpacing="md" verticalSpacing="md" layout="fixed" withColumnBorders striped highlightOnHover withTableBorder>

                    {/* Intestazioni della tabella */}
                    <Table.Tbody>
                      <Table.Tr>
                        <Table.Th colSpan={3}>
                          <Text fw={500} fz="sm">
                            Nome Arduino
                          </Text>
                        </Table.Th>
                        <Table.Th colSpan={3}>
                          <Text fw={500} fz="sm">
                            Nome Campo Arduino
                          </Text>
                        </Table.Th>
                        <Table.Th colSpan={2}>
                          <Text fw={500} fz="sm" truncate="end">
                            Latitudine
                          </Text>
                        </Table.Th>
                        <Table.Th colSpan={2}>
                          <Text fw={500} fz="sm" truncate="end">
                            Longitudine
                          </Text>
                        </Table.Th>
                        <Table.Th colSpan={1}>
                          <Text fw={500} fz="sm" truncate="end">
                          </Text>
                        </Table.Th>
                      </Table.Tr>
                    </Table.Tbody>

                    {/* Corpo della tabella */}
                    <Table.Tbody>
                      {rows.length > 0 ? (
                        rows
                      ) : (
                        <Table.Tr>
                          <Table.Td colSpan={3}>
                            <Text fw={500} ta="center">
                              Nothing found
                            </Text>
                          </Table.Td>
                        </Table.Tr>
                      )}
                    </Table.Tbody>
                  </Table>
                </ScrollArea>
              </Flex>
              <Space h="lg" />
              <Flex
                gap="xl"
                justify="center"
                align="center">
                <Pagination total={numeroPagineTotali} onChange={setNumeroPaginaSelezionata} radius="md" />
              </Flex>
            </Grid.Col>
          </Grid>
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}