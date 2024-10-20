import mongoose from "mongoose";

export interface IGame {

}

const gameSchema = new mongoose.Schema<IGame>(
    {

    }
)

export const Game = mongoose.model<IGame>('Game', gameSchema)