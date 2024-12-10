import { Position } from "./position.model";

export interface Player {
    id: number;
    firstName: string;
    lastName: string;
    fullName: string;
    dateOfBirth: Date;
    age: number;
    position: Position;
    isLeftFooted: boolean;
    shirtNumber: number;
    teamName: string;
}