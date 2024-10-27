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

test("Test createPlayer, korrekte eingaben", async()=>{
    const testee = supertest(app)
    const response = await testee.post(`/api/player/`).send({name: "Helke", gameId: "1"})
    expect(response.status).toBe(201)
    expect(response.body.name).toBe("Helke")
})

test("Test create Player, keine eingaben", async ()=> {
    const testee = supertest(app)
    const response = await testee.post(`/api/player/`).send()
    expect(response.status).toBe(404)
})

test("Test create Player, falsche eingaben (falscher datentyp, gameid)", async()=>{
    const testee = supertest(app)
    const response = await testee.post(`/api/player/`).send({name: "Arwed", gameId: 1})
    expect(response.status).toBe(404)
})