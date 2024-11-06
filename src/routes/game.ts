import express from "express";
import * as GameService from "../services/GameService"
import * as PlayerService from "../services/PlayerService"
import { PlayerResource } from "src/Resources";

export const gameRouter = express.Router();

/**
 * Route für das finden von allen Players
 * in einem Game
 */
gameRouter.get("/:id", async (req, res, next) => {
    throw new Error("not implemented");
});


/**
 * Route zum Erstellen eines neuen Games
 */
gameRouter.post("/", async (req, res, next) => {
    try {
        const newGame = await GameService.createGame(req.body);
        res.status(201).send(newGame);
    } catch (err) {
        res.status(400);
        next(err);
    }
});

/**
 * Route zum Löschen eines Spiels anhand der ID
 */
gameRouter.delete("/:id", async (req, res, next) => {
    let id = "";
    if (req.params) {
        id = req.params.id;
    }

    try {
        await GameService.deleteGame(id);
        res.status(204).send();
    } catch (err) {
        res.status(404);
        next(err);
    }
});