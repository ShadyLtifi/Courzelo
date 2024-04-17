export class RegisterDto {
    constructor(
      public nom: string,
      public prenom: string,
      public cin: string,
      public dateN: string,
      public username: string,
      public email: string,
      public role: string,
      public password: string
  
    ) {}
  }