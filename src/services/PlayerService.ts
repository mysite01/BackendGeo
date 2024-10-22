import { PlayerResource } from "src/Resources"
import { Player } from "src/model/PlayerModel";

/**
 * gibt alle Spieler aus einem bestimmten Game als
 * Array zurück
 */
export async function getAllPlayers(gameId: string): Promise<PlayerResource[]> {
    const playerList = await Player.find({ gameId }).exec();
    
    const data = playerList.map(player => ({
        id: player._id.toString(),  
        name: player.name,
        gameId: player.gameId.toString(), 
        createdAt: player.createdAt ? player.createdAt.toISOString() : new Date().toISOString(),
    }));

    return data;
}


    throw new Error("not implemented yet")


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
    const neuerSpieler = new Player({
        name: playerResource.name,
        gameId: playerResource.gameId,
        createdAt: new Date(),
    });
    const gespeicherterSpieler = await neuerSpieler.save();
    const spielerOhnePasswort: PlayerResource = {
        id: gespeicherterSpieler._id.toString(), 
        name: gespeicherterSpieler.name,         
        gameId: gespeicherterSpieler.gameId.toString(), 
        createdAt: gespeicherterSpieler.createdAt ? gespeicherterSpieler.createdAt.toISOString() : new Date().toISOString(), 
    };
    return spielerOhnePasswort;
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