import '@mantine/core/styles.css';
import '@mantine/charts/styles.css';
import '@mantine/carousel/styles.css';

import { MantineProvider } from '@mantine/core';
import { Router } from './Router';
import { theme } from './theme';

export default function App() {
  return (
    <MantineProvider defaultColorScheme= "dark" theme={theme}>
      <Router />
    </MantineProvider>
  );
}
