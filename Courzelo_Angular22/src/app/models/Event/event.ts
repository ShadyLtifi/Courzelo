import { Speaker } from "./speaker";

export class Event {


    idevent?: string;
    title?: string;
    photo? : string;
    maxcapacity?: number;
    duration?: string;
    debutdate ?: Date;
    price ?: boolean;
    category ?: Category;
    name?: Speaker;
    speaker?: Speaker;    
    photoUrl?: string;  // URL to fetch the photo
    createdAt?: Date;
    updatedAt?: Date;  
   
  }

    export enum Category{
      CONFERENCE=' CONFERENCE'
      , TEAM_BUILDING_ACTIVITIE = 'TEAM_BUILDING_ACTIVITIE', 
      COURSE_LAUNCH=' COURSE_LAUNCH', 
      VIRTUEL_TRAINING_SESSION=' VIRTUEL_TRAINING_SESSION', 
      HACKATHON=' HACKATHON', 
      VIRTUEL_RECRUITING_EVENT='VIRTUEL_RECRUITING_EVENT'
  
  
  }
