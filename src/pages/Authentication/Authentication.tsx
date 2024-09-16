import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Anchor,
  Button,
  Center,
  Checkbox,
  Container,
  Group,
  Paper,
  PasswordInput,
  Text,
  TextInput,
  Title,
} from '@mantine/core';
import classes from './Authentication.module.css';

interface AuthenticationProps {
  onAuthenticate: () => void;
}

export function Authentication({ onAuthenticate }: AuthenticationProps) {
  const navigate = useNavigate(); // Hook for navigation
  const [username, setUser] = useState('');
  const [password, setPassword] = useState('');

  const handleSignIn = () => {
    // Simulate authentication logic
    if (username === '' && password === '') {
      onAuthenticate();
      navigate('/dashboard'); // Navigate to home page after successful login
    } else {
      alert('Credenziali non valide!'); // Show alert if credentials are invalid
    }
  };

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
