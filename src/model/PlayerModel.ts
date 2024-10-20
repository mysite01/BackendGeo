import mongoose from 'mongoose'

export interface IPlayer {
    name: string;
    gameId: mongoose.Schema.Types.ObjectId;
    createdAt?: Date;
}

const playerSchema = new mongoose.Schema<IPlayer>(
    {
        name: {type: String, required: true},
        gameId: {
            type: mongoose.Schema.Types.ObjectId as any,
            required: true,
            ref: "IGame"
        }
    },
    {
        timestamps: true,
    }
)

export const Player = mongoose.model<IPlayer>('Player', playerSchema);