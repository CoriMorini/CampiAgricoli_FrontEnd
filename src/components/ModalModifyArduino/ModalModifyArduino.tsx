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

  // Gestione degli stati nella form:
  // - 'opened': determina se il modal è aperto o chiuso.
  // - 'microcontrollore': contiene i dati del microcontrollore selezionato, aggiornati tramite API.
  // - 'bottoneSalvaDisabilitato': abilita/disabilita il bottone di salvataggio in base ai campi obbligatori.

  // Logiche:
  // - Se il modal viene aperto ('opened' == true), viene effettuata una chiamata API per recuperare i dettagli del microcontrollore selezionato.
  // - Viene verificato se i campi obbligatori del microcontrollore sono compilati per abilitare il pulsante di salvataggio.
  // - Alla chiusura del modal, i campi del microcontrollore vengono resettati.
  // - La funzione 'saveMicrocontrollore' invia i dati aggiornati tramite POST, chiude il modal e aggiorna la tabella principale.

  useEffect(() => {

    //Se sto chiudendo il modal non faccio niente
    //
    if (!opened) {
      return;
    }

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
      })
      .catch((error) => {
        alert('Errore:' + error);
      });

  }, [opened]);


  useEffect(() => {

    if (microcontrollore) {
      //Controllo se i campi sono stati riempiti
      //
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
            setOpened(false);
            // Reset dei campi di input quando si chiude il modal
            //
            setMicrocontrollore(null);
            // Aggiorno la tabella padre
            //
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
    //
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

                    // Verifico se l'input contiene solo valori numerici, punti decimali o segno negativo
                    //
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

                    // Verifico se l'input contiene solo valori numerici, punti decimali o segno negativo
                    //
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
