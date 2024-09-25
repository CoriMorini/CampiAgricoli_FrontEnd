class VistaMicrocontrolloriUtente {
    IdUtente: number;
    IdCampo: number;
    IdMicrocontrollore: number;
    Latitudine: number | null;
    Longitudine: number | null;
    NomeMicrocontrollore: string | null;
    NomeCampo: string;

    constructor(IdUtente: number, IdCampo: number, IdMicrocontrollore: number, Latitudine: number | null, Longitudine: number | null, NomeMicrocontrollore: string | null, NomeCampo: string) {
        this.IdUtente = IdUtente;
        this.IdCampo = IdCampo;
        this.IdMicrocontrollore = IdMicrocontrollore;
        this.Latitudine = Latitudine;
        this.Longitudine = Longitudine;
        this.NomeMicrocontrollore = NomeMicrocontrollore;
        this.NomeCampo = NomeCampo;
    }
}

export default VistaMicrocontrolloriUtente;