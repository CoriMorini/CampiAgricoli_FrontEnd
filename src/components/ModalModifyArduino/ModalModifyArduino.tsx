import { useEffect, useState } from 'react';
import { Modal, Button, Input, Container, Grid, Flex, Space } from '@mantine/core';
import Microcontrollore from '@/models/Microcontrollore';
import { IconEdit } from '@tabler/icons-react';
import { ActionIcon } from '@mantine/core';

const apiUrl = import.meta.env.VITE_API_URL;

interface ModalButtonProps {
  idMicrocontrollore: number;
  refreshTabellaPadre: () => void;
}

export function ModalModifyArduino({ idMicrocontrollore, refreshTabellaPadre }: ModalButtonProps) {
  const [opened, setOpened] = useState(false);
  const [bottoneSalvaDisabilitato, setBottoneSalvaDisabilitato] = useState(true);
  const [microcontrollore, setMicrocontrollore] = useState<Microcontrollore | null>(null);

  useEffect(() => {

    //Se sto chiudendo il modal non faccio niente
    if (!opened) {
      return;
    }

    //Chiamo get Microcontrollore
    fetch(apiUrl + 'Microcontrollori/GetMicrocontrollore?idMicrocontrollore=' + idMicrocontrollore, {
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
        setMicrocontrollore(data);
        //setMicrocontrollerCaricato(true);
      })
      .catch((error) => {
        alert('Errore:' + error);
      });

  }, [opened]);


  useEffect(() => {

    if (microcontrollore) {
      //Controllo se i campi sono stati riempiti
      if (microcontrollore.NomeMicrocontrollore && microcontrollore.Latitudine !== null && microcontrollore.Latitudine !== undefined && microcontrollore.Longitudine !== null && microcontrollore.Longitudine !== undefined) {
        setBottoneSalvaDisabilitato(false);
      } else {
        setBottoneSalvaDisabilitato(true);
      }
    } else {
      setBottoneSalvaDisabilitato(true);
    }

  }, [microcontrollore]);

  const saveMicrocontrollore = () => {

    if (microcontrollore) {
      fetch(apiUrl + 'Microcontrollori/UpdateMicrocontrollore', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(microcontrollore),
      })
        .then((response) => {
          if (response.status === 200) {
            //alert('Arduino modificato con successo!');
            setOpened(false);
            // Reset dei campi di input quando si chiude il modal
            setMicrocontrollore(null);
            // Aggiorno la tabella padre
            refreshTabellaPadre();
          } else {
            throw new Error(`Errore di rete! Status code: ${response.status}`);
          }
        })
        .catch((error) => {
          alert('Errore:' + error);
        });
    }

  }

  const openModal = () => setOpened(true);

  const closeModal = () => {
    setOpened(false);
    // Reset dei campi di input quando si chiude il modal
    setMicrocontrollore(null);
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={closeModal}
        title={`Dati Arduino #${idMicrocontrollore}`}
        centered
        size="auto"
      >
        <Container size="xl">
          <Grid gutter="xl">
            <Grid.Col span={6}>
              <Input.Wrapper
                label="Nome Arduino (?)"
                withAsterisk
                description=""
                size="md"
              >
                <Input
                  placeholder="Inserisci un nome"
                  value={microcontrollore?.NomeMicrocontrollore ?? ''}
                  onChange={(event) => {
                    const inputValue = event.currentTarget.value;

                    if (inputValue.length <= 50) {

                      setMicrocontrollore({
                        ...(microcontrollore as Microcontrollore),
                        NomeMicrocontrollore: inputValue,
                      });
                    }
                  }}
                />
              </Input.Wrapper>
            </Grid.Col>
            <Grid.Col span={6}>

            </Grid.Col>
            <Grid.Col span={6}>
              <Input.Wrapper
                label="Latitudine"
                withAsterisk
                description=""
                size="md"
              >
                <Input
                  placeholder="Esempio: 15°24'15''N"
                  value={microcontrollore?.Latitudine ?? ''}
                  onChange={(event) => {

                    const inputValue = event.currentTarget.value;

                    // Regular expression to check if the input contains only numeric values, decimal points, or negative sign
                    const isValidNumber = /^-?\d*\.?\d*$/.test(inputValue);

                    if (isValidNumber) {
                      const parsedValue = parseFloat(inputValue);
                      setMicrocontrollore({
                        ...(microcontrollore as Microcontrollore),
                        Latitudine: isNaN(parsedValue) ? 0 : parsedValue,
                      });
                    }
                  }}
                />
              </Input.Wrapper>
            </Grid.Col>
            <Grid.Col span={6}>
              <Input.Wrapper
                label="Longitudine"
                withAsterisk
                description=""
                size="md"
              >
                <Input
                  placeholder="Esempio: 15°24'15''N"
                  value={microcontrollore?.Longitudine ?? ''}
                  onChange={(event) => {

                    const inputValue = event.currentTarget.value;

                    // Regular expression to check if the input contains only numeric values, decimal points, or negative sign
                    const isValidNumber = /^-?\d*\.?\d*$/.test(inputValue);

                    if (isValidNumber) {
                      const parsedValue = parseFloat(inputValue);
                      setMicrocontrollore({
                        ...(microcontrollore as Microcontrollore),
                        Longitudine: isNaN(parsedValue) ? 0 : parsedValue,
                      });
                    }
                  }}
                />
              </Input.Wrapper>
            </Grid.Col>
          </Grid>
          <Space h="xl" />
          <Flex justify="end">
            <Button onClick={saveMicrocontrollore} variant="filled" disabled={bottoneSalvaDisabilitato}>
              Salva
            </Button>
          </Flex>
        </Container>
      </Modal>

      <Flex justify="center">
        <ActionIcon onClick={openModal} variant="filled" size="md" aria-label="Settings">
          <IconEdit style={{ width: '70%', height: '70%' }} stroke={1.5} />
        </ActionIcon>
      </Flex>
    </>
  );
}
