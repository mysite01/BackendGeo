import mongoose from "mongoose";

export interface IGame {
    title: string; 
    POIs: {
        type: string,
        coordinates: [number, number],
    }[];
    beschreibung?: string; 
}

const gameSchema = new mongoose.Schema<IGame>(
    {
        title: { type: String, required: true },
        POIs: [{
            type: {
                type: String,
                enum: ['Point'],
                required: true
            },
            coordinates: {
                type: [Number],
                required: true
            }
        }],
        beschreibung: { type: String } 
    }
);

export const Game = mongoose.model<IGame>('Game', gameSchema);
