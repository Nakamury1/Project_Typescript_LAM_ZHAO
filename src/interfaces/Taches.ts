import { Status } from "../type/Status.js";

export interface TachesInterface{
    id: number;
    titre: string;
    etat_tache: Status;
    deadline: Date;
    user_Id: number;
}