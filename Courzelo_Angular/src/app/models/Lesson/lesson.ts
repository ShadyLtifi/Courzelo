export class Lesson {
    idLesson?: String;
    title?: string;
    content?: any;

    speciality?: Speciality;
}
export enum Speciality{
    Informatique='Informatique'
    ,ElectroMecanique='ElectroMecanique'
    ,GenieCivil='GenieCivil'
  

}