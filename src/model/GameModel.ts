import mongoose, { Schema, Document } from "mongoose";

export interface IGame extends Document {
    title: string;
    beschreibung?: string;
    poilId?: mongoose.Types.ObjectId[]; // Array von ObjectIds, die auf POI-Listen verweisen
    maxTeam: number; // Maximale Anzahl von Teams
    userId: mongoose.Types.ObjectId; // Verweis auf den Benutzer
}

const gameSchema = new Schema<IGame>(
    {
        title: { type: String, required: true },
        beschreibung: { type: String },
        poilId: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "POILists", // Verweis auf das `POILists`-Modell
            },
        ],
        maxTeam: { type: Number, required: true },
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User", // Verweis auf das `User`-Modell
            required: true,
        },
    }
);

export const Game = mongoose.model<IGame>("Game", gameSchema);

