import { GameResource } from 'src/Resources';
import { Game } from '../model/GameModel';

/**
 * Erstellt ein neues Game
 */
export async function createGame(gameResource: GameResource): Promise<GameResource> {
    try {
        const game = new Game({
            title: gameResource.title,
            beschreibung: gameResource.beschreibung || "", // Beschreibungsfeld hinzufügen
            POIs: gameResource.POIs.map(poi => ({
                type: "Point",
                coordinates: poi.coordinates
            }))
        });

        const savedGame = await game.save();

        return {
            id: savedGame._id.toString(),
            title: savedGame.title,
            beschreibung: savedGame.beschreibung || "",
            POIs: savedGame.POIs.map(poi => ({
                type: "Point",
                coordinates: poi.coordinates
            }))
        };
    } catch (error) {
        throw new Error("Fehler beim Erstellen des Spiels");
    }
}

/**
 * Findet ein Game anhand der ID 
 */
export async function getGameById(id: string): Promise<GameResource> {
    try {
        const game = await Game.findById(id).exec();
        if (!game) {
            throw new Error("Spiel nicht gefunden");
        }
        return {
            id: game._id.toString(),
            title: game.title,
            beschreibung: game.beschreibung || "",
            POIs: game.POIs.map(poi => ({
                type: "Point",
                coordinates: poi.coordinates
            }))
        };
    } catch (error) {
        throw new Error("Fehler beim Abrufen des Spiels");
    }
}

/**
 * Löscht ein Game anhand der ID 
 */
export async function deleteGame(id: string): Promise<void> {
    const query = await Game.findByIdAndDelete(id).exec();
    if (!query) {
        throw new Error("Das Spiel konnte nicht gelöscht werden!");
    }
}
