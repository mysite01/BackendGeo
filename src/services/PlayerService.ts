import { PlayerResource } from "src/Resources"
import { Player } from "src/model/PlayerModel";

/**
 * gibt alle Spieler aus einem bestimmten Game als
 * Array zurück
 */
export async function getAllPlayers(gameId: string): Promise<PlayerResource[]> {
    throw new Error("not implemented yet")
}

/**
 * Liefert die PlayerResource mit angegebener Id.
 * Falls kein Player Gefunden wird, wird ein Fehler 
 * geworfen
 */
export async function getPlayer(id:string): Promise<PlayerResource> {
    throw new Error("not implemented yet")
}

/**
 * Erzeugt einen Player
 * 
 */
export async function createPlayer(playerResource: PlayerResource):Promise<PlayerResource> {
    throw new Error("not implemented yet")
}

/**
 * Löscht einen Player
 */
export async function deletePlayer(id:string):Promise<void> {
    const query = await Player.findByIdAndDelete(id).exec()
    if(!query){
        throw new Error(`Couldnt delete Eintrag with id ${id}`);
    }
}