"use client";

import { useEffect, useMemo, useRef, useState } from "react"
import { BoardGrid } from "./board-grid";
import useSync from "@/lib/sync-hook";
import { PiecesGrid } from "./pieces-grid";
import { findOppName, getAvailablePieces } from "@/lib/game-logic";
import { ChosenPiece } from "./chosen-piece";

interface GameControllerProps {
  id: string;
  name: string;
}

export const GameController: React.FC<GameControllerProps> = ({ id, name }) => {
  const { game, connected, placePiece, handPiece, joinGame } = useSync(id)

  const handlePieceClick = (piece: number) => {
    console.log("handlePieceClick", piece)
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

  useEffect(() => {
    if (game && game.players[0] != name && game.players[1] == null) {
      joinGame(name)
    }
  }, [game?.players[1]])

  const message: string = useMemo(() => {
    if (!game) {
      return "Loading..."
    } else if (game.players[1] == null) {
      return "Invite your opponent to join by sharing this link..."
    } else if (game.winner !== null) {
      if (game.winner == name) {
        return "🎉 You won! 🎉"
      } else {
        return `💀 ${game.winner} won! 💀`
      }
    } else if (game.currentMove.user == name) {
      if (game.currentMove.piece == null) {
        const oppName = findOppName(game, name)
        return `Tap a piece to hand it to ${oppName}.`
      } else {
        return `Tap the board to place your piece.`
      }
    } else {
      const oppName = game.currentMove.user
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
    return game?.currentMove.user == name && game?.currentMove.piece == null && game?.players[1] != null && game?.winner == null;
  }, [game?.currentMove.user, game?.currentMove.piece, game?.players[1], name, game?.winner])


  const showChosenPiece = useMemo(() => {
    return game?.currentMove.user == name && game?.currentMove.piece != null && game?.players[1] != null && game?.winner == null;
  }, [game?.currentMove.user, game?.currentMove.piece, game?.players[1], name, game?.winner])

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto gap-6 p-4 md:p-6">
      <div className="fixed top-4 right-4 bg-muted rounded-full w-8 h-8 flex items-center justify-center z-10">
        <span>{connected ? "🟢" : "🔴"}</span>
      </div>
      <div className="flex flex-wrap gap-2 justify-center">
        {message}
      </div>
      {game?.players[1] &&
        <BoardGrid grid={game?.board} onGridClick={handleGridClick} /> ||
        <div>Waiting for new player to join... (TODO: share sheet)</div>
      }
      <ChosenPiece piece={game?.currentMove.piece} visible={showChosenPiece} />
      <PiecesGrid availablePieces={availablePieces} handlePieceClick={handlePieceClick} visible={showPieces} />
      </div>
  )
}
