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

/**
 * Route für das entfernen von Teams
 */
teamRouter.delete("/:id", async (req, res, next) => {
    let id = "";
    if(req.params){
        id = req.params.id
    }

    try{
        await TeamService.deleteTeam(id)
        res.status(204).send()
    } catch (err){
        res.status(404)
        next(err)
    }
})

/**
 * Route für das bekommen von allen Spielern eines Teams
 */
teamRouter.get("/:id", async (req, res, next) => {
    let id = "";
    if(req.params){
        id = req.params.id
    }

    try{
        await TeamService.getPlayerInTeam(id)
        res.status(201).send()
    } catch (err){
        res.status(404)
        next(err)
    }
})

/**
 * Route fürs bekommen von einem Team
 */
teamRouter.get("/:id", async (req, res, next) => {
    throw new Error("not implemented yet")
})
