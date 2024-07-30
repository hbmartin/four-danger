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
    board: (number | null)[];
    currentMove: Move;
    players: [string, string | null];
    winner: string | null;
    clock: number;
}

export interface CurrentGame {
    game: GameState | null;
    setGame: ((game: GameState) => void);
    placePiece: ((index: number) => void);
    handPiece: ((piece: number) => void);
    joinGame: ((user: string) => void);
}

export const newGame = (myName: string): GameState => ({
    id: generateRandomString(),
    board: Array(16).fill(null),
    currentMove: {
        user: myName,
        piece: null,
    },
    players: [myName, null],
    winner: null,
    clock: 0,
});