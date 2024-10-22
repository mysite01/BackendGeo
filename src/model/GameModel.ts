import mongoose from "mongoose";

export interface IGame {
    title: string; 
    location: {
        type: string,  
        coordinates: [number, number],  
    };
    //players: mongoose.Schema.Types.ObjectId[]; Später bearbeiten für Liste der Spieler im Game
}

const gameSchema = new mongoose.Schema<IGame>(
    {
        title: { type: String, required: true },  
        location: { //GeoJSON format für den Standort
            type: {
                type: String,
                enum: ['Point'],  
                required: true
            },
            coordinates: {
                type: [Number],  
                required: true
            }
        }
    }
);

export const Game = mongoose.model<IGame>('Game', gameSchema);