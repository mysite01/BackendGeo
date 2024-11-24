import dotenv from 'dotenv';
dotenv.config(); // .env-Datei laden

import http from "http";
import mongoose from 'mongoose';
import app from "./app";

import { GameResource } from "src/Resources";
import { Types } from "mongoose";
import * as GameService from "./services/GameService";


async function createExampleGame() {
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
    await GameService.createGame(gameData)
}

async function setup() {
   // let mongodURI = process.env.DB_CONNECTION_STRING;
   console.log("USE_SSL:", process.env.USE_SSL);
   console.log("HTTP_PORT:", process.env.HTTP_PORT);
   console.log("JWT_SECRET:", process.env.JWT_SECRET);
   //console.log("DB_CONNECTION_STRING:", process.env.DB_CONNECTION_STRING);
   
      let mongodURI = "memory"
    if (!mongodURI) {
        console.error(`Cannot start`);
        process.exit(1);
    }

    if (mongodURI === "memory") {
        console.info("Start MongoMemoryServer");
        const MMS = await import('mongodb-memory-server');
        const mongo = await MMS.MongoMemoryServer.create();
        mongodURI = mongo.getUri();
    }

    console.info(`Connecting to MongoDB at ${mongodURI}`);
    await mongoose.connect(mongodURI);

    await createExampleGame(); 

    const httpPort = process.env.HTTP_PORT ? parseInt(process.env.HTTP_PORT) : 3443;
    const httpServer = http.createServer(app);

    function startHttpServer() {
        httpServer.listen(httpPort, () => {
            console.info(`Listening for HTTP at http://localhost:${httpPort}`);
        });
    }

    httpServer.on('error', (err) => {
        if (err instanceof Error && (err as any).code === 'EADDRINUSE') {
            console.error('Address in use, retrying...');
            setTimeout(() => {
                httpServer.close();
                startHttpServer();
            }, 1000);
        } else {
            console.error(`Server error: ${err.message}`);
        }
    });

    startHttpServer();

    process.on('SIGINT', () => {
        console.info('Received SIGINT. Shutting down gracefully...');
        httpServer.close(() => {
            console.info('Server closed.');
            process.exit(0);
        });
    });
}

setup();