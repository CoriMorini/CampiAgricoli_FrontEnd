import { Flex, rem, AppShell, Burger, Container, Grid, Table, Input, InputBase, Combobox, useCombobox } from '@mantine/core';
import { Navbar } from '@/components/Navbar/Navbar';
import { useState } from 'react';
import { useDisclosure } from '@mantine/hooks';
import { IconLeaf } from '@tabler/icons-react';

const npks = [
  { n: 1.5, p: 0.8, k: 2.0, data: '01/02/2024', campo: 3 },
  { n: 1.8, p: 0.9, k: 1.7, data: '05/02/2024', campo: 5 },
  { n: 1.2, p: 0.7, k: 1.9, data: '10/02/2024', campo: 2 },
  { n: 1.7, p: 1.0, k: 2.1, data: '15/02/2024', campo: 7 },
  { n: 1.4, p: 0.85, k: 1.8, data: '20/02/2024', campo: 4 },
  { n: 1.6, p: 0.95, k: 1.9, data: '25/02/2024', campo: 6 }
];

const umiditas = [
  { umidita: 65, data: '01/02/2024', campo: 3 },
  { umidita: 68, data: '05/02/2024', campo: 5 },
  { umidita: 70, data: '10/02/2024', campo: 2 },
  { umidita: 72, data: '15/02/2024', campo: 7 },
  { umidita: 66, data: '20/02/2024', campo: 4 },
  { umidita: 69, data: '25/02/2024', campo: 6 }
];

const tempsAmbiente = [
  { temperaturaAmbiente: 15.5, data: '01/02/2024', campo: 3 },
  { temperaturaAmbiente: 16.2, data: '05/02/2024', campo: 5 },
  { temperaturaAmbiente: 17.0, data: '10/02/2024', campo: 2 },
  { temperaturaAmbiente: 18.3, data: '15/02/2024', campo: 7 },
  { temperaturaAmbiente: 16.8, data: '20/02/2024', campo: 4 },
  { temperaturaAmbiente: 17.5, data: '25/02/2024', campo: 6 }
];

const tempsSuolo = [
  { temperaturaSuolo: 10.5, data: '01/02/2024', campo: 3 },
  { temperaturaSuolo: 11.2, data: '05/02/2024', campo: 5 },
  { temperaturaSuolo: 12.0, data: '10/02/2024', campo: 2 },
  { temperaturaSuolo: 13.3, data: '15/02/2024', campo: 7 },
  { temperaturaSuolo: 11.8, data: '20/02/2024', campo: 4 },
  { temperaturaSuolo: 12.5, data: '25/02/2024', campo: 6 }
];

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
]

