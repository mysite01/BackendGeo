import { Game } from '../../src/model/GameModel';

test("CreateGame test", async () => {
    const game = await Game.create({
        title: "Berlin Warschauer Straße",
        location: {
            type: "Point",
            coordinates: [13.451176883277185, 52.50888599508144]
        }
    });
    expect(game).toBeTruthy();  
    expect(game.title).toBe("Berlin Warschauer Straße");
    expect(game.location.coordinates).toEqual([13.451176883277185, 52.50888599508144]);
});