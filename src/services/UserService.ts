import mongoose, { Types } from 'mongoose';
import { User, IUser } from '../model/UserModel';
import { UserResource } from 'src/Resources';
import crypto from "crypto";
import nodemailer from "nodemailer";


/**
 * Erstellt einen neuen Benutzer
 */
export async function createUser(userResource: UserResource): Promise<UserResource> {
    try {
        const existingUser = await User.findOne({ name: userResource.name }).exec();
        if (existingUser) {
            throw new Error("Benutzername existiert bereits.");
        }

        // Verifizierungstoken generieren
        const verificationToken = crypto.randomBytes(32).toString("hex");

        const user = new User({
            name: userResource.name,
            password: userResource.password,
            createdAt: new Date(),
            email: userResource.email,
            verificationToken,
            emailConfirmed: false, // Noch nicht bestätigt
        });

        const savedUser = await user.save();

        // Test-Account von Ethereal erstellen
        const testAccount = await nodemailer.createTestAccount();
        const transporter = nodemailer.createTransport({
            host: "smtp.ethereal.email",
            port: 587,
            secure: false, // Kein SSL
            auth: {
                user: testAccount.user,
                pass: testAccount.pass,
            },
        });

        // Verifizieren der Verbindung (optional, nur zum Debugging)
        transporter.verify((error, success) => {
            if (error) {
                console.error("Fehler bei der SMTP-Verbindung:", error);
            } else {
                console.log("SMTP-Verbindung erfolgreich:", success);
            }
        });

        const verificationUrl = `${process.env.CLIENT_URL}/verify-email?token=${verificationToken}`;
        const mailResponse = await transporter.sendMail({
            from: testAccount.user, // Absenderadresse
            to: user.email, // Empfängeradresse
            subject: "Bestätige deine E-Mail-Adresse",
            html: `<p>Hallo ${user.name},</p>
                   <p>Bitte bestätige deine E-Mail-Adresse, indem du auf den folgenden Link klickst:</p>
                   <a href="${verificationUrl}">E-Mail bestätigen</a>
                   <p>Der Link ist 24 Stunden gültig.</p>`,
        });

        console.log("E-Mail gesendet:", mailResponse.messageId);
        console.log("Vorschau-URL:", nodemailer.getTestMessageUrl(mailResponse));

        return {
            id: savedUser._id.toString(),
            name: savedUser.name,
            createdAt: savedUser.createdAt,
        };
    } catch (error: any) {
        throw new Error(`Fehler beim Erstellen des Benutzers: ${error.message}`);
    }
}

/**
 * Löscht einen Benutzer anhand der ID
 */
export async function deleteUser(id: string): Promise<boolean> {
    const result = await User.findByIdAndDelete(id);
    return result !== null;  // Gibt `true` zurück, wenn ein Benutzer gelöscht wurde, `false` wenn kein Benutzer gefunden wurde
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

/**
 * 
 * @param name 
 * @returns 
 */
export async function getUserByName(name: string): Promise<UserResource> {
    try {
        const user = await User.findOne({ name }).exec();

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


/**
 * Verifiziert die E-Mail-Adresse eines Benutzers anhand des Tokens.
 */
export async function verifyEmail(token: string): Promise<boolean> {
    try {
        // Benutzer anhand des Tokens finden
        const user = await User.findOne({ verificationToken: token }).exec();

        if (!user) {
            throw new Error("Ungültiger Verifizierungstoken.");
        }

        // Ablaufdatum des Tokens prüfen (falls vorhanden)
        if (user.verificationTokenExpiration && user.verificationTokenExpiration < new Date()) {
            throw new Error("Verifizierungstoken ist abgelaufen.");
        }

        // Benutzer als verifiziert markieren
        user.emailConfirmed = true;
        user.verificationToken = null; // Token entfernen
        user.verificationTokenExpiration = undefined; // Ablaufdatum entfernen
        await user.save();

        return true;
    } catch (error: any) {
        console.error("Fehler bei der E-Mail-Verifizierung:", error.message);
        throw new Error(`Fehler bei der E-Mail-Verifizierung: ${error.message}`);
    }
}
