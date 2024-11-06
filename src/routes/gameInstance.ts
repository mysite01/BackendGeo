import express from "express";
import { GameInstanceResource } from "src/Resources";
import * as GameInstanceService from "../services/GameInstanceService"


export const gameInstanceRouter = express.Router();

gameInstanceRouter.post("/", async (req, res, next) => {
    throw new Error("not implemented yet");
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