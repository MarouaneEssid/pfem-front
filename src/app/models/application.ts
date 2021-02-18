import { User } from "./user";
import {Subject} from "./subject"

export class Application {
    id: number;
    resume: string;
    coverLetter: string;
    userDTO: User;
    subjectDTO: Subject;
}