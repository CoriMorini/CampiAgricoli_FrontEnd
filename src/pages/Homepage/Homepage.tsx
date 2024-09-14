import { IconCapsuleHorizontal } from '@tabler/icons-react';
import { Flex } from '@mantine/core';
import { Navbar } from '@/components/Navbar/Navbar';
import { RingCard } from '@/components/RingCard/RingCard';
import styles from './Homepage.module.css';

export function HomePage() {
  return (
    <div className={styles.container}>
      <Navbar />
      <Flex
        mih={50}
        bg="rgba(255, 0, 0, .3)"
        gap="xs"
        justify="flex-start"
        align="flex-start"
        direction="row"
        wrap="wrap"
      >
        <RingCard />
        <RingCard />
        <RingCard />
      </Flex>
    </div>
  );
}
