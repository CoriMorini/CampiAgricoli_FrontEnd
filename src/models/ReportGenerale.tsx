export class Umidita {
  Umidita: number;
  dataOraCerta: string;

  constructor(Umidita: number, dataOraCerta: string) {
    this.Umidita = Umidita;
    this.dataOraCerta = dataOraCerta;
  }
}

export class Temperatura {
  Temperatura: number;
  dataOraCerta: string;

  constructor(Temperatura: number, dataOraCerta: string) {
    this.Temperatura = Temperatura;
    this.dataOraCerta = dataOraCerta;
  }
}

export class ReportGenerale {
  umiditaAmb: Umidita[];
  umiditaTer: Umidita[];
  temperaturaAmb: Temperatura[];
  temperaturaTer: Temperatura[];

  constructor(
    umiditaAmb: Umidita[],
    umiditaTer: Umidita[],
    temperaturaAmb: Temperatura[],
    temperaturaTer: Temperatura[]
  ) {
    this.umiditaAmb = umiditaAmb;
    this.umiditaTer = umiditaTer;
    this.temperaturaAmb = temperaturaAmb;
    this.temperaturaTer = temperaturaTer;
  }
}