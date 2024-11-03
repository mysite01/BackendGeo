import mongoose, { Schema, Document, Types } from 'mongoose';

export interface ITeam extends Document {
    name: string;
    players: Types.ObjectId[];
}

const teamSchema = new Schema<ITeam>({
    name: { type: String, required: true },
    players: [{ type: Schema.Types.ObjectId, ref: 'Player' }]  // Referenziert die Player-Dokumente
});

export const Team = mongoose.model<ITeam>('Team', teamSchema);
