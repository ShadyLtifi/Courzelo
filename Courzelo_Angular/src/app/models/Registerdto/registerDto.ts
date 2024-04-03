export class RegisterDto {
    constructor(
      public nom: string,
      public prenom: string,
      public CIN: string,
      public DateN: string,
      public username: string,
      public email: string,
      public Role: string,
      public password: string
  
    ) {}
  }