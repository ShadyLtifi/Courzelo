export class User {
    iduser?: string;
    nom?: string;
    prenom?: string;
    cin?: number;
    dateN?: Date;
    email?: string;
    password?: string;
    username?: string;
    role?: Roles;


}


export enum Roles{

    ADMIN,
    TEACHER,
    STUDENT,
    PARTNER

}