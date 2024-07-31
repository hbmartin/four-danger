"use client";

import { useEffect, useMemo } from "react"
import { BoardGrid } from "./board-grid";
import useSync from "@/lib/sync-hook";
import { PiecesGrid } from "./pieces-grid";
import { findOppName, getAvailablePieces } from "@/lib/game-logic";
import { ChosenPiece } from "./chosen-piece";
import { Tooltip } from "./tooltip";
import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { useGamesStore } from "@/lib/local-hook";
import { ShareBubble } from "./share-bubble";

interface GameControllerProps {
  id: string;
  name: string;
}

export const GameController: React.FC<GameControllerProps> = ({ id, name }) => {
  const { createGame } = useGamesStore();
  const { game, connected, placePiece, handPiece, joinGame, getNewGame, broadcastNewGame } = useSync(id)
  const router = useRouter()

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
      return `Send this link to start!<br />Or use code: <b>${id}</b>`
    } else if (game.winner !== null) {
      if (game.winner == name) {
        return "🎉 You won! 🎉"
      } else {
        return `💀 ${game.winner} won! 💀`
      }
    } else if (game.currentMove.user == name) {
      if (game.currentMove.piece == null) {
        const oppName = findOppName(game, name)
        return `Tap a piece to hand it to ${oppName}`
      } else {
        return `Tap the board to place your piece`
      }
    } else {
      const oppName = game.currentMove.user
      if (game.currentMove.piece == null) {
        return `Waiting for ${oppName}<br />to choose a piece`
      } else {
        return `Waiting for ${oppName}<br />to place the piece`
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

  const showTooltip = useMemo(() => {
    return game?.players[1] == null;
  }, [game?.players[1]])

  const createOrGetNewGameAndNav = () => {
    const newGameId: null | string = getNewGame()
    if (newGameId) {
      router.push(`/${newGameId}`)
    } else {
      createGame(name)
      .then(gameId => {
        broadcastNewGame(gameId)
        router.push(`/${gameId}`)
      });
    }
  }

  const canBrowserShareData = useMemo(() => {
    if (!navigator.share || !navigator.canShare) {
      return false;
    }
  
    return navigator.canShare({"title": "Let's play!", "url": window.location.href});
  }, [navigator.canShare, navigator.share]);

  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto gap-6 p-4 md:p-6">
      <div className="h-20 fixed top-0 left-0 right-0 flex flex-row gap-4 w-full p-4 bg-background border-[0] border-b border-solid border-inherit">
        <div className="cursor-pointer" onClick={() => router.push("/")}><ArrowLeft /></div>
        <div className="flex-grow text-center px-4" dangerouslySetInnerHTML={{ __html: message }} />
        <div>{connected ? "🟢" : "🔴"}</div>
      </div>
      {game?.board &&
        <BoardGrid grid={game.board} onGridClick={handleGridClick} />
      }
      {game?.winner && <Button className="w-full" onClick={createOrGetNewGameAndNav}>
        <span className="flex-1 text-center">New Game</span>
      </Button>}
      <ChosenPiece piece={game?.currentMove.piece} visible={showChosenPiece} />
      <PiecesGrid availablePieces={showPieces ? availablePieces : []} handlePieceClick={handlePieceClick} visible={showPieces} />
      {showTooltip && canBrowserShareData && <ShareBubble />}
      {showTooltip && !canBrowserShareData && <Tooltip message="Share this link to invite a friend to play." />}
    </div>
  )
}
