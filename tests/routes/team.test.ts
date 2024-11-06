import supertest from "supertest";
import app from "../../src/app";

import * as TeamService from "../../src/services/TeamService"
import * as PlayerService from "../../src/services/PlayerService"
import { TeamResource } from "src/Resources";

test ("Test post Team, korrekte eingaben", async()=>{
    const newPlayer = await PlayerService.createPlayer({name: "Thomas", gameId: "1"})
    const playerID: string = newPlayer.id!
    const newTeam: TeamResource = {
        name: "Team 1",
        playersID: [playerID]
    }
    console.log(newTeam)
    const testee = supertest(app)
    const response = await testee.post(`/api/team/`).send(newTeam)
    expect(response.statusCode).toBe(201)
})