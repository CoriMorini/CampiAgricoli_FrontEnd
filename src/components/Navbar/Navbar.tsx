import { useState } from 'react';
import { Group, Code } from '@mantine/core';
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
    { link: '', label: 'Dashboard', icon: IconGauge },
    { link: '', label: 'Report', icon: IconDatabaseImport },
    { link: '', label: 'Trends', icon: IconPresentationAnalytics },
    { link: '', label: 'Log', icon: IconNotes },
    { link: '', label: 'Altre impostazioni', icon: IconSettings },
];

export function Navbar() {
    const [active, setActive] = useState('Billing');

    const links = data.map((item) => (
        <a
            className={classes.link}
            data-active={item.label === active || undefined}
            href={item.link}
            key={item.label}
            onClick={(event) => {
                event.preventDefault();
                setActive(item.label);
            }}
        >
            <item.icon className={classes.linkIcon} stroke={1.5} />
            <span>{item.label}</span>
        </a>
    ));

    return (
        <nav className={classes.navbar}>
            <div className={classes.navbarMain}>
                <Group className={classes.header} justify="space-between">
                </Group>
                {links}
            </div>

            <div className={classes.footer}>
                <a href="#" className={classes.link} onClick={(event) => event.preventDefault()}>
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