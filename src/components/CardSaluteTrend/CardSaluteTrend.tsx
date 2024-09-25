import { RingProgress, Text, SimpleGrid, Paper, Center, Group, rem } from '@mantine/core';
import { IconArrowUpRight, IconArrowDownRight } from '@tabler/icons-react';

const icons = {
  up: IconArrowUpRight,
  down: IconArrowDownRight,
};

const data = [
  { label: 'Salute campo', stats: '456,578', progress: 65, color: 'teal', icon: 'up' },
] as const;

const getColor = (value: number): string => {
  // Assicurati che il valore sia compreso tra 0 e 100
  const clampedValue = Math.min(100, Math.max(0, value));

  // Definiamo i colori come array RGB
  const red = [201, 42, 42];   // Rosso
  const yellow = [245, 159, 0]; // Giallo
  const green = [43, 138, 62];  // Verde

  let r: number, g: number, b: number;

  if (clampedValue <= 50) {
      // Interpolazione tra rosso e giallo
      const ratio = clampedValue / 50;
      r = red[0] + ratio * (yellow[0] - red[0]);
      g = red[1] + ratio * (yellow[1] - red[1]);
      b = red[2] + ratio * (yellow[2] - red[2]);
  } else {
      // Interpolazione tra giallo e verde
      const ratio = (clampedValue - 50) / 50;
      r = yellow[0] + ratio * (green[0] - yellow[0]);
      g = yellow[1] + ratio * (green[1] - yellow[1]);
      b = yellow[2] + ratio * (green[2] - yellow[2]);
  }

  // Convertiamo i valori RGB in una stringa di colore CSS
  return `rgb(${Math.round(r)}, ${Math.round(g)}, ${Math.round(b)})`;
};


// Definisci l'interfaccia per le props del componente
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