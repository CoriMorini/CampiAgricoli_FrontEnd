import { Text, Card, RingProgress, Group, useMantineTheme, Flex } from '@mantine/core';
import classes from './RingCard.module.css';
import { useEffect, useState } from 'react';
import Utente from '@/models/Utente';
import SaluteCampo from '@/models/SaluteCampo';

export function RingCard() {
    const theme = useMantineTheme();
    const [saluteCampo, setSaluteCampo] = useState<SaluteCampo[]>([]);

    useEffect(() => {
        const utente: Utente = Utente.fromJson(JSON.parse(localStorage.getItem('user') || '{}'));

        if (utente) {
            fetch('https://localhost:44397/Dashboard/GetListCardCampi?idUtente=' + utente.IdUtente, {
                method: 'GET',
            })
                .then((response) => {
                    if (response.status === 200) {
                        return response.json();
                    } else {
                        throw new Error(`Errore di rete! Status code: ${response.status}`);
                    }
                })
                .then((data) => {
                    setSaluteCampo(data);
                    console.log('Salute campo:', data);
                })
                .catch((error) => {
                    alert('Errore:' + error);
                });
        }
    }, []);

    return (
        <div className={classes.container}>
            <Flex mih={50} gap="xs" justify="center" align="center" direction="row" wrap="wrap">
                {saluteCampo.map((campo) => (
                    <Card key={campo.nomeCampo} withBorder p="xl" radius="lg" className={classes.card}>
                        <div className={classes.inner}>
                            <div>
                                <Text fz="xl" className={classes.label}>
                                    {campo.nomeCampo}
                                </Text>
                                <div>
                                    <Text className={classes.lead} mt={30}>
                                        {campo.numeroMisurazioni}
                                    </Text>
                                    <Text fz="xs" c="dimmed">
                                        Misurazioni effettuate
                                    </Text>
                                </div>
                                <Group mt="lg">
                                    <div key="errori">
                                        <Text className={classes.label}>{campo.numeroErrori}</Text>
                                        <Text size="xs" c="dimmed">
                                            Errori rilevati
                                        </Text>
                                    </div>
                                    <div key="microcontrollori">
                                        <Text className={classes.label}>{campo.numeroMicrocontrolloriAttivi}</Text>
                                        <Text size="xs" c="dimmed">
                                            Microcontrollori Attivi
                                        </Text>
                                    </div>
                                </Group>
                            </div>

                            <div className={classes.ring}>
                                <RingProgress
                                    roundCaps
                                    thickness={12}
                                    size={150}
                                    sections={[{ value: campo.saluteCampo, color: theme.primaryColor }]}
                                    rootColor="red"
                                    label={
                                        <div>
                                            <Text ta="center" fz="lg" className={classes.label}>
                                                {campo.saluteCampo + '%'}
                                            </Text>
                                            <Text ta="center" fz="xs" c="dimmed">
                                                Salute campo
                                            </Text>
                                        </div>
                                    }
                                />
                            </div>
                        </div>
                    </Card>
                ))}
            </Flex>
        </div>
    );
}
