import supertest from "supertest";
import app from "../../src/app";

import * as TeamService from "../../src/services/TeamService"
import * as PlayerService from "../../src/services/PlayerService"
import { TeamResource } from "src/Resources";

test ("Test post Team, korrekte eingaben", async()=>{
    const newPlayer = await PlayerService.createPlayer({name: "Thomas", gameId: "1"})
    const playerID: string = newPlayer.id!
    const newTeamResource: TeamResource = {
        name: "Team 1",
        playersID: [playerID]
    }
    const testee = supertest(app)
    const response = await testee.post(`/api/team/`).send(newTeamResource)
    expect(response.statusCode).toBe(201)
})

test ("Delete Team Test", async()=>{
    const newPlayer = await PlayerService.createPlayer({name: "Thomas", gameId: "1"})
    const playerID: string = newPlayer.id!
    const newTeamResource: TeamResource = {
        name: "Team 1",
        playersID: [playerID]
    }
    const newTeam = await TeamService.createTeam(newTeamResource)

    const testee = supertest(app)

    const response = await testee.delete(`/api/team/${newTeam.id}`).send(newTeamResource)
    expect(response.statusCode).toBe(204)
})