import { useState } from 'react';
import {
  IconDatabaseImport,
  IconGauge,
  IconLogout,
  IconNotes,
  IconPresentationAnalytics,
  IconSettings,
  IconSwitchHorizontal,
} from '@tabler/icons-react';
import { Link, useLocation } from 'react-router-dom';
import { Code, Group, NavLink } from '@mantine/core';
import classes from './Navbar.module.css';

const data = [
  { link: '/dashboard', label: 'Dashboard', icon: IconGauge },
  { link: '/reportPage', label: 'Report', icon: IconDatabaseImport },
  { link: '/trendPage', label: 'Trends', icon: IconPresentationAnalytics },
  { link: '/settingsPage', label: 'Altre impostazioni', icon: IconSettings },
];

export function Navbar() {
  //const [active, setActive] = useState(0);

  const location = useLocation();

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
          to="/change-account"
          label="Cambia account"
          leftSection={<IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />}
        />
        <NavLink
          component={Link}
          to="/"
          label="Logout"
          leftSection={<IconLogout className={classes.linkIcon} stroke={1.5} />}
        />

        {/* <a href="/" className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
          <span>Cambia account</span>
        </a>

        <NavLink className={classes.link} onClick={(event) => event.preventDefault()}>
          <IconLogout className={classes.linkIcon} stroke={1.5} />
          <span>Logout</span>
        </NavLink> */}
      </div>
    </nav>
  );
}
