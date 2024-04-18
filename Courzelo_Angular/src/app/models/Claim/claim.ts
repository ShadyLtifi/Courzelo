export class Claim {
    idclaim?: number;
    titre?: string;
    dateClaim?: Date;
    status?: Status;
    typeClaim?: TypeClaim;
}


export enum TypeClaim{
    Technical_Problem,
    Score,
    Course_Content
}

export enum Status{
    InProgress,
    Pending,
    Resolved
}