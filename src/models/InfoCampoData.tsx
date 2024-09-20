class InfoCampoData {
    N: number;
    P: number;
    K: number;
    Umidita: number;
    TemperaturaAmb: number;
    TemperaturaSuolo: number;

    constructor(N: number, P: number, K: number, Umidita: number, TemperaturaAmb: number, TemperaturaSuolo: number) {
        this.N = N;
        this.P = P;
        this.K = K;
        this.Umidita = Umidita;
        this.TemperaturaAmb = TemperaturaAmb;
        this.TemperaturaSuolo = TemperaturaSuolo;
    }
}

export default InfoCampoData;