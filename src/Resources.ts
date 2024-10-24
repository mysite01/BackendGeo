export type PlayerResource = {
    id?: string
    name: string
    gameId: string
    createdAt?: string 
}

export type GameResource = {
    id?: string;  
    title: string;  
    location: {
        type: "Point";  
        coordinates: [number, number]; 
    };
    players?: string[];
}