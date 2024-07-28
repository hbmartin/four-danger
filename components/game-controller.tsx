"use client";

import { useMemo, useRef, useState } from "react"
import { BoardGrid } from "./board-grid";
import useSync from "@/lib/sync-hook";
import { HexagonIcon, OctagonIcon, SquareIcon, StarIcon, StripedGreenCircleHole, StripedGreenCircleSolid, StripedGreenSquareHole, TriangleIcon } from "./pieces";
import { PiecesGrid } from "./pieces-grid";
import { findOppName, getAvailablePieces } from "@/lib/game-logic";

interface GameControllerProps {
  id: string;
  name: string;
}

export const GameController: React.FC<GameControllerProps> = ({ id, name }) => {
  const { game, connected, placePiece, handPiece } = useSync(id)

  const handlePieceClick = (piece: number) => {
    if (game && game.currentMove.user == name && game.currentMove.piece === null) {
      handPiece(piece)
    } else {
      console.log("not your turn or you should place piece")
      // todo : shake message
    }
  }

  const handleGridClick = (index: number) => {
    if (game && game.currentMove.user == name && game.currentMove.piece !== null) {
      placePiece(index)
    } else {
      console.log("not your turn or no piece selected")
      // todo : shake message
    }
  }

  const message: string = useMemo(() => {
    if (!game) {
      return "Loading..."
    } else if (game.players[1] == null) {
      return "Invite your opponent to join by sharing this link..."
    } else if (game.currentMove.user == name) {
      if (game.currentMove.piece == null) {
        const oppName = findOppName(game, name)
        return `Tap a piece to hand it to ${oppName}.`
      } else {
        return `Tap the board to place your piece.`
      }
    } else {
      const oppName = findOppName(game, name)
      if (game.currentMove.piece == null) {
        return `Waiting for ${oppName} to choose a piece.`
      } else {
        return `Waiting for ${oppName} to place the piece.`
      }
    }
  }, [game?.currentMove, game?.players])

  const availablePieces: number[] = useMemo(() => {
    if (game) {
      return getAvailablePieces(game.board)
    } else {
      return [];
    }
  }, [game?.board])

  const showPieces = useMemo(() => {
    return game?.currentMove.user == name && game?.currentMove.piece == null;
  }, [game?.currentMove, name])

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto gap-6 p-4 md:p-6">
      <div className="flex flex-wrap gap-2 justify-center">
        {message}
      </div>
      {game?.board &&
        <BoardGrid grid={game?.board} onGridClick={handleGridClick} /> ||
        <div>Loading...</div>
      }
        <PiecesGrid availablePieces={availablePieces} handlePieceClick={handlePieceClick} visible={showPieces} />
    </div>
  )
}
