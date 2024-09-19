class Campo {
  IdCampo: number;
  IdUtente: number;
  NomeCampo: string;

  constructor(IdCampo: number, IdUtente: number, NomeCampo: string) {
    this.IdCampo = IdCampo;
    this.IdUtente = IdUtente;
    this.NomeCampo = NomeCampo;
  }
}

export default Campo;
