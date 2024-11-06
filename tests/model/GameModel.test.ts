import { Game } from "../../src/model/GameModel";

test("CreateGame with multiple POIs", async () => {
  const game = await Game.create({
    title: "Berlin Sehenswürdigkeiten",
    POIs: [
      {
        type: "Point",
        coordinates: [13.404954, 52.520008], // Brandenburger Tor
      },
      {
        type: "Point",
        coordinates: [13.377704, 52.516275], // Reichstag
      },
      {
        type: "Point",
        coordinates: [13.41053, 52.523219], // Alexanderplatz
      },
    ],
  });

  expect(game).toBeTruthy();
  expect(game.title).toBe("Berlin Sehenswürdigkeiten");

  expect(game.POIs).toBeDefined();
  expect(game.POIs).toHaveLength(3);

  expect(game.POIs[0].coordinates).toEqual([13.404954, 52.520008]); // Brandenburger Tor
  expect(game.POIs[1].coordinates).toEqual([13.377704, 52.516275]); // Reichstag
  expect(game.POIs[2].coordinates).toEqual([13.41053, 52.523219]); // Alexanderplatz
});