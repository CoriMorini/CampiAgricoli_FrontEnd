class SaluteCampo {
    nomeCampo: string;
    saluteCampo: number;
    numeroMisurazioni: number;
    numeroErrori: number;
    numeroMicrocontrolloriAttivi: number;

    constructor(nomeCampo: string, saluteCampo: number, numeroMisurazioni: number, numeroErrori: number, numeroMicrocontrolloriAttivi: number) {
        this.nomeCampo = nomeCampo;
        this.saluteCampo = saluteCampo;
        this.numeroMisurazioni = numeroMisurazioni;
        this.numeroErrori = numeroErrori;
        this.numeroMicrocontrolloriAttivi = numeroMicrocontrolloriAttivi;
    }
}

export default SaluteCampo;