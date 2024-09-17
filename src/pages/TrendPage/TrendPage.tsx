import { useState } from 'react';
import { Flex, Grid } from '@mantine/core';
import { Navbar } from '@/components/Navbar/Navbar';
import { Input, InputBase, Combobox, useCombobox } from '@mantine/core';
import { StatsGrid } from '@/components/StatsGrid/StatsGrid';
import { Sparkline } from '@mantine/charts';
import { Text } from '@mantine/core';
import { LineChart } from '@mantine/charts';

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

const data = [
  {
    date: 'Mar 22',
    Apples: 50,
  },
  {
    date: 'Mar 23',
    Apples: 60,
  },
  {
    date: 'Mar 24',
    Apples: 40,
  },
  {
    date: 'Mar 25',
    Apples: 30,
  },
  {
    date: 'Mar 26',
    Apples: 0,
  },
  {
    date: 'Mar 27',
    Apples: 20,
  },
  {
    date: 'Mar 28',
    Apples: 20,
  },
  {
    date: 'Mar 29',
    Apples: 10,
  },
];

const positiveTrend = [10, 20, 40, 20, 40, 10, 50];
const negativeTrend = [50, 40, 20, 40, 20, 40, 10];
const neutralTrend = [10, 20, 40, 20, 40, 10, 50, 5, 10];

export function TrendPage() {
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
    <div>
      <Grid overflow="hidden">
        <Grid.Col span="content">
          <Navbar />
        </Grid.Col>
        <Grid.Col span="auto">
          <Flex gap="xl" justify="center" align="center">
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
          <Flex gap="xl" justify="center" align="center">
            <div>NPK</div>
            <StatsGrid />
            <Text>Andamento ultimo periodo:</Text>
            <Sparkline
              w={200}
              h={60}
              data={positiveTrend}
              trendColors={{ positive: 'teal.6', negative: 'red.6', neutral: 'gray.5' }}
              fillOpacity={0.2}
            />
            <div style={{ width: '100%', maxWidth: '450px' }}>
            <LineChart
              h={300}
              data={data}
              dataKey="date"
              yAxisProps={{ domain: [0, 100] }}
              referenceLines={[
                { y: 40, label: 'Media mensile', color: 'red.6' },
                { x: 'Mar 25', label: 'Report out' },
              ]}
              series={[{ name: 'Apples', color: 'indigo.6' }]}
            />
            </div>
          </Flex>
          <Flex gap="xl" justify="center" align="center">
            <div>Umidità</div>
            <StatsGrid />
            <Text>Andamento ultimo periodo:</Text>
            <Sparkline
              w={200}
              h={60}
              data={positiveTrend}
              trendColors={{ positive: 'teal.6', negative: 'red.6', neutral: 'gray.5' }}
              fillOpacity={0.2}
            />
            <div style={{ width: '100%', maxWidth: '450px' }}>
            <LineChart
              h={300}
              data={data}
              dataKey="date"
              yAxisProps={{ domain: [0, 100] }}
              referenceLines={[
                { y: 40, label: 'Media mensile', color: 'red.6' },
                { x: 'Mar 25', label: 'Report out' },
              ]}
              series={[{ name: 'Apples', color: 'indigo.6' }]}
            />
            </div>
          </Flex>
          <Flex gap="xl" justify="center" align="center">
            <div>Temperatura ambiente</div>
            <StatsGrid />
            <Text mt="md">Andamento ultimo periodo:</Text>
            <Sparkline
              w={200}
              h={60}
              data={negativeTrend}
              trendColors={{ positive: 'teal.6', negative: 'red.6', neutral: 'gray.5' }}
              fillOpacity={0.2}
            />
            <div style={{ width: '100%', maxWidth: '450px' }}>
            <LineChart
              h={300}
              data={data}
              dataKey="date"
              yAxisProps={{ domain: [0, 100] }}
              referenceLines={[
                { y: 40, label: 'Media mensile', color: 'red.6' },
                { x: 'Mar 25', label: 'Report out' },
              ]}
              series={[{ name: 'Apples', color: 'indigo.6' }]}
            />
            </div>
          </Flex>
          <Flex gap="xl" justify="center" align="center">
            <div>Temperatura suolo</div>
            <StatsGrid />
            <Text mt="md">Andamento ultimo periodo:</Text>
            <Sparkline
              w={200}
              h={60}
              data={neutralTrend}
              trendColors={{ positive: 'teal.6', negative: 'red.6', neutral: 'gray.5' }}
              fillOpacity={0.2}
            />
            <div style={{ width: '100%', maxWidth: '450px' }}>
            <LineChart
              h={300}
              data={data}
              dataKey="date"
              yAxisProps={{ domain: [0, 100] }}
              referenceLines={[
                { y: 40, label: 'Media mensile', color: 'red.6' },
                { x: 'Mar 25', label: 'Report out' },
              ]}
              series={[{ name: 'Apples', color: 'indigo.6' }]}
            />
            </div>
          </Flex>
        </Grid.Col>
      </Grid>
    </div>
  );
}
