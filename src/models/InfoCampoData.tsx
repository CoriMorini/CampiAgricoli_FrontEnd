class InfoCampoData {
    UmiditaAmb: number;
    UmiditaTer: number;
    TemperaturaAmb: number;
    TemperaturaSuolo: number;

    constructor(UmiditaAmb:number, UmiditaTer: number, TemperaturaAmb: number, TemperaturaSuolo: number) {
        this.UmiditaAmb = UmiditaAmb;
        this.UmiditaTer = UmiditaTer;
        this.TemperaturaAmb = TemperaturaAmb;
        this.TemperaturaSuolo = TemperaturaSuolo;
    }
}

export default InfoCampoData;