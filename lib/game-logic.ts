import { produce } from "immer"
import { GameState } from "./models"

export const placePiece = produce(
    (draft: GameState, index: number, piece: number) => {
        if (draft.board[index] === 0) {
            draft.board[index] = piece;
            draft.currentMove.piece = null;
            draft.clock++;
        } else {
            console.log("The cell is already occupied.");
        }
        // TODO: check win condition
    }
)

export const handPiece = produce(
    (draft: GameState, piece: number) => {
        if (draft.oppName !== null) {
            draft.currentMove = { user: draft.oppName, piece: piece };
            draft.clock++;
        } else {
            console.log("Opponent must be set before handing a piece.");
        }
    }
)