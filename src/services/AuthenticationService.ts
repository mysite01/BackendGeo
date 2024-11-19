import { User } from "../model/UserModel";

/**
 * Prüft Name und Passwort, bei Erfolg wird die `id` zurückgegeben.
 * Falls kein Benutzer mit dem gegebenen Namen existiert oder das Passwort falsch ist,
 * wird `false` zurückgegeben. Es werden keine weiteren Hinweise aus Sicherheitsgründen gegeben.
 */
export async function login(name: string, password: string): Promise<{ id: string } | false> {
    const user = await User.findOne({ name }).exec();

    if (user && await user.isCorrectPassword(password)) {
        return {
            id: user._id.toString(),
        };
    }
    return false;
}

/**
 * Registriert einen neuen Benutzer.
 * Überprüft, ob der Name bereits existiert, und speichert den Benutzer, falls nicht.
 */
export async function register(name: string, password: string): Promise<{ id: string }> {
    const existingUser = await User.findOne({ name }).exec();

    if (existingUser) {
        throw new Error("Ein Benutzer mit diesem Namen existiert bereits.");
    }

    const newUser = new User({
        name,
        password,
        createdAt: new Date(),
    });

    const savedUser = await newUser.save();

    return {
        id: savedUser._id.toString(),
    };
}
