import mongoose from 'mongoose'

export interface IPlayer {
    nickName: string;
    createdAt?: Date;
    joinedAtInTeam?: Date;
    leftAtInTeam?: Date;
    host:boolean;
    teamId?: mongoose.Schema.Types.ObjectId;
    
}

const playerSchema = new mongoose.Schema<IPlayer>(
    {
        nickName: {type: String, required: true},
        joinedAtInTeam: { type: Date }, 
        leftAtInTeam: { type: Date }, 
        host: { type: Boolean, required: true }, 
        teamId: [{ type: String, 
            
            ref: "Team" }],
     
    },
    {
        timestamps: true, 
    }
)

export const Player = mongoose.model<IPlayer>('Player', playerSchema);