const game_id_characters = 'ABCDEFGHJKLMNPQRSTUVWXYZ123456789';

function generateRandomString(length: number = 6) {
    let result = '';
    const charactersLength = game_id_characters.length;
    for (let i = 0; i < length; i++) {
        result += game_id_characters.charAt(Math.floor(Math.random() * charactersLength));
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