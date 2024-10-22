import express from "express";
import * as PlayerService from "../services/PlayerService"
import { PlayerResource } from "src/Resources";

export const gameRouter = express.Router();

/**
 * Route für das finden von allen Players
 * in einem Game
 */
gameRouter.get("/:id", async(req, res, next)=>{
    throw new Error("not implemented yet")
})

/**
 * Route zum Erstellen eines neuen Games
 */
gameRouter.post("/", async (req, res, next) => {
    throw new Error("not implemented yet");
});

/**
 * Route zum Löschen eines Games anhand der ID
 */
gameRouter.delete("/:id", async (req, res, next) => {
    throw new Error("not implemented yet");
});