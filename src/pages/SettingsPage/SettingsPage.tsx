import { IconCapsuleHorizontal } from '@tabler/icons-react';
import { Flex, Grid } from '@mantine/core';
import { Navbar } from '@/components/Navbar/Navbar';

export function SettingsPage() {
  return (
    <div>
      <Grid overflow="hidden">
        <Grid.Col span="content">
          <Navbar />
        </Grid.Col>
        <Grid.Col span="auto">
          <Flex justify="center" align="center" style={{ width: '100%' }}>
            <div>Settings Page</div>
          </Flex>
        </Grid.Col>
      </Grid>
    </div>
  );
}
