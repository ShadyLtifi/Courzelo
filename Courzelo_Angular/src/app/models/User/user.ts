export class User {
    iduser?: string;
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