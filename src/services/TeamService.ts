import mongoose, { Types } from 'mongoose';
import { Team, ITeam } from '../model/TeamModel';
import { TeamResource } from 'src/Resources';
import { IPlayer, Player } from '../model/PlayerModel';
import { generateQAcode } from '../utils/Qacodegenerate';
const qaCode1 = generateQAcode();
/**
 * Erstellt ein neues Team
 */
export async function createTeam(teamResource: TeamResource, nameOfTeam:string): Promise<TeamResource> {
    try {
        
        const playerID = teamResource.playersID[0];
        console.log("teamResourscccccc.......", teamResource);
        const existingTeam = await Team.findOne({ players: playerID }).exec();
        let codeInvite;
        
        if (existingTeam) {
            codeInvite = existingTeam.codeInvite;
        
        } else {
            // Andernfalls neuen `qaCode` generieren
            codeInvite = generateQAcode();
        } 
      
        const team = new Team({
            name: nameOfTeam,
            players: teamResource.playersID.map(playerId => new Types.ObjectId(playerId)),
            codeInvite: codeInvite,
        });
       
       const savedTeam = await team.save() as ITeam & { _id: Types.ObjectId }; // Typen des gespeicherten Dokuments anpassen
       //const savedTeam = await team.save() as ITeam;
       console.log("savedTeam.qaCode.......",savedTeam.codeInvite);
        return {
            id: savedTeam.id.toString(), // ID als String
            name: savedTeam.name,
            poiId: savedTeam.poiId.map(poiId=> poiId.toString() ),
            playersID: savedTeam.players.map(playerId => playerId.toString()),
            codeInvite:savedTeam.codeInvite,
        };
    } catch (error) {
        throw new Error("Fehler beim Erstellen des Teams");
    }
}
/**
 * Löscht ein Team anhand der ID
 */
export async function deleteTeam(id: string): Promise<void> {
    const query = await Team.findByIdAndDelete(id).exec();
    if (!query) {
        throw new Error("Das Team konnte nicht gelöscht werden!");
    }
}
/**
 * Holt alle Spieler in einem Team anhand der Team-ID
 */
export async function getPlayerInTeam(teamId: string): Promise<string[]> {
    try {
        const team = await Team.findById(teamId).exec();
        if (!team) {
            throw new Error("Team nicht gefunden"); // Erwartete Fehlermeldung
        }
        return team.players.map(playerId => playerId.toString());
    } catch (error) {
        throw new Error("Fehler beim Abrufen der Spieler im Team");
    }
}


/**
 * update Teamplayers anhand der Team-ID
 */

export async function updateTeam(teamId: string, updatedData: any): Promise<any> {
    try {
       
        const team = await Team.findById(teamId).exec();

        if (!team) {
            throw new Error("Team nicht gefunden");
        }

        const uniquePlayers = Array.from(new Set([...team.players, ...updatedData.players]));
        
        team.players = uniquePlayers;
        const updatedTeam = await team.save();
        
        return updatedTeam;

    } catch (error) {
        throw new Error("Fehler beim Update der Spieler im Team");
    }
}


export async function updateDeletePlayerInTeam(teamId: string, updatedData: { playerID: string, action: string }): Promise<any> {
    try {
        // Find the team by ID
        const team = await Team.findById(teamId).exec();

        if (!team) {
            throw new Error("Team nicht gefunden");
        }

        // Check action type
        if (updatedData.action === "remove") {
            // Remove the playerID from the players array
            team.players = team.players.filter(id => id.toString() !== updatedData.playerID);
        } else if (updatedData.action === "add") {
            // Add the playerID to the players array if not already present
            if (!team.players.some(id => id.toString() === updatedData.playerID)) {
                team.players.push(new mongoose.Types.ObjectId(updatedData.playerID)); // Ensure it's stored as ObjectId
            }
        } else {
            throw new Error("Ungültige Aktion");
        }

        // Save the updated team document
        const updatedTeam = await team.save();

        return updatedTeam;

    } catch (error) {
        throw new Error("Fehler beim Aktualisieren der Spieler im Team");
    }
}


export async function getTeamsByQACode(codeInvite: string): Promise<any[]> {
    try {
      
        const teams = await Team.find({ codeInvite: codeInvite });

        return teams;
        
    } catch (error) {
        console.error("Error in getTeamsByQACode:", error);
        throw error;
    }
}
