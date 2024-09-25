class Microcontrollore {
    IdMicrocontrollore: number;
    IdCampo?: number;
    Latitudine?: number;
    Longitudine?: number;
    NomeMicrocontrollore?: string;

    constructor(IdMicrocontrollore: number, IdCampo: number, Latitudine: number, Longitudine: number, NomeMicrocontrollore: string) {
        this.IdMicrocontrollore = IdMicrocontrollore;
        this.IdCampo = IdCampo;
        this.Latitudine = Latitudine;
        this.Longitudine = Longitudine;
        this.NomeMicrocontrollore = NomeMicrocontrollore;
    }
}

export default Microcontrollore;