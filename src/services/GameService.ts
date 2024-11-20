import { GameResource } from "../../src/Resources";
import { IGame, Game } from "../model/GameModel";


/**
 * Gibt alle Games zurück
 */
export async function getAllGames(): Promise<GameResource[]> {
    const games = await Game.find();

    return games.map(game => ({
        title: game.title,
        beschreibung: game.beschreibung || "",
        poilId: game.poilId ? game.poilId.map(id => id.toString()) : [],
        maxTeam: game.maxTeam,
        userId: game.userId.toString(),
        POIs: game.poilId?.map(id => ({
            type: "Point",
            coordinates: [0, 0], // Beispielkoordinaten, da keine echten POIs im Schema definiert sind
        })) || [],
    }));
}

/**
 * Gibt ein Game anhand der ID zurück.
 * Falls kein Game gefunden wird, wird ein Fehler geworfen.
 */
export async function getGameById(id: string): Promise<GameResource> {
    const game = await Game.findById(id).exec();

    if (!game) {
        throw new Error(`Game mit ID ${id} nicht gefunden`);
    }

    return {
        title: game.title,
        beschreibung: game.beschreibung || "",
        poilId: game.poilId ? game.poilId.map(id => id.toString()) : [],
        maxTeam: game.maxTeam,
        userId: game.userId.toString(),
        POIs: game.poilId?.map(id => ({
            type: "Point",
            coordinates: [0, 0], // Beispielkoordinaten
        })) || [],
    };
}

/**
 * Erstellt ein neues Game
 */
export async function createGame(gameResource: GameResource): Promise<GameResource> {
    const neuesGame = new Game({
        title: gameResource.title,
        beschreibung: gameResource.beschreibung,
        poilId: gameResource.poilId,
        maxTeam: gameResource.maxTeam,
        userId: gameResource.userId,
    });

    const gespeichertesGame = await neuesGame.save();

    return {
        title: gespeichertesGame.title,
        beschreibung: gespeichertesGame.beschreibung || "",
        poilId: gespeichertesGame.poilId ? gespeichertesGame.poilId.map(id => id.toString()) : [],
        maxTeam: gespeichertesGame.maxTeam,
        userId: gespeichertesGame.userId.toString(),
        POIs: gespeichertesGame.poilId?.map(id => ({
            type: "Point",
            coordinates: [0, 0], // Beispielkoordinaten
        })) || [],
    };
}

/**
 * Löscht ein Game anhand der ID
 */
export async function deleteGame(id: string): Promise<void> {
    const query = await Game.findByIdAndDelete(id).exec();
    if (!query) {
        throw new Error(`Game mit ID ${id} konnte nicht gelöscht werden`);
    }
}

