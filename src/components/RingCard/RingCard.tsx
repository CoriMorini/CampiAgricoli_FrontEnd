import { Text, Card, RingProgress, Group, useMantineTheme } from '@mantine/core';
import classes from './RingCard.module.css';

const stats = [
    { value: 447, label: 'Rimanente' },
    { value: 76, label: 'In corso' },
];

export function RingCard() {
    const theme = useMantineTheme();
    const completed = 1887;
    const total = 2334;
    const items = stats.map((stat) => (
        <div key={stat.label}>
            <Text className={classes.label}>{stat.value}</Text>
            <Text size="xs" c="dimmed">
                {stat.label}
            </Text>
        </div>
    ));

    return (
        <div className={classes.container}>
            <Card withBorder p="xl" radius="lg" className={classes.card}>
                <div className={classes.inner}>
                    <div>
                        <Text fz="xl" className={classes.label}>
                            # Campo
                        </Text>
                        <div>
                            <Text className={classes.lead} mt={30}>
                                1887
                            </Text>
                            <Text fz="xs" c="dimmed">
                                Completato
                            </Text>
                        </div>
                        <Group mt="lg">{items}</Group>
                    </div>

                    <div className={classes.ring}>
                        <RingProgress
                            roundCaps
                            thickness={6}
                            size={150}
                            sections={[{ value: (completed / total) * 100, color: theme.primaryColor }]}
                            label={
                                <div>
                                    <Text ta="center" fz="lg" className={classes.label}>
                                        {((completed / total) * 100).toFixed(0)}%
                                    </Text>
                                    <Text ta="center" fz="xs" c="dimmed">
                                        Completato
                                    </Text>
                                </div>
                            }
                        />
                    </div>
                </div>
            </Card>
        </div>
    );
}