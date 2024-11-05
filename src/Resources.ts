export type PlayerResource = {
    id?: string
    name: string
    gameId: string
    createdAt?: string 
}

export type GameResource = {
    id?: string;  
    title: string;  
    POIs: {
        type: "Point";
        coordinates: [number, number];
    }[];
    playersID: string[];
}

export interface GameInstanceResource {
    id?: string;
    name?: string;
    status: number; 
    startTime: string; 
    endTime: string;
    gameID: string;
    teamsID: string[];
}