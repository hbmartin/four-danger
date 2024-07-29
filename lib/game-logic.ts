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
        // TODO: check win condition
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

export const findOppName = (game: GameState, myName: string): string | null => {
    return game.players.filter(n => n !== myName)[0];
}

const allPieces = Array.from({ length: 16 }, (_, i) => i);

export const getAvailablePieces = (board: (number | null)[]) => {
    console.log("allPieces", allPieces);
    console.log("board", board);
    return allPieces.filter(piece => !board.includes(piece));
}