import express from 'express';
import "express-async-errors";

import {playerRouter} from './routes/player'
import {gameRouter} from './routes/game'


const app = express();

app.use(express.json());

//Routes
app.use("/api/player", playerRouter)
app.use("/api/game", gameRouter);


export default app;