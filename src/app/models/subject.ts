import { Technology } from './technology';
import { User } from './user';
export class Subject {
    id: number;
    title : string;
    description : string;
    publicationDate? : Date;
    startDate : Date;
    endDate : Date;
    technologies : Technology[];
    userDTO : User;
}