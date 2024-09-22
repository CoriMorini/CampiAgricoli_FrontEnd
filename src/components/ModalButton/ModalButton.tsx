import { useState } from 'react';
import { Modal, Button, Input, Container, Grid, Flex, Space } from '@mantine/core';

interface ModalButtonProps {
  arduinoNumber: number;
}

export function ModalButton({ arduinoNumber }: ModalButtonProps) {
  const [opened, setOpened] = useState(false);
  const [nomeArduino, setNomeArduino] = useState('');
  const [nomeMicrocontrollore, setNomeMicrocontrollore] = useState('');
  const [latitudine, setLatitudine] = useState('');
  const [longitudine, setLongitudine] = useState('');

  // Abilita il pulsante se almeno un campo è stato compilato
  const isAnyFieldFilled = nomeArduino || nomeMicrocontrollore || latitudine || longitudine;

  const openModal = () => setOpened(true);

  const closeModal = () => {
    setOpened(false);
    // Reset dei campi di input quando si chiude il modal
    setNomeArduino('');
    setNomeMicrocontrollore('');
    setLatitudine('');
    setLongitudine('');
  };

  return (
    <>
      <Modal
        opened={opened}
        onClose={closeModal}
        title={`Dati Arduino #${arduinoNumber}`}
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
                  value={nomeArduino}
                  onChange={(event) => setNomeArduino(event.currentTarget.value)}
                />
              </Input.Wrapper>
            </Grid.Col>
            <Grid.Col span={6}>
              <Input.Wrapper
                label="Nome Microcontrollore"
                withAsterisk
                description=""
                size="md"
              >
                <Input
                  placeholder="Inserisci un nome"
                  value={nomeMicrocontrollore}
                  onChange={(event) => setNomeMicrocontrollore(event.currentTarget.value)}
                />
              </Input.Wrapper>
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
                  value={latitudine}
                  onChange={(event) => setLatitudine(event.currentTarget.value)}
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
                  value={longitudine}
                  onChange={(event) => setLongitudine(event.currentTarget.value)}
                />
              </Input.Wrapper>
            </Grid.Col>
          </Grid>
          <Space h="xl" />
          <Flex justify="end">
            <Button onClick={closeModal} variant="filled" disabled={!isAnyFieldFilled}>
              Salva
            </Button>
          </Flex>
        </Container>
      </Modal>

      <Button onClick={openModal}>Modifica</Button>
    </>
  );
}
