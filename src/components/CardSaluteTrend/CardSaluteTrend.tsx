import { RingProgress, Text, SimpleGrid, Paper, Center, Group, rem } from '@mantine/core';
import { IconArrowUpRight, IconArrowDownRight } from '@tabler/icons-react';

const icons = {
  up: IconArrowUpRight,
  down: IconArrowDownRight,
};

// Da modificare icon up e down
//
const data = [
  { label: 'Salute campo', icon: 'up' },
] as const;

// Funzione 'getColor':
// - Calcola il colore corrispondente a un valore percentuale (0-100), passando dal rosso (0) al giallo (50) fino al verde (100).
// - Clampa il valore tra 0 e 100 per garantire che rientri nel range valido.
// - Usa l'interpolazione lineare per calcolare i componenti RGB tra rosso e giallo (per valori ≤ 50) e tra giallo e verde (per valori > 50).
// - Restituisce il colore calcolato in formato 'rgb()'.
//
const getColor = (value: number): string => {

  const clampedValue = Math.min(100, Math.max(0, value));

  const red = [201, 42, 42];
  const yellow = [245, 159, 0];
  const green = [43, 138, 62];

  let r: number, g: number, b: number;

  if (clampedValue <= 50) {
      const ratio = clampedValue / 50;
      r = red[0] + ratio * (yellow[0] - red[0]);
      g = red[1] + ratio * (yellow[1] - red[1]);
      b = red[2] + ratio * (yellow[2] - red[2]);
  } else {
      const ratio = (clampedValue - 50) / 50;
      r = yellow[0] + ratio * (green[0] - yellow[0]);
      g = yellow[1] + ratio * (green[1] - yellow[1]);
      b = yellow[2] + ratio * (green[2] - yellow[2]);
  }

  return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
};

interface StatsRingProps {
  punteggioSalute: number;
}


export function CardSaluteTrend({ punteggioSalute }: StatsRingProps) {
  const stats = data.map((stat) => {
    const Icon = icons[stat.icon];
    return (
      <Paper withBorder radius="md" p="xs" key={stat.label}>
        <Group>
          <RingProgress
            size={80}
            roundCaps
            thickness={8}
            sections={[{ value: punteggioSalute, color: getColor(punteggioSalute) }]}
            label={
              <Center>
                <Icon style={{ width: rem(20), height: rem(20) }} stroke={1.5} />
              </Center>
            }
          />

          <div>
            <Text c="dimmed" size="xs" tt="uppercase" fw={700}>
              {stat.label}
            </Text>
            <Text fw={700} size="xl">
              {punteggioSalute}
            </Text>
          </div>
        </Group>
      </Paper>
    );
  });

  return <SimpleGrid cols={{ base: 1, sm: 1 }}>{stats}</SimpleGrid>;
}