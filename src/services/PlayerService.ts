import { PlayerResource } from "../../src/Resources";
import { IPlayer, Player } from "../model/PlayerModel";


/**
 * gibt alle Spieler aus einem bestimmten Game als
 * Array zurück
 */
export async function getAllPlayers(): Promise<PlayerResource[]> {
    const playerList = await Player.find();
    
    const data = playerList.map(player => ({
        id: player._id.toString(),  
        nickName: player.nickName,
        host:player.host,
        teamId: "12354",
        createdAt: player.createdAt ? player.createdAt.toISOString() : new Date().toISOString(),
    }));

    return data;
}


   // throw new Error("not implemented yet")


/**
 * Liefert die PlayerResource mit angegebener Id.
 * Falls kein Player Gefunden wird, wird ein Fehler 
 * geworfen
 */
export async function getPlayer(id:string): Promise<PlayerResource> {
    const player = await Player.findById(id).exec();
console.log("playerssssssss.......", player);
    if (!player) {
        throw new Error(`Player mit ID ${id} nicht gefunden`);
    }

    const playerResource: PlayerResource = {
        id: player._id.toString(),
        nickName: player.nickName,
        teamId: "1234",
        createdAt: player.createdAt ? player.createdAt.toISOString() : new Date().toISOString(),
        host:player.host, 
    };

    return playerResource;
}

   // throw new Error("not implemented yet")


/**
 * Erzeugt einen Player
 * 
 */
export async function createPlayer(playerResource: PlayerResource):Promise<PlayerResource> {
    const neuerSpieler = new Player({
        nickName: playerResource.nickName,
        createdAt: new Date(),
        host: playerResource.host,
        teamId: playerResource.teamId,
    });
    const gespeicherterSpieler = await neuerSpieler.save();
    const spielerOhnePasswort: PlayerResource = {
        id: gespeicherterSpieler._id.toString(), 
        nickName: gespeicherterSpieler.nickName,  
        host:gespeicherterSpieler.host, 
        teamId: "12345",
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

