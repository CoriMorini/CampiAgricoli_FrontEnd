import { Flex, rem, AppShell, Burger, Container, Grid, Table } from '@mantine/core';
import { Navbar } from '@/components/Navbar/Navbar';
import { useDisclosure } from '@mantine/hooks';
import { IconLeaf } from '@tabler/icons-react';

const datas = [
  { tipologia: 'Misurazione', campo: 3, data: '2024-09-18 10:24', utente: 'user1' },
  { tipologia: 'Manutenzione', campo: 7, data: '2024-09-18 09:45', utente: 'admin' },
  { tipologia: 'Aggiornamento', campo: 2, data: '2024-09-18 11:10', utente: 'user5' },
  { tipologia: 'Controllo', campo: 1, data: '2024-09-17 16:30', utente: 'user3' },
  { tipologia: 'Misurazione', campo: 4, data: '2024-09-17 14:20', utente: 'user7' },
  { tipologia: 'Manutenzione', campo: 6, data: '2024-09-16 18:00', utente: 'user2' },
  { tipologia: 'Aggiornamento', campo: 8, data: '2024-09-16 12:35', utente: 'user10' },
  { tipologia: 'Controllo', campo: 9, data: '2024-09-16 11:05', utente: 'user4' },
  { tipologia: 'Misurazione', campo: 5, data: '2024-09-15 08:45', utente: 'user9' },
  { tipologia: 'Manutenzione', campo: 10, data: '2024-09-15 15:50', utente: 'user6' }
];


export function LogPage() {
  const [opened, { toggle }] = useDisclosure();

  const data = datas.map((data) => (
    <Table.Tr key={data.campo}>
      <Table.Td>{data.tipologia}</Table.Td>
      <Table.Td>{data.campo}</Table.Td>
      <Table.Td>{data.utente}</Table.Td>
      <Table.Td>{data.data}</Table.Td>
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
        <div>
          PROVVISORIA. implementare ricerca, filtro (combo per campo) e ordinamento
        </div>
        <Container size="xl">
          <Grid gutter="xl">
            <Grid.Col>
              <Flex gap="xl" justify="center" align="center" direction={{ base: 'column', md: 'row' }}>
                <Table verticalSpacing="md" striped highlightOnHover withTableBorder>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Tipologia</Table.Th>
                      <Table.Th>Campo</Table.Th>
                      <Table.Th>Utente</Table.Th>
                      <Table.Th>Data e ora</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>{data}</Table.Tbody>
                </Table>
              </Flex>
            </Grid.Col>
          </Grid>
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}
