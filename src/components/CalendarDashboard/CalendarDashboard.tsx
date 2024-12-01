import { useEffect, useState } from 'react';
import dayjs from 'dayjs';
import { UnstyledButton, Text, Paper, Group, rem } from '@mantine/core';
import {
  IconChevronDown,
  IconChevronUp,
  IconSquareLetterN,
  IconSquareLetterK,
  IconSquareLetterP,
  IconPercentage,
  IconTemperature,
} from '@tabler/icons-react';
import classes from './CalendarDashboard.module.css';
import InfoCampoData from '@/models/InfoCampoData';
import { c } from 'vite/dist/node/types.d-aGj9QkWt';

// URL dell'API prelevato dalle variabili d'ambiente
const apiUrl = import.meta.env.VITE_API_URL;

const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // I mesi in JavaScript vanno da 0 a 11, quindi aggiungi 1
  const year = date.getFullYear();

  return `${month}-${day}-${year}`;
};

// Definisco l'interfaccia per le props del componente
//
interface StatsControlsProps {
  idCampo: number;
}

export function CalendarDashboard({ idCampo }: StatsControlsProps) {
  const [date, setDate] = useState<Date>(new Date(Date.now()));
  const [idCampoSelezionato, setIdCampoSelezionato] = useState<number | null>(idCampo);
  const [infoCampoData, setInfoCampoData] = useState<InfoCampoData | null>(null);

  console.log('idCampo passato a StatsControls:', idCampo);
  console.log('idCampoSelezionato:', idCampoSelezionato);

  // Gestione degli stati nella form:
  // - 'idCampoSelezionato': aggiornato ogni volta che cambia 'idCampo'.
  // - 'infoCampoData': aggiornato con i dati specifici del campo in base alla data selezionata.

  // Logiche:
  // - Al cambio di 'idCampo' o 'date', viene eseguita una chiamata API per ottenere le informazioni dettagliate del campo (K, N, P, umidità, temperature).
  // - I dati ricevuti vengono arrotondati e salvati nello stato.
  // - Gestione degli errori.

  useEffect(() => {
    setIdCampoSelezionato(idCampo);
  }, [idCampo]);

  useEffect(() => {

    console.log('url:', apiUrl + 'Dashboard/GetInfoCampoData?idCampo=' + idCampoSelezionato + '&data=' + formatDate(date));

    if (idCampo) {
      fetch(apiUrl + 'Dashboard/GetInfoCampoData?idCampo=' + idCampoSelezionato + '&data=' + formatDate(date), {
        method: 'GET',
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          } else {
            throw new Error(`Errore di rete! Status code: ${response.status}`);
          }
        })
        .then((data: InfoCampoData) => {


          data.UmiditaAmb = parseFloat(data.UmiditaAmb.toFixed(2));
          data.UmiditaTer = parseFloat(data.UmiditaTer.toFixed(2));
          data.TemperaturaAmb = parseFloat(data.TemperaturaAmb.toFixed(2));
          data.TemperaturaSuolo = parseFloat(data.TemperaturaSuolo.toFixed(2));


          setInfoCampoData(data);
          console.log('InfoCampoData:', data);
        })
        .catch((error) => {
          alert('Errore:' + error);
        });
    }

  }, [date, idCampoSelezionato]);

  const data = [
    { icon: IconPercentage, label: 'Umidità amb. (%)', value: infoCampoData?.UmiditaAmb },
    { icon: IconPercentage, label: 'Umidità suolo (%)', value: infoCampoData?.UmiditaTer },
    { icon: IconTemperature, label: 'Temp. amb. (°C)', value: infoCampoData?.TemperaturaAmb },
    { icon: IconTemperature, label: 'Temp. suolo (°C)', value: infoCampoData?.TemperaturaAmb },
  ];

  const stats = data.map((stat) => (
    <Paper className={classes.stat} radius="md" shadow="md" p="xs" key={stat.label}>
      <stat.icon
        style={{ width: rem(40), height: rem(40) }}
        className={classes.icon}
        stroke={1.5}
      />
      <div>
        <Text className={classes.label}>{stat.label}</Text>
        <Text fz="xs" className={classes.count}>
          <span className={classes.value}>{stat.value}</span>
        </Text>
      </div>
    </Paper>
  ));

  // Render del componente
  return (
    <div className={classes.root}>
      <div className={classes.controls}>
        <UnstyledButton
          className={classes.control}
          onClick={() => setDate((current) => dayjs(current).add(1, 'day').toDate())}
        >
          <IconChevronUp
            style={{ width: rem(16), height: rem(16) }}
            className={classes.controlIcon}
            stroke={1.5}
          />
        </UnstyledButton>

        <div className={classes.date}>
          <Text className={classes.day}>{dayjs(date).format('DD')}</Text>
          <Text className={classes.month}>{dayjs(date).format('MMMM')}</Text>
          <Text className={classes.month}>{dayjs(date).format('YYYY')}</Text>
        </div>

        <UnstyledButton
          className={classes.control}
          onClick={() => setDate((current) => dayjs(current).subtract(1, 'day').toDate())}
        >
          <IconChevronDown
            style={{ width: rem(16), height: rem(16) }}
            className={classes.controlIcon}
            stroke={1.5}
          />
        </UnstyledButton>
      </div>
      <Group style={{ flex: 1 }}>{stats}</Group>
    </div>
  );
}