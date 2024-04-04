export class RegisterDto {
    constructor(
      public nom: string,
      public prenom: string,
      public cin: string,
      public DateN: string,
      public username: string,
      public email: string,
      public Role: string,
      public password: string
  
    ) {}
  }