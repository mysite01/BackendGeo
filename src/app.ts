import express ,{ Request, Response, NextFunction }from 'express';
import "express-async-errors";

import {playerRouter} from './routes/player'
import {gameRouter} from './routes/game'
import { teamRouter } from './routes/team';
import {gameInstanceRouter} from './routes/gameInstance'
import { userRouter } from './routes/user';
import { poiListRouter } from './routes/POILists';
import cookieParser from "cookie-parser";
import { loginRouter } from './routes/login';
import { GameResource } from "src/Resources";
import { Types } from "mongoose";
import * as GameService from "./services/GameService";

import cors from 'cors';

const app = express();
app.use(cors());
app.use(cookieParser());
app.use(express.json());

app.use(cors());

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

app.use(async (req: Request, res: Response, next: NextFunction) => {
  console.log("beginning to insert game in database")
  try {
    const gameData: GameResource = {
      title: "Berlin Sehenswürdigkeiten",
      beschreibung: "Einige der bekanntesten Sehenswürdigkeiten in Berlin",
      POIs: [
        {
          type: "Point",
          coordinates: [13.404954, 52.520008], // Brandenburger Tor
        },
        {
          type: "Point",
          coordinates: [13.377704, 52.516275], // Reichstag
        },
      ],
      poilId: [new Types.ObjectId().toString()],
      maxTeam: 5,
      userId: new Types.ObjectId().toString(),
    };

    await GameService.createGame(gameData);

    res.status(201)
    console.log("game created")
  } catch (error) {
    console.log('Error creating game:', error);
    res.status(500)
  }
  next();
});



// Beispielroute
app.get('/', (req: Request, res: Response) => {
  res.send('CORS ist konfiguriert!');
});

//Routes
app.use("/api/player", playerRouter);
app.use("/api/game", gameRouter);
app.use("/api/gameInstance", gameInstanceRouter);
app.use("/api/team", teamRouter);
app.use("/api/user", userRouter);
app.use('/api/poilist', poiListRouter);
app.use("/api/login", loginRouter); 


export default app;