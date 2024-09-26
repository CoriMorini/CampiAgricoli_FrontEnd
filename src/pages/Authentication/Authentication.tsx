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

// URL dell'API prelevato dalle variabili d'ambiente
const apiUrl = import.meta.env.VITE_API_URL;

export function Authentication() {
  const navigate = useNavigate();
  const [username, setUser] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  // Funzione per gestire il processo di login
  //
  const handleSignIn = () => {
    
    if (username !== '' && password !== '') {
      setLoading(true); 

      // URL della richiesta di login
      const url: string =
        apiUrl + 'login/GetLogin?username=' + username + '&password=' + password;

      // Richiesta per autenticare l'utente
      fetch(url, {
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

          // Salva i dati dell'utente nel local storage
          localStorage.setItem('user', JSON.stringify(data));

          // Naviga alla dashboard
          navigate('/dashboard');
        })
        .catch((error) => {

          if(error.message.includes('401') ) {
            alert('Username o password non corretti!');
          }else{
            alert('Errore di rete!');
          }
          
          console.error('Errore:', error);

        })
        .finally(() => {
          setLoading(false); 
        });
    } else {
      alert('Scrivi sia username che password!');
    }
  };

  // Render Caricamento
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

  // Render Form di Login
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
            onChange={(event) => setPassword(event.currentTarget.value)} // Aggiorno lo stato della password
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
