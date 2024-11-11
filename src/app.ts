import express ,{ Request, Response, NextFunction }from 'express';
import "express-async-errors";

import {playerRouter} from './routes/player'
import {gameRouter} from './routes/game'
import {gameInstanceRouter} from './routes/gameInstance'
import { teamRouter } from './routes/team';
import poiRouter from './routes/POI';


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

// Beispielroute
app.get('/', (req: Request, res: Response) => {
    res.send('CORS ist konfiguriert!');
  });  

//Routes
app.use("/api/player", playerRouter)
app.use("/api/game", gameRouter);
app.use("/api/gameInstance", gameInstanceRouter);
app.use("/api/team", teamRouter)
app.use("/api/POI", poiRouter); 

export default app;