import { Text, Card, RingProgress, Group, useMantineTheme, } from '@mantine/core';
import classes from './CardCampiDashboard.module.css';
import { useEffect, useState } from 'react';
import Utente from '@/models/Utente';
import SaluteCampo from '@/models/SaluteCampo';
import { Carousel } from '@mantine/carousel';

const apiUrl = import.meta.env.VITE_API_URL;

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

export function CardCampiDashboard() {
    const theme = useMantineTheme();
    const [saluteCampo, setSaluteCampo] = useState<SaluteCampo[]>([]);

    useEffect(() => {
        const utente: Utente = Utente.fromJson(JSON.parse(localStorage.getItem('user') || '{}'));

        if (utente) {
            fetch(apiUrl + 'Dashboard/GetListCardCampi?idUtente=' + utente.IdUtente, {
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
        <Carousel align="start" slideSize="30%" slideGap="sm" withControls={false} loop dragFree>
            {saluteCampo.map((campo) => (
                <Carousel.Slide key={campo.nomeCampo}>
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
                                    sections={[{ value: campo.saluteCampo, color: getColor(campo.saluteCampo) }]}
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
                </Carousel.Slide>
            ))}
        </Carousel>
    );
}
