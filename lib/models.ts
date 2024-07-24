import { generateRandomString } from "./room-utils";

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
    handPiece: (piece: number) => void;
    placePiece: (index: number, piece: number) => void;
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
    placePiece: function (index: number, piece: number) {
        if (this.board[index] === 0) {
            this.board[index] = piece;
            this.currentMove.piece = null;
            this.clock++;
        } else {
            console.log("The cell is already occupied.");
        }
    },
    handPiece: function (piece: number, ) {
        if (this.oppName !== null) {
            this.currentMove = {user: this.oppName, piece: piece};
            this.clock++;
        } else {
            console.log("Opponent must be set before handing a piece.");
        }
    }
});