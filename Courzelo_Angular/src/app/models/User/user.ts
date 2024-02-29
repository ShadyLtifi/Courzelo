export class User {
    iduser?: number;
    nom?: string;
    prenom?: string;
    CIN?: number;
    DateN?: Date;
    email?: string;
    password?: string;
    username?: string;
    Role?: TypeRole;


}


export enum TypeRole{

    ADMIN,
    TEACHER,
    STUDENT,
    PARTNER

}