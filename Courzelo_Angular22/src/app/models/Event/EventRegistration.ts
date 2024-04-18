import { Event } from "./event";

export interface EventRegistration {
    idreg: string;
    registrationDate: Date;
    confirmationStatus: boolean;
    events: Event[];
    user: User;
}

export interface User {
    id: string;
    username: string;
    email: string;
    // other user details
}