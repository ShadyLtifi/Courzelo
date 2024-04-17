// user.ts
export interface User {
    id: string;
    name: string;
    email: string;
    password?: string; // Le mot de passe est optionnel car il n'est pas nécessaire de le stocker ou de l'envoyer après la connexion
  }
  