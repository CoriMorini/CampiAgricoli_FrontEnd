interface MisurazioneAnnuale {
    mese: string;
    valore: number;
}

interface DataInfoTrend {
    PunteggioSalute: number;
    MisurazioniAnnuali: MisurazioneAnnuale[];
}

export default DataInfoTrend;