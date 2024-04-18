export class User {
    id?: string;
    nom?: string;
    prenom?: string;
    cin?: number;
    dateN?: Date;
    email?: string;
    password?: string;
    username?: string;
    role?: Roles;
    enabled?: boolean;


}


export enum Roles{

    ADMIN,
    TEACHER,
    STUDENT,
    PARTNER

}