import express ,{ Request, Response, NextFunction }from 'express';
import "express-async-errors";

import {playerRouter} from './routes/player'
import {gameRouter} from './routes/game'
<<<<<<< HEAD
import {gameInstanceRouter} from './routes/gameInstance'
=======
import { teamRouter } from './routes/team';
>>>>>>> 7f7f8a0092c3923996d422700dadaabed3c262ba

import cors from 'cors';
 
const app = express();
app.use(express.json());
//Routes
app.use("/api/player", playerRouter)
app.use("/api/game", gameRouter);
<<<<<<< HEAD
app.use("/api/gameInstance", gameInstanceRouter);

=======
app.use("/api/team", teamRouter)
>>>>>>> 7f7f8a0092c3923996d422700dadaabed3c262ba

export default app;