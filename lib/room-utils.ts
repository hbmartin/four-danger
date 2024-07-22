export function generateString(length: number = 5) {
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZ123456789';

    let result = '';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}
