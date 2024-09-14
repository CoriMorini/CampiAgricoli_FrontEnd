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
    </div>
  );
}
