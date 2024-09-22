import { useState } from 'react';
import { string } from 'prop-types';
import { useNavigate } from 'react-router-dom';
import {
  Anchor,
  Button,
  Center,
  Checkbox,
  Container,
  Flex,
  Group,
  Loader,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import Utente from '@/models/Utente';
import classes from './Authentication.module.css';

interface AuthenticationProps {
  onAuthenticate: () => void;
}

export function Authentication() {
  const navigate = useNavigate(); // Hook for navigation
  const [username, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignIn = () => {
    // Simulate authentication logic
    if (username != '' && password != '') {
      setLoading(true);

      const url: string =
        'https://localhost:44397/login/GetLogin?username=' + username + '&password=' + password;

      fetch(url, {
        method: 'GET',
      })
        .then((response) => {
          if (response.status === 200) {
            // Se lo status è 200 (OK)
            return response.json(); // Converti la risposta in JSON
          } else {
            throw new Error(`Errore di rete! Status code: ${response.status}`);
          }
        })
        .then((data) => {
          //Salvo utente in local storage
          localStorage.setItem('user', JSON.stringify(data));

          navigate('/dashboard'); // Naviga alla dashboard dopo il login riuscito
        })
        .catch((error) => {
          alert('Errore di autenticazione o di rete!');
          console.error('Errore:', error);
        })
        .finally(() => {
          console.log('URL: ', url); // Stampa l'URL della richiesta
          setLoading(false); // Imposta il caricamento a false alla fine
        });
    } else {
      alert('Scrivi sia username che password!'); // Show alert if credentials are invalid
    }
  };




  if (loading) {
    return (
      <div>
        {loading && (
          <Center style={{ height: '100vh' }}>
            <Loader color="blue" />
          </Center>
        )}
      </div>
    );
  }



  return (
    <Center style={{ height: '100vh' }}>
      <Container size={420} className={classes.container} my={40}>
        <Title ta="center" className={classes.title}>
          Bentornato!
        </Title>
        <Text c="dimmed" size="sm" ta="center" mt={5}>
          Non hai ancora un account?{' '}
          <Anchor size="sm" component="button">
            Crea un account
          </Anchor>
        </Text>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            label="Username"
            value={username}
            onChange={(event) => setUser(event.currentTarget.value)}
            placeholder="your@username.dev"
            required
          />
          <PasswordInput
            label="Password"
            value={password}
            onChange={(event) => setPassword(event.currentTarget.value)}
            placeholder="Password"
            required
            mt="md"
          />
          <Group justify="space-between" mt="lg">
            <Checkbox label="Salva credenziali" />
            <Anchor component="button" size="sm">
              Password dimenticata?
            </Anchor>
          </Group>
          <Button onClick={handleSignIn} fullWidth mt="xl">
            Sign in
          </Button>
        </Paper>
      </Container>
    </Center>
  );

}
