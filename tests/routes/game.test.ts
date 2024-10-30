import supertest from "supertest";
import app from "../../src/app";
import * as GameService from "../../src/services/GameService"

test("sollte ein neues Spiel erstellen und 201 zurückgeben", async () => {
    const newGameData = {
        title: "Neues Spiel",
        POIs: [
            {
                type: "Point",
                coordinates: [13.377704, 52.516275] // Brandenburger Tor
            }
        ],
        playersID: []
    };

    const response = await supertest(app).post("/games").send(newGameData);

    expect(response.status).toBe(201);
    expect(response.body.title).toBe(newGameData.title);
    expect(response.body.POIs).toEqual(newGameData.POIs);
    expect(response.body.playersID).toEqual(newGameData.playersID);
});
    
test("sollte ein Spiel löschen und 204 zurückgeben", async () => {
    // Erstellen eines Spiels, um es danach zu löschen
    const newGame = await GameService.createGame({ title: "Spiel zum Löschen", POIs: [], playersID: [] });

    const response = await supertest(app).delete(`/games/${newGame.id}`);

    expect(response.status).toBe(204);
});

test("sollte 404 zurückgeben, wenn das Spiel nicht gefunden wird", async () => {
    const nonExistentId = "6b";

    const response = await supertest(app).delete(`/games/${nonExistentId}`);

    expect(response.status).toBe(404);
    expect(response.body.error).toBe("Fehler beim Löschen des Spiels");
});