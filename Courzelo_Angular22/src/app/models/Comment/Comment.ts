export class Comment {
    idComment?: string;
    message?: string;
    datecomment?: Date;
    publicationId?: string;

    constructor(idComment?: string, message?: string,  datecomment?: Date,  publicationId?: string) {
        this.idComment = idComment;
        this.message = message;
        this.datecomment = datecomment;
        this.publicationId = publicationId;
      }
}