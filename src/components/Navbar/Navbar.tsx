import {
  IconDatabaseImport,
  IconGauge,
  IconLogout,
  IconPresentationAnalytics,
  IconSettings,
} from '@tabler/icons-react';
import { Link, useLocation } from 'react-router-dom';
import { Group, NavLink } from '@mantine/core';
import classes from './Navbar.module.css';

const data = [
  { link: '/dashboard', label: 'Dashboard', icon: IconGauge },
  { link: '/reportPage', label: 'Report', icon: IconDatabaseImport },
  { link: '/trendPage', label: 'Trends', icon: IconPresentationAnalytics },
  { link: '/microcontrolloriPage', label: 'Microcontrollori', icon: IconSettings },
];

export function Navbar() {

  const location = useLocation();


  // Creazione di una lista di elementi di navigazione 'items'.
  //
  const items = data.map((item) => (
    <NavLink
      key={item.label}
      component={Link}
      to={item.link}
      active={location.pathname === item.link}
      label={item.label}
      leftSection={<item.icon size="2rem" stroke={1.5} />}
    />
  ));

  return (
    <nav className={classes.navbar}>
      <div className={classes.navbarMain}>
        <Group className={classes.header} justify="space-between"></Group>
        {items}
      </div>

      <div className={classes.footer}>
        <NavLink
          component={Link}
          to="/"
          label="Logout"
          leftSection={<IconLogout className={classes.linkIcon} stroke={1.5} />}
        />
      </div>
    </nav>
  );
}
