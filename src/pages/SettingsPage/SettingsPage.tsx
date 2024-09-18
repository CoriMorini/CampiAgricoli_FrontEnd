import { Flex, rem, AppShell, Burger, Container, Grid, Table } from '@mantine/core';
import { Navbar } from '@/components/Navbar/Navbar';
import { useDisclosure } from '@mantine/hooks';
import { IconLeaf } from '@tabler/icons-react';

export function SettingsPage() {
  const [opened, { toggle }] = useDisclosure();

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
        
      </AppShell.Main>
    </AppShell>
  );
}
