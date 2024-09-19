class Utente {
  IdUtente: number;
  NomeUtente: string;
  CognomeUtente: string;
  UsernameUtente: string;
  PasswordUtente: string;
  EmailUtente: string;
  TelefonoUtente: string;

  constructor(
    IdUtente: number,
    NomeUtente: string,
    CognomeUtente: string,
    UsernameUtente: string,
    PasswordUtente: string,
    EmailUtente: string,
    TelefonoUtente: string
  ) {
    this.IdUtente = IdUtente;
    this.NomeUtente = NomeUtente;
    this.CognomeUtente = CognomeUtente;
    this.UsernameUtente = UsernameUtente;
    this.PasswordUtente = PasswordUtente;
    this.EmailUtente = EmailUtente;
    this.TelefonoUtente = TelefonoUtente;
  }

  // Metodo per la conversione da JSON a oggetto
  static fromJson(json: any): Utente {
    return new Utente(
      json.IdUtente,
      json.NomeUtente,
      json.CognomeUtente,
      json.UsernameUtente,
      json.PasswordUtente,
      json.EmailUtente,
      json.TelefonoUtente
    );
  }

  // Metodo to string leggibile
  toString(): string {
    return (
      'Utente: ' +
      this.IdUtente +
      ' ' +
      this.NomeUtente +
      ' ' +
      this.CognomeUtente +
      ' ' +
      this.UsernameUtente +
      ' ' +
      this.PasswordUtente +
      ' ' +
      this.EmailUtente +
      ' ' +
      this.TelefonoUtente
    );
  }
}

export default Utente;
