import { Lesson } from "../Lesson/lesson";

export class Class {
    idClass?: string;
    capacity?: number;
    level?: Level;
    progress?: number;
    speciality?: Speciality;
    lessons?: Lesson[];
}



export enum Speciality{
    Informatique='Informatique'
    ,ElectroMecanique='ElectroMecanique'
    ,GenieCivil='GenieCivil'
}
export enum Level{
    LEVEL_1='LEVEL_1'
    ,LEVEL_2='LEVEL_2'
    ,LEVEL_3='LEVEL_3'
    ,LEVEL_4='LEVEL_4'
    ,LEVEL_5='LEVEL_5'
   

}