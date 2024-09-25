import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  Center,
  Container,
  Loader,
  Paper,
  PasswordInput,
  TextInput,
  Title,
} from '@mantine/core';
import classes from './Authentication.module.css';

const apiUrl = import.meta.env.VITE_API_URL; // URL dell'API prelevato dalle variabili d'ambiente

export function Authentication() {
  const navigate = useNavigate(); // Hook per navigare tra le pagine
  const [username, setUser] = useState(''); // Stato per il nome utente
  const [password, setPassword] = useState(''); // Stato per la password
  const [loading, setLoading] = useState(false); // Stato per il caricamento

  // Funzione per gestire il processo di login
  const handleSignIn = () => {
    // Controlla che username e password non siano vuoti
    if (username !== '' && password !== '') {
      setLoading(true); // Attiva lo stato di caricamento

      // Costruisce l'URL della richiesta di login
      const url: string =
        apiUrl + 'login/GetLogin?username=' + username + '&password=' + password;

      // Effettua la richiesta per autenticare l'utente
      fetch(url, {
        method: 'GET',
      })
        .then((response) => {
          if (response.status === 200) {
            return response.json(); // Converte la risposta in JSON
          } else {
            throw new Error(`Errore di rete! Status code: ${response.status}`); // Gestisce gli errori di rete
          }
        })
        .then((data) => {
          // Salva i dati dell'utente nel local storage
          localStorage.setItem('user', JSON.stringify(data));

          // Naviga alla dashboard dopo un login riuscito
          navigate('/dashboard');
        })
        .catch((error) => {
          // Mostra un messaggio di errore in caso di problemi di autenticazione
          alert('Errore di autenticazione o di rete!');
          console.error('Errore:', error);
        })
        .finally(() => {
          setLoading(false); // Disattiva lo stato di caricamento al termine del processo
        });
    } else {
      alert('Scrivi sia username che password!');
    }
  };

  // Mostra un loader durante il caricamento
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

  // Ritorna il layout della pagina di autenticazione
  return (
    <Center style={{ height: '100vh' }}>
      <Container size={420} className={classes.container} my={40}>
        <Title ta="center" className={classes.title}>
          Bentornato!
        </Title>

        <Paper withBorder shadow="md" p={30} mt={30} radius="md">
          <TextInput
            label="Username"
            value={username}
            onChange={(event) => setUser(event.currentTarget.value)} // Aggiorna lo stato dell'username
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleSignIn();
              }
            }}
            placeholder="u#"
            required
          />

          <PasswordInput
            label="Password"
            value={password}
            onChange={(event) => setPassword(event.currentTarget.value)} // Aggiorna lo stato della password
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                handleSignIn();
              }
            }}
            placeholder="Password"
            required
            mt="md"
          />

          <Button onClick={handleSignIn} fullWidth mt="xl">
            Sign in
          </Button>
        </Paper>
      </Container>
    </Center>
  );

}
