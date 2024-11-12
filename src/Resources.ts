export type PlayerResource = {
    id?: string
    name: string
    gameId: string
    createdAt?: string 
}

export interface GameResource {
    id?: string;
    title: string;
    beschreibung?: string;
    POIs: {
        type: string;
        coordinates: [number, number];
    }[];
}

export type GameInstanceResource = {
    id?: string;
    name?: string;
    status: number; 
    startTime: string; 
    endTime: string;
    gameID: string;
    teamsID: string[];
}

export type TeamResource = {
    id?: string;
    name: string;
    playersID: string[]; 
    createdAt?: string;
};
<<<<<<< HEAD
export type UserResource = {
    id?: string;
    name: string;
    password: string;
    createdAt?: Date;
};
=======

export type POIResource = {
    id?: string;
    name: string;
    lat: number;
    long: number;
    beschreibung: string;
    punkte: number;
};
>>>>>>> 66736265166c6758ab42ea732e56bcb66ff636f3
