import {
  IconArrowDownRight,
  IconArrowUpRight,
  IconSquareLetterK,
  IconSquareLetterN,
  IconSquareLetterP,
} from '@tabler/icons-react';
import { Group, Paper, SimpleGrid, Text } from '@mantine/core';
import NPKCampoMediaMeseCorrente from '@/models/NPKCampoMediaMeseCorrente';

// Definisco l'interfaccia per le props del componente
//
interface StatsGridProps {
  NPKCampoMediaMeseCorrente: NPKCampoMediaMeseCorrente | null;
}

export function NPKCardDashboard({ NPKCampoMediaMeseCorrente }: StatsGridProps) {
  // Definisco tre carte separate
  //
  const stats = [
    {
      title: 'Azoto',
      value: NPKCampoMediaMeseCorrente ? NPKCampoMediaMeseCorrente.ValoreMedioN.toFixed(2) : 'N/A',
      diff: NPKCampoMediaMeseCorrente
        ? parseFloat((NPKCampoMediaMeseCorrente.deltaN * 100).toFixed(2))
        : 0,
      icon: IconSquareLetterN,
    },
    {
      title: 'Fosforo',
      value: NPKCampoMediaMeseCorrente ? NPKCampoMediaMeseCorrente.ValoreMedioP.toFixed(2) : 'N/A',
      diff: NPKCampoMediaMeseCorrente
        ? parseFloat((NPKCampoMediaMeseCorrente.deltaP * 100).toFixed(2))
        : 0,
      icon: IconSquareLetterP,
    },
    {
      title: 'Potassio',
      value: NPKCampoMediaMeseCorrente ? NPKCampoMediaMeseCorrente.ValoreMedioK.toFixed(2) : 'N/A',
      diff: NPKCampoMediaMeseCorrente
        ? parseFloat((NPKCampoMediaMeseCorrente.deltaK * 100).toFixed(2))
        : 0,
      icon: IconSquareLetterK,
    },
  ].map((stat) => {
    const DiffIcon = stat.diff > 0 ? IconArrowUpRight : IconArrowDownRight;

    return (
      <Paper withBorder p="md" radius="md" key={stat.title}>
        <Group justify="space-between">
          <Text size="xs" c="dimmed">
            {stat.title}
          </Text>
          <stat.icon size="1.4rem" stroke={1.5} />
        </Group>

        <Group align="flex-end" gap="xs" mt={25}>
          <Text>{stat.value}</Text>
          <Text c={stat.diff > 0 ? 'teal' : 'red'} fz="sm" fw={500}>
            <span>{stat.diff}%</span>
            <DiffIcon size="1rem" stroke={1.5} />
          </Text>
        </Group>

        <Text fz="xs" c="dimmed" mt={7}>
          Quantità media nel terreno
        </Text>
      </Paper>
    );
  });

  return (
    <div>
      <SimpleGrid cols={{ base: 1, xs: 2, md: 3 }}>{stats}</SimpleGrid>
    </div>
  );
}
