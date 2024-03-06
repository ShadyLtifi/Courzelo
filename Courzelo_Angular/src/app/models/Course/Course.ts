export class Course {
    idCourse?: string;
    title?: string;
    content?: string;
    datecomment?: Date;

    constructor(idCourse?: string, title?: string,content?:string, datecomment?: Date) {
        this.idCourse = idCourse;
        this.title = title;
        this.datecomment = datecomment;
      }
}