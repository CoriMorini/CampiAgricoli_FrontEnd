import {
  Flex, rem, AppShell, Burger, Container, Grid, Table, ScrollArea, UnstyledButton, Group, Text, Center, TextInput, keys,
  Space,
  Button,
} from '@mantine/core';
import { Navbar } from '@/components/Navbar/Navbar';
import { useDisclosure } from '@mantine/hooks';
import { IconLeaf } from '@tabler/icons-react';
import { useEffect, useState } from 'react';
import { IconSelector, IconChevronDown, IconChevronUp, IconSearch } from '@tabler/icons-react';
import classes from './MicrocontrolloriPage.module.css';
import { ModalButton } from '@/components/ModalButton/ModalButton';
import { use } from 'chai';
import Utente from '@/models/Utente';
import Microcontrollore from '@/models/Microcontrollore';
import { Pagination } from '@mantine/core';

interface RowData {
  arduinoNumber: number;
  fieldNumber: number;
}

interface ThProps {
  children: React.ReactNode;
  reversed: boolean;
  sorted: boolean;
  onSort(): void;
}

function Th({ children }: ThProps) {
  return (
    <Table.Th className={classes.th}>
      <div className={classes.control}>
        <Group justify="space-between">
          <Text fw={500} fz="sm">
            {children}
          </Text>
        </Group>
      </div>
    </Table.Th>
  );
}

function filterData(data: RowData[], search: string) {
  const query = search.toLowerCase().trim();
  return data.filter((item) =>
    keys(data[0]).some((key) => String(item[key]).toLowerCase().includes(query))
  );
}

function sortData(
  data: RowData[],
  payload: { sortBy: keyof RowData | null; reversed: boolean; search: string }
) {
  const { sortBy } = payload;

  if (!sortBy) {
    return filterData(data, payload.search);
  }

  return filterData(
    [...data].sort((a, b) => {
      if (payload.reversed) {
        return b[sortBy] - a[sortBy]; // Confronto numerico per ordinamento decrescente
      }

      return a[sortBy] - b[sortBy]; // Confronto numerico per ordinamento crescente
    }),
    payload.search
  );
}

// Definizione dei dati come array di costanti
const DATA: RowData[] = [
  { arduinoNumber: 1, fieldNumber: 1 },
  { arduinoNumber: 2, fieldNumber: 2 },
  { arduinoNumber: 3, fieldNumber: 3 },
  { arduinoNumber: 4, fieldNumber: 4 },
  { arduinoNumber: 5, fieldNumber: 5 },
  { arduinoNumber: 6, fieldNumber: 6 },
  { arduinoNumber: 7, fieldNumber: 7 },
  { arduinoNumber: 8, fieldNumber: 8 },
  { arduinoNumber: 9, fieldNumber: 9 },
  { arduinoNumber: 11, fieldNumber: 10 },
];

export function MicrocontrolloriPage() {
  const [opened, { toggle }] = useDisclosure();
  const [filtro, setFiltro] = useState('');
  const [listaMicrontrolli, setListaMicrocontrolli] = useState([]);
  const [numeroPaginaSelezionata, setNumeroPaginaSelezionata] = useState(1);
  const [numeroPagineTotali, setNumeroPagineTotali] = useState(1);

  //const [sortedData, setSortedData] = useState(DATA);
  //const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  //const [reverseSortDirection, setReverseSortDirection] = useState(false);

  
  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setFiltro(value);
    //setSortedData(sortData(DATA, { sortBy, reversed: reverseSortDirection, search: value }));
  };
  

  const rows = listaMicrontrolli.map((row: Microcontrollore) => (
    <Table.Tr key={row.IdMicrocontrollore}>
      <Table.Td>{row.NomeMicrocontrollore}</Table.Td>
      <Table.Td>{row.NomeCampo}</Table.Td>
      <Table.Td>
        {row.Latitudine}
      </Table.Td>
      <Table.Td>
        {row.Longitudine}
      </Table.Td>
      <Table.Td>
        <ModalButton arduinoNumber={row.IdMicrocontrollore} /> {/* Passa il numero di Arduino */}
      </Table.Td>
    </Table.Tr>
  ));

  useEffect(() => {

    const utente: Utente = Utente.fromJson(JSON.parse(localStorage.getItem('user') || '{}'));

    if (utente) {

      // Get Numero Pagine Totali
      fetch('https://localhost:44397/Microcontrollori/GetNumeroPagine?idUtente='
        + utente.IdUtente
        + (filtro ? '&filtro=' + filtro : ''), {
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
          setNumeroPagineTotali(data);
          setNumeroPaginaSelezionata(1);
        })
        .catch((error) => {
          alert('Errore:' + error)}
        );

    }

  }, []);

  useEffect(() => {

    const utente: Utente = Utente.fromJson(JSON.parse(localStorage.getItem('user') || '{}'));

    console.log('url: ' + 'https://localhost:44397/Microcontrollori/GetMicrocontrollori?idUtente='
        + utente.IdUtente
        + '&numeroPagina='
        + (numeroPaginaSelezionata - 1)
        + (filtro ? '&filtro=' + filtro : ''))

    if (utente) {

      // Get Microcontrollori
      fetch('https://localhost:44397/Microcontrollori/GetMicrocontrollori?idUtente='
        + utente.IdUtente
        + '&numeroPagina='
        + (numeroPaginaSelezionata - 1)
        + (filtro ? '&filtro=' + filtro : ''), {
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
          setListaMicrocontrolli(data);
        })
        .catch((error) => {
          alert('Errore:' + error);
        });

    }

  }, [numeroPaginaSelezionata]);

  useEffect(() => {

    const utente: Utente = Utente.fromJson(JSON.parse(localStorage.getItem('user') || '{}'));

    console.log('url: ' + 'https://localhost:44397/Microcontrollori/GetMicrocontrollori?idUtente='
        + utente.IdUtente
        + '&numeroPagina=0'
        + (filtro ? '&filtro=' + filtro : ''))

    if (utente) {

      // Get Microcontrollori
      fetch('https://localhost:44397/Microcontrollori/GetMicrocontrollori?idUtente='
        + utente.IdUtente
        + '&numeroPagina=0'
        + (filtro ? '&filtro=' + filtro : ''), {
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
          setListaMicrocontrolli(data);
        })
        .catch((error) => {
          setListaMicrocontrolli([]);
          //alert('Errore:' + error);
        });

    }

  }, [filtro]);



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
                // Set the breakpoint to change flex direction at 'sm' (small screens)
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
              
            

                  <Table horizontalSpacing="md" verticalSpacing="md" layout="fixed" striped highlightOnHover withTableBorder>

                    {/* Intestazioni della tabella */}
                    <Table.Tbody>
                      <Table.Tr>
                        <Table.Th>
                          <Text fw={500} fz="sm">
                            Nome Arduino
                          </Text>
                        </Table.Th>
                        <Table.Th>
                          <Text fw={500} fz="sm">
                            Nome Campo Arduino
                          </Text>
                        </Table.Th>
                        <Table.Th>
                          <Text fw={500} fz="sm">
                            Latidine
                          </Text>
                        </Table.Th>
                        <Table.Th>
                          <Text fw={500} fz="sm">
                            Longitudine
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