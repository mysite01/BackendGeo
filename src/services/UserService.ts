import mongoose, { Types } from 'mongoose';
import { User, IUser } from '../model/UserModel';
import { UserResource } from 'src/Resources';

/**
 * Erstellt einen neuen Benutzer
 */
export async function createUser(userResource: UserResource): Promise<UserResource> {
    try {
        const user = new User({
            name: userResource.name,
            password: userResource.password,
            createdAt: new Date()
        });

        const savedUser = await user.save() as IUser & { _id: Types.ObjectId }; 

        return {
            id: savedUser._id.toString(), 
            name: savedUser.name,
            password: savedUser.password,
            createdAt: savedUser.createdAt
        };
    } catch (error) {
        throw new Error("Fehler beim Erstellen des Benutzers");
    }
}

/**
 * Löscht einen Benutzer anhand der ID
 */
export async function deleteUser(id: string): Promise<void> {
    const query = await User.findByIdAndDelete(id).exec();
    if (!query) {
        throw new Error("Der Benutzer konnte nicht gelöscht werden!");
    }
}

/**
 * Holt alle Benutzer anhand der ID
 */
export async function getUserById(userId: string): Promise<UserResource> {
    try {
        const user = await User.findById(userId).exec();

        if (!user) {
            throw new Error("Benutzer nicht gefunden");
        }

        return {
            id: (user._id as Types.ObjectId).toString(), // _id explizit als ObjectId behandeln und in einen String umwandeln
            name: user.name,
            password: user.password,
            createdAt: user.createdAt
        };
    } catch (error) {
        throw new Error("Fehler beim Abrufen des Benutzers");
    }
}
