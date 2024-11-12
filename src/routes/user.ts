import express, { Request, Response } from 'express';
import { createUser, getUserById, deleteUser } from '../services/UserService';

const userRouter = express.Router();

userRouter.post('/', async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await createUser(req.body);
        res.status(201).json(user);
        return;  // Fügt ein explizites `return` hinzu
    } catch (error) {
        res.status(500).json({ message: 'Fehler beim Erstellen des Benutzers' });
        return;  // Fügt ein explizites `return` hinzu
    }
});

userRouter.get('/:id', async (req: Request, res: Response): Promise<void> => {
    try {
        const user = await getUserById(req.params.id);
        if (!user) {
            res.status(404).json({ message: 'Benutzer nicht gefunden' });
            return;  // Fügt ein explizites `return` hinzu
        }
        res.status(200).json(user);
        return;  // Fügt ein explizites `return` hinzu
    } catch (error) {
        res.status(500).json({ message: 'Fehler beim Abrufen des Benutzers' });
        return;  // Fügt ein explizites `return` hinzu
    }
});

userRouter.delete('/:id', async (req: Request, res: Response): Promise<void> => {
    try {
        await deleteUser(req.params.id);
        res.status(204).send();
    } catch (error) {
        const err = error as Error;  // Cast to `Error`
        if (err.message === "Benutzer nicht gefunden") {
            res.status(404).json({ message: err.message });
        } else {
            res.status(500).json({ message: 'Fehler beim Löschen des Benutzers' });
        }
    }
});
