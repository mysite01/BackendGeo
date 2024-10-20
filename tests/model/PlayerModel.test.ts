import { Player } from "../../src/model/PlayerModel";

test("CreatePlayer test", async () => {
    const player = await Player.create({ name: "Harry", gameId: "test"})
    expect(player).toBeTruthy();
})

test("FindPlayer test", async () => {
    const player = await Player.create({ name: "Harry", gameId: "test"})
    const foundPlayer = await Player.findOne({ name: "Harry"})
    expect(foundPlayer).toBeTruthy();
})
