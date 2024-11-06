import express from "express";
import { GameInstanceResource } from "src/Resources";
import * as GameInstanceService from "../services/GameInstanceService"
import { createGameInstance } from "../services/GameInstanceService";


export const gameInstanceRouter = express.Router();

/**
 * Route zum Erstellen einer neuen GameInstance.
 */
gameInstanceRouter.post("/", async (req, res, next) => {
    try {
        const newGameInstance = await createGameInstance(req.body);
        res.status(201).send(newGameInstance);
    } catch (err) {
        res.status(400); 
        next(err);
    }
});

/**
 * Route zum Abrufen einer GameInstance anhand der ID.
 */
gameInstanceRouter.get("/:id", async (req, res, next) => {
    throw new Error("not implemented yet");
});

/**
 * Route zum Aktualisieren des Status einer GameInstance.
 */
gameInstanceRouter.patch("/:id/status", async (req, res, next) => {
    throw new Error("not implemented yet");
});

/**
 * Route zum Löschen einer GameInstance anhand der ID.
 */
gameInstanceRouter.delete("/:id", async (req, res, next) => {
    throw new Error("not implemented yet");
});

/**
 * Route zum Abrufen aller GameInstances eines bestimmten Spiels.
 */
gameInstanceRouter.get("/game/:gameId", async (req, res, next) => {
    throw new Error("not implemented yet");
});

export default gameInstanceRouter;