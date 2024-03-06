export class Claim {
    idclaim?: string;
    title?: string;
    dateclaim?: Date;
    typeclaim?: TypeClaim;
    status?: Status;
  
}
  
  export enum TypeClaim {
    Technical_Problem,
    Score,
    Course_Content
  }
  
  export enum Status {
    InProgress,
    Pending,
    Resolved
  }
  