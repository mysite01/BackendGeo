import { Types } from "mongoose";
import app from "../../src/app";
import { GameInstance } from "../../src/model/GameInstanceModel";
import { Game } from "../../src/model/GameModel";
import { Team } from "../../src/model/TeamModel";
import supertest from "supertest";

test("sollte eine neue GameInstance erstellen und 201 zurückgeben", async () => {
    const game = await Game.create({ title: "Test Game", POIs: [], playersID: [] });
    const team1 = await Team.create({ name: "Team A", players: [] });
    const team2 = await Team.create({ name: "Team B", players: [] });

    const team1Id = (team1._id as Types.ObjectId).toString();
    const team2Id = (team2._id as Types.ObjectId).toString();

    const gameInstanceData = {
        name: "Test Game Instance",
        status: 1,
        startTime: new Date("2023-01-01T10:00:00Z").toISOString(),
        endTime: new Date("2023-01-01T12:00:00Z").toISOString(),
        gameID: game._id.toString(),
        teamsID: [team1Id, team2Id],
    };

    const response = await supertest(app).post("/api/gameinstance").send(gameInstanceData);

    expect(response.status).toBe(201);
    expect(response.body).toBeDefined();
    expect(response.body.name).toBe(gameInstanceData.name);
    expect(response.body.status).toBe(gameInstanceData.status);
    expect(response.body.startTime).toBe(gameInstanceData.startTime);
    expect(response.body.endTime).toBe(gameInstanceData.endTime);
    expect(response.body.gameID).toBe(gameInstanceData.gameID);
    expect(response.body.teamsID.length).toBe(2);
    expect(response.body.teamsID[0]).toBe(team1Id.toString());
    expect(response.body.teamsID[1]).toBe(team2Id.toString());

    // Aufräumen
    await GameInstance.findByIdAndDelete(response.body.id);
});

test("sollte eine GameInstance anhand der ID abrufen und 200 zurückgeben", async () => {
    const game = await Game.create({ title: "Test Game", POIs: [], playersID: [] });
    const team1 = await Team.create({ name: "Team A", players: [] });
    const team2 = await Team.create({ name: "Team B", players: [] });

    const gameInstance = await GameInstance.create({
        name: "Test Game Instance",
        status: 1,
        startTime: new Date("2023-01-01T10:00:00Z"),
        endTime: new Date("2023-01-01T12:00:00Z"),
        game: game._id,
        teams: [team1._id, team2._id],
    });
    const team1Id = (team1._id as Types.ObjectId).toString();
    const team2Id = (team2._id as Types.ObjectId).toString();


    const response = await supertest(app).get(`/api/gameinstance/${gameInstance._id.toString()}`);

    expect(response.status).toBe(200);
    expect(response.body).toBeDefined();
    expect(response.body.id).toBe(gameInstance._id.toString());
    expect(response.body.name).toBe(gameInstance.name);
    expect(response.body.status).toBe(gameInstance.status);
    expect(response.body.startTime).toBe(gameInstance.startTime.toISOString());
    expect(response.body.endTime).toBe(gameInstance.endTime.toISOString());
    expect(response.body.gameID).toBe(game._id.toString());
    expect(response.body.teamsID.length).toBe(2);
    expect(response.body.teamsID[0]).toBe(team1Id);
    expect(response.body.teamsID[1]).toBe(team2Id);

    await GameInstance.findByIdAndDelete(gameInstance._id);
});