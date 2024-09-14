import { IconCapsuleHorizontal } from '@tabler/icons-react';
import { Flex } from '@mantine/core';
import { Navbar } from '@/components/Navbar/Navbar';
import { RingCard } from '@/components/RingCard/RingCard';
import styles from './Homepage.module.css';

export function HomePage() {
  return (
    <div className={styles.container}>
      <Navbar />
        <RingCard />
        <RingCard />
        <RingCard />
      </Flex>
    </div>
  );
}
