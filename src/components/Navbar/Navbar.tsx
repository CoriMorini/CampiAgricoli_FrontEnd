import { useState } from 'react';
import { Group, Code } from '@mantine/core';
import { NavLink } from '@mantine/core';
import {
    IconGauge,
    IconPresentationAnalytics,
    IconNotes,
    IconSettings,
    IconDatabaseImport,
    IconSwitchHorizontal,
    IconLogout,
} from '@tabler/icons-react';
import classes from './Navbar.module.css';

const data = [
    { link: '/home', label: 'Dashboard', icon: IconGauge },
    { link: '/report', label: 'Report', icon: IconDatabaseImport },
    { link: '', label: 'Trends', icon: IconPresentationAnalytics },
    { link: '', label: 'Log', icon: IconNotes },
    { link: '', label: 'Altre impostazioni', icon: IconSettings },
];

export function Navbar() {
    const [active, setActive] = useState(0);

    const items = data.map((item, index) => (
        <NavLink
            href={item.link}
            key={item.label}
            active={index === active}
            label={item.label}
            leftSection={<item.icon size="2rem" stroke={1.5} />}
            onClick={() => setActive(index)}
        />

    ));

    return (
        <nav className={classes.navbar}>
            <div className={classes.navbarMain}>
                <Group className={classes.header} justify="space-between">
                </Group>
                {items}
            </div>

            <div className={classes.footer}>
                <a href="/" className={classes.link} onClick={(event) => event.preventDefault()}>
                    <IconSwitchHorizontal className={classes.linkIcon} stroke={1.5} />
                    <span>Cambia account</span>
                </a>

                <a href="/" className={classes.link} onClick={(event) => event.preventDefault()}>
                    <IconLogout className={classes.linkIcon} stroke={1.5} />
                    <span>Logout</span>
                </a>
            </div>
        </nav>
    );
}