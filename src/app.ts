import express from 'express';
import "express-async-errors";

import {playerRouter} from './routes/player'

const app = express();
app.use(express.json());
//Routes
app.use("/api/player", playerRouter)

export default app;