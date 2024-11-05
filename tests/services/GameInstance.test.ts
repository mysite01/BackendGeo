import { Game } from "../../src/model/GameModel";
import { Team } from "../../src/model/TeamModel";
import * as GameInstanceService from "../../src/services/GameInstanceService";
import { GameInstanceResource } from "../../src/Resources";

test("sollte eine GameInstance erfolgreich erstellen und zurückgeben", async () => {
    const game = await Game.create({ title: "Test Game", POIs: [], playersID: [] });

    const team1 = await Team.create({ name: "Team A", players: [], gameInstances: [] });
    const team2 = await Team.create({ name: "Team B", players: [], gameInstances: [] });

    // Daten für die Erstellung der GameInstance
    const gameInstanceData: GameInstanceResource = {
        name: "Test Game Instance",
        status: 1, // läuft
        startTime: new Date("2023-01-01T10:00:00Z").toISOString(),
        endTime: new Date("2023-01-01T12:00:00Z").toISOString(),
        gameID: game._id.toString(),
        teamsID: [team1._id.toString(), team2._id.toString()]
    };

    const createdGameInstance = await GameInstanceService.createGameInstance(gameInstanceData);

    expect(createdGameInstance.id).toBeDefined();
    expect(createdGameInstance.name).toBe(gameInstanceData.name);
    expect(createdGameInstance.status).toBe(gameInstanceData.status);
    expect(createdGameInstance.startTime).toBe(gameInstanceData.startTime);
    expect(createdGameInstance.endTime).toBe(gameInstanceData.endTime);
    expect(createdGameInstance.gameID).toBe(game._id.toString());
    expect(createdGameInstance.teamsID.length).toBe(2);
    expect(createdGameInstance.teamsID[0]).toBe(team1._id.toString());
    expect(createdGameInstance.teamsID[1]).toBe(team2._id.toString());
});
