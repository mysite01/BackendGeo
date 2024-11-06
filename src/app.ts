import express ,{ Request, Response, NextFunction }from 'express';
import "express-async-errors";

import {playerRouter} from './routes/player'
import {gameRouter} from './routes/game'
import { teamRouter } from './routes/team';

import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

// Benutzerdefinierte Middleware zur Konfiguration der CORS-Header
app.use((req: Request, res: Response, next: NextFunction) => {
    // Setze die CORS-Header
    res.set("Access-Control-Allow-Origin", "*");
    res.set(
      "Access-Control-Allow-Headers",
      "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.set("Access-Control-Expose-Headers", "Authorization");
    res.set("Access-Control-Allow-Credentials", "true");
    next();
  });
  

//Routes
app.use("/api/player", playerRouter)
app.use("/api/game", gameRouter);
app.use("/api/team", teamRouter)

export default app;