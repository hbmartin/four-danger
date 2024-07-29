import { produce } from "immer"
import { GameState } from "./models"

export const placePiece = produce(
    (draft: GameState, index: number) => {
        if (!draft.board[index] && draft.currentMove.piece !== null) {
            draft.board[index] = draft.currentMove.piece;
            draft.currentMove.piece = null;
            draft.clock++;
        } else {
            console.log("The cell is already occupied or no piece is selected.");
        }
        if (checkForWin(draft.board)) {
            draft.winner = draft.currentMove.user;
        }
    }
)

export const handPiece = produce(
    (draft: GameState, piece: number) => {
        const oppName = findOppName(draft, draft.currentMove.user);
        if (oppName !== null) {
            draft.currentMove = { user: oppName, piece: piece };
            draft.clock++;
        } else {
            console.log("Opponent must be set before handing a piece.");
        }
    }
)

export const joinGame = produce(
    (draft: GameState, user: string) => {
        if (!draft.players[1]) {
            draft.players[1] = user;
            draft.clock++;
        } else {
            console.log("The game is already full.");
        }
    }
)

const shareCharacteristic = (arr: (number | null)[]): boolean => {
    if (!arr.every(num => num !== null)) { return false; }
    const sharedBits = arr.reduce((acc, num) => acc & num, 0xF);
    if (sharedBits > 0) { return true; }
    const sharedZeroBits = arr.reduce((acc, num) => acc & (~num & 0xF), 0xF);
    return sharedZeroBits > 0;
}

const GRID_SIZE = 4;

const checkForWin = (grid: (number | null)[]): boolean => {
    // Check rows
    for (let i = 0; i < GRID_SIZE; i++) {
        if (shareCharacteristic(grid.slice(i * GRID_SIZE, (i + 1) * GRID_SIZE))) {
            return true;
        }
    }

    // Check columns
    for (let i = 0; i < 4; i++) {
        if (shareCharacteristic([grid[i], grid[i + 4], grid[i + 8], grid[i + 12]])) {
            return true;
        }
    }

    // Check main diagonal
    if (shareCharacteristic([grid[0], grid[5], grid[10], grid[15]])) {
        return true;
    }

    // Check anti-diagonal
    if (shareCharacteristic([grid[3], grid[6], grid[9], grid[12]])) {
        return true;
    }

    return false;
}


export const findOppName = (game: GameState, myName: string): string | null => {
    return game.players.filter(n => n !== myName)[0];
}

const allPieces = Array.from({ length: 16 }, (_, i) => i);

export const getAvailablePieces = (board: (number | null)[]) => {
    return allPieces.filter(piece => !board.includes(piece));
}