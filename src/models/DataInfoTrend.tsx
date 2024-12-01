interface MisurazioneAnnuale {
    mese: string;
    valore: number;
}

interface DataInfoTrend {
    PunteggioSalute: number;
    misurazioniAnnuali: MisurazioneAnnuale[];
}

export default DataInfoTrend;