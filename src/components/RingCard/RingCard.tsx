import { Text, Card, RingProgress, Group, useMantineTheme } from '@mantine/core';
import classes from './RingCard.module.css';

// La funzione calcolaPunteggioSalute è già definita
function calcolaPunteggioSalute(NPK: number, tempAmbiente: number, tempSuolo: number, umidita: number): number {
    const NPKScore = Math.min(Math.max((NPK - 100) / (200 - 100), 0), 1);
    const tempAmbienteScore = Math.min(Math.max((tempAmbiente - 20) / (30 - 20), 0), 1);
    const tempSuoloScore = Math.min(Math.max((tempSuolo - 15) / (25 - 15), 0), 1);
    const umiditaScore = Math.min(Math.max((umidita - 40) / (60 - 40), 0), 1);

    const punteggioSalute =
        0.4 * NPKScore +
        0.2 * tempAmbienteScore +
        0.2 * tempSuoloScore +
        0.2 * umiditaScore;

    return Math.round(punteggioSalute * 100);
}

export function RingCard() {
    const theme = useMantineTheme();

    // Valori da passare a calcolaPunteggioSalute (esempi, li sostituirai con quelli reali dal tuo stato o API)
    const NPK = 200;  // es: Nitrogeno, Fosforo, Potassio
    const tempAmbiente = 25; // Temperatura dell'aria
    const tempSuolo = 18;  // Temperatura del suolo
    const umidita = 50;  // Umidità

    // Calcola il punteggio di salute utilizzando la funzione
    const saluteCampo = calcolaPunteggioSalute(NPK, tempAmbiente, tempSuolo, umidita);

    const stats = [
        { value: 447, label: 'Errori rilevati' },
        { value: 76, label: 'Microcontrollori Attivi' },
    ];

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
                                Misurazioni effettuate
                            </Text>
                        </div>
                        <Group mt="lg">{items}</Group>
                    </div>

                    <div className={classes.ring}>
                        <RingProgress
                            roundCaps
                            thickness={12}
                            size={150}
                            sections={[{ value: saluteCampo, color: theme.primaryColor }]}  // Utilizza il valore calcolato per il progresso
                            rootColor="red"
                            label={
                                <div>
                                    <Text ta="center" fz="lg" className={classes.label}>
                                        {saluteCampo}
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
        </div>
    );
}
