import supertest from "supertest";
import app from "../../src/app";

import * as PlayerService from "../../src/services/PlayerService"

test ("Test getPlayer, korrekte eingaben", async()=>{
    await PlayerService.createPlayer({name: "Thomas", gameId: "1"})

    const testee = supertest(app)
    const response = await testee.get(`/api/player/1`)
    expect(response.statusCode).toBe(200)
    expect(response.body.length).toBe(1)
})