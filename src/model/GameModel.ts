import mongoose from "mongoose";

export interface IGame {
    title: string; 
    POIs: {
        type: string,
        coordinates: [number, number],
    }[];
    playersID: mongoose.Schema.Types.ObjectId[]; 
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
        playersID: [{ 
            type: mongoose.Schema.Types.ObjectId, 
            ref: 'Player'
        }]
    }
);

export const Game = mongoose.model<IGame>('Game', gameSchema);