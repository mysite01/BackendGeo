import { Player } from "../../src/model/PlayerModel"
import { getAllPlayers, getPlayer, createPlayer, deletePlayer } from "../../src/services/PlayerService"

beforeEach(async () => {
    // Leere die Player Collection vor jedem Test
    await Player.deleteMany({});
});

test("getAllPlayers - Alle Spieler eines Spiels abrufen", async () => {
    // Erstelle zwei Spieler
    const player1 = await Player.create({ name: "Player1", gameId: "game123" });
    const player2 = await Player.create({ name: "Player2", gameId: "game123" });
    const players = await getAllPlayers("game123");
    expect(players.length).toBe(2);
    expect(players[0].id).toBe(player1._id.toString());
    expect(players[1].id).toBe(player2._id.toString());
    expect(players[0].gameId).toBe("game123");
});

test("getPlayer - Spieler mit bestimmter ID abrufen", async () => {
    const player = await Player.create({ name: "Player1", gameId: "game123" });
    const fetchedPlayer = await getPlayer(player._id.toString());
    expect(fetchedPlayer.id).toBe(player._id.toString());
    expect(fetchedPlayer.name).toBe("Player1");
    expect(fetchedPlayer.gameId).toBe("game123");
});


test("createPlayer - Spieler erstellen", async () => {
    const playerData = {
        name: "NewPlayer",
        gameId: "game123",
        createdAt: new Date().toISOString(),
    };
    const createdPlayer = await createPlayer(playerData);
    expect(createdPlayer.name).toBe("NewPlayer");
    expect(createdPlayer.gameId).toBe("game123");
    expect(createdPlayer.createdAt).toBeDefined();
});

test("deletePlayer - Spieler löschen", async () => {
    const player = await Player.create({ name: "PlayerToDelete", gameId: "game123" });
    await deletePlayer(player._id.toString());
    const deletedPlayer = await Player.findById(player._id);
    expect(deletedPlayer).toBeNull();
});

test("deletePlayer - Fehler bei nicht existierendem Spieler", async () => {
    const nonExistentId = "000000000000000000000000";
    await expect(deletePlayer(nonExistentId)).rejects.toThrow(`Couldnt delete Eintrag with id ${nonExistentId}`);
});