export function ReportPage() {
  const [opened, { toggle }] = useDisclosure();

  const npk = npks.map((npk) => (
    <Table.Tr key={npk.campo}>
      <Table.Td>{npk.n}</Table.Td>
      <Table.Td>{npk.p}</Table.Td>
      <Table.Td>{npk.k}</Table.Td>
      <Table.Td>{npk.data}</Table.Td>
    </Table.Tr>
  ));

  const umidita = umiditas.map((umidita) => (
    <Table.Tr key={umidita.campo}>
      <Table.Td>{umidita.umidita}</Table.Td>
      <Table.Td>{umidita.data}</Table.Td>
    </Table.Tr>
  ));

  const tempAmbiente = tempsAmbiente.map((tempAmbiente) => (
    <Table.Tr key={tempAmbiente.campo}>
      <Table.Td>{tempAmbiente.temperaturaAmbiente}</Table.Td>
      <Table.Td>{tempAmbiente.data}</Table.Td>
    </Table.Tr>
  ));

  const tempSuolo = tempsSuolo.map((tempSuolo) => (
    <Table.Tr key={tempSuolo.campo}>
      <Table.Td>{tempSuolo.temperaturaSuolo}</Table.Td>
      <Table.Td>{tempSuolo.data}</Table.Td>
    </Table.Tr>
  ));

  const combobox = useCombobox({
    onDropdownClose: () => combobox.resetSelectedOption(),
  });

  const [value, setValue] = useState<string | null>(null);

  const options = campi.map((item) => (
    <Combobox.Option value={item} key={item}>
      {item}
    </Combobox.Option>
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
        <Container size="xl">
          <Grid gutter="xl">
            <Grid.Col>
              <Flex mih={50} gap="md" justify="center" align="center" direction="row" wrap="wrap">
                <Combobox
                  store={combobox}
                  onOptionSubmit={(val) => {
                    setValue(val);
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
                      {value || <Input.Placeholder>Seleziona un campo</Input.Placeholder>}
                    </InputBase>
                  </Combobox.Target>

                  <Combobox.Dropdown>
                    <Combobox.Options mah={200} style={{ overflowY: 'auto' }}>
                      {options}
                    </Combobox.Options>
                  </Combobox.Dropdown>
                </Combobox>
              </Flex>
            </Grid.Col>
            <Grid.Col>
              <Flex gap="xl" justify="center" align="center" direction={{ base: 'column', md: 'row' }}>
                <Table verticalSpacing="md" striped highlightOnHover withTableBorder>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>N (Azoto)</Table.Th>
                      <Table.Th>P (Fosforo)</Table.Th>
                      <Table.Th>K (Potassio)</Table.Th>
                      <Table.Th>Data misurazione</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>{npk}</Table.Tbody>
                  <Table.Caption>N: tra 1.2 e 1.8% P: tra 0.7 e 1.0% K: tra 1.7 e 2.1%</Table.Caption>
                </Table>
                <Table verticalSpacing="md" striped highlightOnHover withTableBorder>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Umidità del suolo (%)</Table.Th>
                      <Table.Th>Data misurazione</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>{umidita}</Table.Tbody>
                  <Table.Caption>Percentuale di umidità nel terreno</Table.Caption>
                </Table>
              </Flex>
            </Grid.Col>
            <Grid.Col>
              <Flex gap="xl" justify="center" align="center" direction={{ base: 'column', md: 'row' }}>
                <Table verticalSpacing="md" striped highlightOnHover withTableBorder>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Temperatura ambiente</Table.Th>
                      <Table.Th>Data misurazione</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>{tempAmbiente}</Table.Tbody>
                  <Table.Caption>Temperatura dell'aria nel campo (°C)</Table.Caption>
                </Table>

                <Table verticalSpacing="md" striped highlightOnHover withTableBorder>
                  <Table.Thead>
                    <Table.Tr>
                      <Table.Th>Temperatura del suolo</Table.Th>
                      <Table.Th>Data misurazione</Table.Th>
                    </Table.Tr>
                  </Table.Thead>
                  <Table.Tbody>{tempSuolo}</Table.Tbody>
                  <Table.Caption>Temperatura del suolo (°C)</Table.Caption>
                </Table>
              </Flex>
            </Grid.Col>
          </Grid>
        </Container>
      </AppShell.Main>
    </AppShell>
  );
}



/* 
            <Combobox
              store={combobox}
              onOptionSubmit={(val) => {
                setValue(val);
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
                  {value || <Input.Placeholder>Seleziona un campo</Input.Placeholder>}
                </InputBase>
              </Combobox.Target>

              <Combobox.Dropdown>
                <Combobox.Options mah={200} style={{ overflowY: 'auto' }}>
                  {options}
                </Combobox.Options>
              </Combobox.Dropdown>
            </Combobox>


              <Table verticalSpacing="md" striped highlightOnHover withTableBorder>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>N (Azoto)</Table.Th>
                    <Table.Th>P (Fosforo)</Table.Th>
                    <Table.Th>K (Potassio)</Table.Th>
                    <Table.Th>Data misurazione</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{npk}</Table.Tbody>
                <Table.Caption>N: tra 1.2 e 1.8% P: tra 0.7 e 1.0% K: tra 1.7 e 2.1%</Table.Caption>
              </Table>

              <Table verticalSpacing="md" striped highlightOnHover withTableBorder>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Umidità del suolo (%)</Table.Th>
                    <Table.Th>Data misurazione</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{umidita}</Table.Tbody>
                <Table.Caption>Percentuale di umidità nel terreno</Table.Caption>
              </Table>

              <Table verticalSpacing="md" striped highlightOnHover withTableBorder>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Temperatura ambiente</Table.Th>
                    <Table.Th>Data misurazione</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{tempAmbiente}</Table.Tbody>
                <Table.Caption>Temperatura dell'aria nel campo (°C)</Table.Caption>
              </Table>
            
              <Table verticalSpacing="md" striped highlightOnHover withTableBorder>
                <Table.Thead>
                  <Table.Tr>
                    <Table.Th>Temperatura del suolo</Table.Th>
                    <Table.Th>Data misurazione</Table.Th>
                  </Table.Tr>
                </Table.Thead>
                <Table.Tbody>{tempSuolo}</Table.Tbody>
                <Table.Caption>Temperatura del suolo (°C)</Table.Caption>
              </Table>              
*/