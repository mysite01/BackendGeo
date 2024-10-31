import supertest from "supertest";
import app from "../../src/app";
import * as GameService from "../../src/services/GameService"
import { Game } from "src/model/GameModel";

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

    const response = await supertest(app).post("/api/game").send(newGameData);

    expect(response.status).toBe(201);
    expect(response.body.title).toBe(newGameData.title);
    expect(response.body.POIs).toEqual(newGameData.POIs);
    expect(response.body.playersID).toEqual(newGameData.playersID);
});