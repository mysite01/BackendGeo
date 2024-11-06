import { Game } from '../../src/model/GameModel';

test("CreateGame with multiple POIs and description", async () => {
    const game = await Game.create({
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
    });

    // Überprüfen, ob das Spiel erfolgreich erstellt wurde
    expect(game).toBeTruthy();
    expect(game.title).toBe("Berlin Sehenswürdigkeiten");

    // Überprüfen, ob die Beschreibung korrekt gesetzt ist
    expect(game.beschreibung).toBe("Einige der bekanntesten Sehenswürdigkeiten in Berlin");

    // Überprüfen, ob die POIs korrekt definiert und vollständig sind
    expect(game.POIs).toBeDefined();
    expect(game.POIs).toHaveLength(3);

    // Überprüfen der Koordinaten jedes POI
    expect(game.POIs[0].coordinates).toEqual([13.404954, 52.520008]);  // Brandenburger Tor
    expect(game.POIs[1].coordinates).toEqual([13.377704, 52.516275]);  // Reichstag
    expect(game.POIs[2].coordinates).toEqual([13.41053, 52.523219]);   // Alexanderplatz
});
