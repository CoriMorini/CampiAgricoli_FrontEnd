import { useDisclosure } from '@mantine/hooks';
import { Modal, Button } from '@mantine/core';

export function ModalButton() {
  const [opened, { open, close }] = useDisclosure(false);

  return (
    <>
      <Modal opened={opened} onClose={close} title="Dati Arduino" centered>
        {/* Modal content */}
      </Modal>

      <Button onClick={open}>Modifica</Button>
    </>
  );
}