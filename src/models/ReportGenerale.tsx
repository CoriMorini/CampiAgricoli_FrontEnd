export class NPK {
  N: number;
  P: number;
  K: number;
  dataOraCerta: string;

  constructor(N: number, P: number, K: number, dataOraCerta: string) {
    this.N = N;
    this.P = P;
    this.K = K;
    this.dataOraCerta = dataOraCerta;
  }
}

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
  npk: NPK[];
  umidita: Umidita[];
  temperaturaAmb: Temperatura[];
  temperaturaSuolo: Temperatura[];

  constructor(
    npk: NPK[],
    umidita: Umidita[],
    temperaturaAmb: Temperatura[],
    temperaturaSuolo: Temperatura[]
  ) {
    this.npk = npk;
    this.umidita = umidita;
    this.temperaturaAmb = temperaturaAmb;
    this.temperaturaSuolo = temperaturaSuolo;
  }
}
