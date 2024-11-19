export type PlayerResource = {
    id?: string
    nickName: string
    createdAt?: string 
    joinedAtInTeam?: string | null;
    leftAtInTeam?: string | null;
    host:Boolean;
    teamId:string;
    
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
    codeInvite: string;
    createdAt?: string;
    poiId: string[];
    playersID: string[]; // must del
};
export type UserResource = {
    id?: string;
    name: string;
    password: string;
    createdAt?: Date;
};

export type POIResource = {
    id?: string;
    name: string;
    lat: number;
    long: number;
    beschreibung: string;
    punkte: number;
};

export type LoginResource = {
    id: string;        
    token: string;     
    expiresAt?: Date;  
};
