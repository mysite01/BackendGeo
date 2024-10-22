import { Game, IGame } from '../model/GameModel';

/**
 * Erstellt ein neues Game 
 */
export async function createGame(gameData: IGame): Promise<IGame> {
    throw new Error("not implemented yet");
}

/**
 * Findet ein Game anhand der ID 
 */
export async function getGameById(id: string): Promise<IGame | null> {
    throw new Error("not implemented yet");
}

/**
 * Löscht ein Game anhand der ID 
 */
export async function deleteGame(id: string): Promise<void> {
    throw new Error("not implemented yet");
}

