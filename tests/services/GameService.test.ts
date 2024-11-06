import { createGame, deleteGame, getGameById } from "../../src/services/GameService";
import { Game } from '../../src/model/GameModel';
import { GameResource } from "src/Resources";

test('CreateGame with multiple POIs', async () => {
    const gameData: GameResource = {
        title: "Berlin Sehenswürdigkeiten",
        beschreibung: "Einige der bekanntesten Sehenswürdigkeiten in Berlin",
        POIs: [
            {
                type: "Point",
                coordinates: [13.404954, 52.520008]  // Brandenburger Tor
            },
            {
                type: "Point",
                coordinates: [13.377704, 52.516275]  // Reichstag
            },
            {
                type: "Point",
                coordinates: [13.41053, 52.523219]   // Alexanderplatz
            }
        ]
    };

    const createdGame = await createGame(gameData);

    expect(createdGame).toBeTruthy();
    expect(createdGame.title).toBe(gameData.title);
    expect(createdGame.beschreibung).toBe(gameData.beschreibung);
    expect(createdGame.POIs).toHaveLength(3);

    expect(createdGame.POIs[0].coordinates).toEqual([13.404954, 52.520008]);
    expect(createdGame.POIs[1].coordinates).toEqual([13.377704, 52.516275]);
    expect(createdGame.POIs[2].coordinates).toEqual([13.41053, 52.523219]);
});

test('deleteGame by ID', async () => {
    const game = await Game.create({
        title: "Testspiel",
        beschreibung: "Ein Testspiel für Löschung",
        POIs: [
            {
                type: "Point",
                coordinates: [13.404954, 52.520008]
            }
        ]
    });

    expect(game).toBeTruthy();
    const gameId = game._id.toString();

    await deleteGame(gameId);
    const deletedGame = await Game.findById(gameId).exec();
    expect(deletedGame).toBeNull();
});

test('ID finden und zurückgeben', async () => {
    // Beispiel-Daten für das zu erstellende Spiel
    const gameData: GameResource = {
        title: "Berlin Sehenswürdigkeiten",
        beschreibung: "Einige der bekanntesten Sehenswürdigkeiten in Berlin",
        POIs: [
            {
                type: "Point",
                coordinates: [13.404954, 52.520008]  // Brandenburger Tor
            }
        ]
    };

    // Ein Spiel erstellen und in der Datenbank speichern
    const createdGame = await createGame(gameData);
    const game = await getGameById(createdGame.id!);

    // Überprüfen, ob das abgerufene Spiel den richtigen Titel und die richtigen POIs hat
    expect(game).toBeTruthy();
    expect(game.title).toBe(gameData.title);
    expect(game.beschreibung).toBe(gameData.beschreibung);
    expect(game.POIs).toHaveLength(1);
    expect(game.POIs[0].coordinates).toEqual(gameData.POIs[0].coordinates);
});

test('sollte einen Fehler auslösen, wenn das Spiel nicht existiert', async () => {
    // Eine ungültige ID verwenden
    const invalidId = "50";

    // Erwartet, dass ein Fehler ausgelöst wird
    await expect(getGameById(invalidId)).rejects.toThrow("Fehler beim Abrufen des Spiels");
});
