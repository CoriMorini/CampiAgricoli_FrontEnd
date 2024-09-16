import { IconCapsuleHorizontal } from '@tabler/icons-react';
import { Flex } from '@mantine/core';
import { Navbar } from '@/components/Navbar/Navbar';
import { Grid } from '@mantine/core';

export function Report() {
  return (
    <div>
      <Grid overflow="hidden">
        <Grid.Col span="content">
          <Navbar />
        </Grid.Col>
        <Grid.Col span="auto">
          <Flex
            justify="center"
            align="center"
            style={{ width: '100%' }}
          >

          </Flex>
        </Grid.Col>
      </Grid>
    </div>
  );
}
