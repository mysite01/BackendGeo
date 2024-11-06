import express from "express";
import * as TeamService from "../services/TeamService"
import { TeamResource } from "src/Resources";
import { Team } from "src/model/TeamModel";

//TODO: mit ExpressValidator Input validieren


export const teamRouter = express.Router();

/**
 * Route für erstellen von team
 * 
 */
teamRouter.post("/", async (req, res, next) =>{
    try{
        const newTeam = await TeamService.createTeam(req.body)
        res.status(201).send(newTeam)
    } catch (err){
        res.status(404)
        next(err)
    }
})
