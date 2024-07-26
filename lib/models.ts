function generateRandomString(length: number = 6) {
    const characters ='ABCDEFGHIJKLMNPQRSTUVWXYZ123456789';

    let result = '';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

interface Move {
    user: string;
    piece: number | null;
}

export interface GameState {
    id: string;
    board: number[];
    currentMove: Move;
    oppName: string | null;
    winner: string | null;
    clock: number;
}

export const newGame = (myName: string): GameState => ({
    id: generateRandomString(),
    board: Array(16).fill(0),
    currentMove: {
        user: myName,
        piece: null,
    },
    winner: null,
    clock: 0,
    oppName: null,
});