import express ,{ Request, Response, NextFunction }from 'express';
import "express-async-errors";

import {playerRouter} from './routes/player'
import {gameRouter} from './routes/game'
import { teamRouter } from './routes/team';

import cors from 'cors';
 
const app = express();
app.use(express.json());
//Routes
app.use("/api/player", playerRouter)
app.use("/api/game", gameRouter);
app.use("/api/team", teamRouter)

export default app;