
export function generateQAcode(): string {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let codeInvite = '';
    for (let i = 0; i < 6; i++) {
        codeInvite += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return codeInvite;
}
