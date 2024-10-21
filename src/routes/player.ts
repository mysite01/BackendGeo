import express from "express";
import * as PlayerService from "../services/PlayerService"
import { PlayerResource } from "src/Resources";

//TODO: mit ExpressValidator Input validieren


export const playerRouter = express.Router();

/**
 * Route für erstellen von Player
 * 
 */
playerRouter.post("/", async (req, res, next) =>{
    try{
        const newPlayer = await PlayerService.createPlayer(req.body)
        res.status(201).send(newPlayer)
    } catch (err){
        res.status(404)
        next(err)
    }
})

/**
 * Route für das Löschen von Player
 */
playerRouter.delete("/:id", async (req, res, next) =>{
    let id = "";
    if(req.params){
        id = req.params.id
    }

    try{
        await PlayerService.deletePlayer(id)
        res.status(204).send()
    } catch (err){
        res.status(404)
        next(err)
    }
})

/**
 * Route für das finden von einem Player
 */
playerRouter.get("/:id", async (req, res, next) =>{
    let id = "";
    if(req.params){
        id = req.params.id
    }

    try{
        const player = await PlayerService.getPlayer(id)
        res.status(200).send(player)
    } catch (err){
        res.status(404)
        next(err)
    }
})