class NPKCampoMediaMeseCorrente {
  ValoreMedioN: number;
  ValoreMedioP: number;
  ValoreMedioK: number;
  deltaN: number;
  deltaP: number;
  deltaK: number;

  constructor(
    ValoreMedioN: number,
    ValoreMedioP: number,
    ValoreMedioK: number,
    deltaN: number,
    deltaP: number,
    deltaK: number
  ) {
    this.ValoreMedioN = ValoreMedioN;
    this.ValoreMedioP = ValoreMedioP;
    this.ValoreMedioK = ValoreMedioK;
    this.deltaN = deltaN;
    this.deltaP = deltaP;
    this.deltaK = deltaK;
  }
}

export default NPKCampoMediaMeseCorrente;
