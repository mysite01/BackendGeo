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
export type TeamResource = {
    id?: string;
    name: string;
    playersID: string[]; 
    createdAt?: string;
};
