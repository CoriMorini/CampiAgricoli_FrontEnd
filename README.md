# CampiAgricoli Frontend

**CampiAgricoli Frontend** è un'applicazione web sviluppata in TypeScript utilizzando React. Questa dashboard consente di monitorare in tempo reale i dati raccolti dai sensori agricoli, presentandoli tramite grafici interattivi e tabelle filtrabili. Il progetto è progettato per supportare la gestione e l'ottimizzazione delle condizioni dei campi agricoli.

## Caratteristiche principali

- **Visualizzazione dati in tempo reale**: I dati raccolti dai sensori sono rappresentati tramite grafici interattivi e tabelle filtrabili per tipo di parametro e intervallo di tempo.
- **Interfaccia utente moderna**: Un design elegante e funzionale realizzato con la libreria Mantine.
- **Modularità**: L'architettura del progetto è organizzata in componenti riutilizzabili e pagine dedicate per semplificare la manutenzione e l'espansione.

## Tecnologie utilizzate

- **React**: Libreria JavaScript per la creazione di interfacce utente reattive.
- **Vite**: Build tool scelto per tempi di compilazione rapidi e un'esperienza di sviluppo fluida.
- **TypeScript**: Per un codice più robusto e tipizzato.
- **Mantine**: Libreria UI per creare componenti personalizzati e funzionali.

## Struttura del progetto

Il progetto è organizzato in tre sezioni principali per favorire lo sviluppo modulare:

### 1. `components`
Contiene i componenti riutilizzabili dell'interfaccia, come:
- **Navbar**: Barra di navigazione principale.
- **CardCampiDashboard**: Schede informative sui campi agricoli.
- **ModalModifyArduino**: Finestre di modifica per i microcontrollori.

### 2. `models`
Gestisce la logica dei dati con modelli rappresentativi, come:
- **Campo**: Informazioni sui campi agricoli.
- **SaluteCampo**: Stato di salute dei campi.
- **ReportGenerale**: Report riepilogativi provenienti dal backend.

### 3. `pages`
Include le pagine principali dell'applicazione:
- **DashBoard**: Visualizzazione e monitoraggio dati sensori.
- **MicrocontrolloriPage**: Gestione dei dispositivi hardware.
- **TrendPage**: Analisi delle tendenze e storico dei dati raccolti.

## Setup e avvio

### Requisiti
- Node.js (versione consigliata: 18.x o superiore)
- npm o yarn

### Installazione
1. Clona il repository:
   ```bash
   git clone https://github.com/tuo-utente/CampiAgricoli_FrontEnd.git
