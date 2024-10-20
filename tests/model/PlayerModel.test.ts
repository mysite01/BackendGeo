import { Player } from "../../src/model/PlayerModel";

test("", async () => {
    const player = await Player.create({ name: "Harry", gameId: "test"})
    expect(player).toBeTruthy();
})