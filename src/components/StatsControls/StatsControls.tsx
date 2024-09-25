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
import classes from './StatsControls.module.css';
import InfoCampoData from '@/models/InfoCampoData';


const apiUrl = import.meta.env.VITE_API_URL;


const formatDate = (date: Date): string => {
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // I mesi in JavaScript vanno da 0 a 11, quindi aggiungi 1
  const year = date.getFullYear();

  return `${month}-${day}-${year}`;
};

// Definisci l'interfaccia per le props del componente
interface StatsControlsProps {
  idCampo: number;
}

export function StatsControls({ idCampo }: StatsControlsProps) {
  const [date, setDate] = useState(new Date(2024, 8, 21));
  const [idCampoSelezionato, setIdCampoSelezionato] = useState<number | null>(idCampo);
  const [infoCampoData, setInfoCampoData] = useState<InfoCampoData | null>(null);

  // Aggiungi un log per vedere il valore di idCampo che arriva come prop
  console.log('idCampo passato a StatsControls:', idCampo);
  console.log('idCampoSelezionato:', idCampoSelezionato);

  useEffect(() => {
    setIdCampoSelezionato(idCampo);
  }, [idCampo]);

  //CHIAMATA API SU MOUNT DEL COMPONENTE
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

          
          data.K = parseFloat(data.K.toFixed(2));
          data.N = parseFloat(data.N.toFixed(2));
          data.P = parseFloat(data.P.toFixed(2));
          data.Umidita = parseFloat(data.Umidita.toFixed(2));
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
    { icon: IconSquareLetterN, label: 'Azoto', value: infoCampoData?.N },
    { icon: IconSquareLetterP, label: 'Fosforo', value: infoCampoData?.P },
    { icon: IconSquareLetterK, label: 'Potassio', value: infoCampoData?.K },
    { icon: IconPercentage, label: 'Umidità (%)', value: infoCampoData?.Umidita },
    { icon: IconTemperature, label: 'Temp. (°C)', value: infoCampoData?.TemperaturaAmb },
  ];


  const stats = data.map((stat) => (
    <Paper className={classes.stat} radius="md" shadow="md" p="xs" key={stat.label}>
      <stat.icon
        style={{ width: rem(32), height: rem(32) }}
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