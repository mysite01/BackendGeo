import mongoose, { Types } from 'mongoose';
import { Team, ITeam } from '../model/TeamModel';
import { TeamResource } from 'src/Resources';

/**
 * Erstellt ein neues Team
 */
export async function createTeam(teamResource: TeamResource): Promise<TeamResource> {
    try {
        const team = new Team({
            name: teamResource.name,
            players: teamResource.playersID.map(playerId => new Types.ObjectId(playerId))
        });

        const savedTeam = await team.save() as ITeam & { _id: Types.ObjectId }; // Typen des gespeicherten Dokuments anpassen

        return {
            id: savedTeam._id.toString(), // ID als String
            name: savedTeam.name,
            playersID: savedTeam.players.map(playerId => playerId.toString())
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
