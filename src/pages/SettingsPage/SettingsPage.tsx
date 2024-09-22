import {
  Flex, rem, AppShell, Burger, Container, Grid, Table, ScrollArea, UnstyledButton, Group, Text, Center, TextInput, keys,
} from '@mantine/core';
import { Navbar } from '@/components/Navbar/Navbar';
import { useDisclosure } from '@mantine/hooks';
import { IconLeaf } from '@tabler/icons-react';
import { useState } from 'react';
import { IconSelector, IconChevronDown, IconChevronUp, IconSearch } from '@tabler/icons-react';
import classes from './SettingsPage.module.css';
import { ModalButton } from '@/components/ModalButton/ModalButton';

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

function Th({ children, reversed, sorted, onSort }: ThProps) {
  const Icon = sorted ? (reversed ? IconChevronUp : IconChevronDown) : IconSelector;
  return (
    <Table.Th className={classes.th}>
      <UnstyledButton onClick={onSort} className={classes.control}>
        <Group justify="space-between">
          <Text fw={500} fz="sm">
            {children}
          </Text>
          <Center className={classes.icon}>
            <Icon style={{ width: rem(16), height: rem(16) }} stroke={1.5} />
          </Center>
        </Group>
      </UnstyledButton>
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
        return String(b[sortBy]).localeCompare(String(a[sortBy]));
      }

      return String(a[sortBy]).localeCompare(String(b[sortBy]));
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
  { arduinoNumber: 10, fieldNumber: 10 },
];

export function SettingsPage() {
  const [opened, { toggle }] = useDisclosure();
  const [search, setSearch] = useState('');
  const [sortedData, setSortedData] = useState(DATA);
  const [sortBy, setSortBy] = useState<keyof RowData | null>(null);
  const [reverseSortDirection, setReverseSortDirection] = useState(false);

  const setSorting = (field: keyof RowData) => {
    const reversed = field === sortBy ? !reverseSortDirection : false;
    setReverseSortDirection(reversed);
    setSortBy(field);
    setSortedData(sortData(DATA, { sortBy: field, reversed, search }));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.currentTarget;
    setSearch(value);
    setSortedData(sortData(DATA, { sortBy, reversed: reverseSortDirection, search: value }));
  };

  const rows = sortedData.map((row) => (
    <Table.Tr key={row.arduinoNumber}>
      <Table.Td>{row.arduinoNumber}</Table.Td>
      <Table.Td>{row.fieldNumber}</Table.Td>
      <Table.Td><ModalButton /></Table.Td>
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
                direction={{ base: 'column', md: 'row' }}
              >
                <ScrollArea>
                  <TextInput
                    placeholder="Search by any field"
                    mb="md"
                    leftSection={<IconSearch style={{ width: rem(16), height: rem(16) }} stroke={1.5} />}
                    value={search}
                    onChange={handleSearchChange}
                  />
                  <Table horizontalSpacing="md" verticalSpacing="md" miw={700} layout="fixed" striped highlightOnHover withTableBorder>
                    <Table.Tbody>
                      <Table.Tr>
                        <Th
                          sorted={sortBy === 'arduinoNumber'}
                          reversed={reverseSortDirection}
                          onSort={() => setSorting('arduinoNumber')}
                        >
                          Numero Arduino
                        </Th>
                        <Th
                          sorted={sortBy === 'fieldNumber'}
                          reversed={reverseSortDirection}
                          onSort={() => setSorting('fieldNumber')}
                        >
                          Numero Campo
                        </Th>
                        <Table.Th className={classes.th}>
                          <Text fw={500} fz="sm">
                            Azione
                          </Text>
                        </Table.Th>
                      </Table.Tr>
                    </Table.Tbody>
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
            </Grid.Col>
          </Grid>
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}