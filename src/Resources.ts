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
export type TeamResource = {
    id?: string;
    name: string;
    playersID: string[]; 
    createdAt?: string;
};
