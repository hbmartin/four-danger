"use client";

import { useRef, useState } from "react"
import { GameGrid } from "./game-grid";
import useSync from "@/lib/sync-hook";

const me = "HM";
const you = "GB";

interface BoardAndPiecesProps {
  id: string;
}

export const BoardAndPieces: React.FC<BoardAndPiecesProps> = ({ id }) => {
  const { game, connected, placePiece, handPiece } = useSync(id)
  const [selectedIcon, setSelectedIcon] = useState<string | null>(null)
  const [move, setMove] = useState({user: "HM", piece: null})
  const handleIconClick = (icon: string) => {
    if (icon != selectedIcon) {
      setSelectedIcon(icon)
    } else {
      setSelectedIcon(null)
    }
  }
  const handleGridClick = (index: number) => {
    if (selectedIcon) {
      // const updatedGrid = [...grid]
      // updatedGrid[index] = selectedIcon
      // setGrid(updatedGrid)
      setSelectedIcon(null)
    }
  }
  const message = () => {
    if (move.user == me) {
      if (move.piece == null) {
        return `Tap a piece to hand it to ${you}.`
      } else {
        return `Tap the board to place your piece.`
      }
    } else {
      if (move.piece == null) {
        return `Waiting for ${you} to choose a piece.`
      } else {
        return `Waiting for ${you} to place the piece.`
      }
    }
  }
  const showBoard = () => {
    return move.user == me && move.piece == null;
  }
  return (
    <div className="flex flex-col items-center w-full max-w-md mx-auto gap-6 p-4 md:p-6">
      <div className="flex flex-wrap gap-2 justify-center">
        {message()}
      </div>
      <div className="flex flex-wrap gap-2 justify-center">
        {connected}
      </div>
      {game?.board &&
      <GameGrid grid={game?.board} onGridClick={handleGridClick} /> ||
      <div>Loading...</div>
      }
      <div className={`flex flex-wrap gap-2 justify-center ${ showBoard() ? "opacity-100" : "opacity-0"} transition-opacity ease-in-out delay-150 duration-300`}>
        <div
          className={`bg-muted rounded-full w-24 h-24 flex items-center justify-center cursor-pointer ${
            selectedIcon === "Circle" ? "ring-2 ring-primary" : ""
          }`}
          onClick={() => handleIconClick("Circle")}
        >
          <StripedGreenCircleHole className="w-24 h-24 text-muted-foreground" />
        </div>
        <div
          className={`bg-muted rounded-full w-8 h-8 flex items-center justify-center cursor-pointer ${
            selectedIcon === "Square" ? "ring-2 ring-primary" : ""
          }`}
          onClick={() => handleIconClick("Square")}
        >
          <SquareIcon className="w-5 h-5 text-muted-foreground" />
        </div>
        <div
          className={`bg-muted rounded-full w-8 h-8 flex items-center justify-center cursor-pointer ${
            selectedIcon === "Triangle" ? "ring-2 ring-primary" : ""
          }`}
          onClick={() => handleIconClick("Triangle")}
        >
          <TriangleIcon className="w-5 h-5 text-muted-foreground" />
        </div>
        <div
          className={`bg-muted rounded-full w-8 h-8 flex items-center justify-center cursor-pointer ${
            selectedIcon === "Star" ? "ring-2 ring-primary" : ""
          }`}
          onClick={() => handleIconClick("Star")}
        >
          <StarIcon className="w-5 h-5 text-muted-foreground" />
        </div>
        <div
          className={`bg-muted rounded-full w-8 h-8 flex items-center justify-center cursor-pointer ${
            selectedIcon === "Heart" ? "ring-2 ring-primary" : ""
          }`}
          onClick={() => handleIconClick("Heart")}
        >
          <StripedGreenSquareHole className="w-5 h-5 text-muted-foreground" />
        </div>
        <div
          className={`bg-muted rounded-full w-8 h-8 flex items-center justify-center cursor-pointer ${
            selectedIcon === "Hexagon" ? "ring-2 ring-primary" : ""
          }`}
          onClick={() => handleIconClick("Hexagon")}
        >
          <HexagonIcon className="w-5 h-5 text-muted-foreground" />
        </div>
        <div
          className={`bg-muted rounded-full w-8 h-8 flex items-center justify-center cursor-pointer ${
            selectedIcon === "Octagon" ? "ring-2 ring-primary" : ""
          }`}
          onClick={() => handleIconClick("Octagon")}
        >
          <OctagonIcon className="w-5 h-5 text-muted-foreground" />
        </div>
        <div
          className={`bg-muted rounded-full w-8 h-8 flex items-center justify-center cursor-pointer ${
            selectedIcon === "Diamond" ? "ring-2 ring-primary" : ""
          }`}
          onClick={() => handleIconClick("Diamond")}
        >
          <StripedGreenCircleSolid className="w-5 h-5 text-muted-foreground" />
        </div>
      </div>
    </div>
  )
}

function StripedGreenCircleHole(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
        <pattern id="stripes" patternUnits="userSpaceOnUse" width="10" height="10">
          <circle cx="5" cy="5" r="4" fill="#6BC78A" stroke="none" />
        </pattern>
        <circle cx="50" cy="50" r="30" fill="none" stroke="url(#stripes)" strokeWidth="20" />

    </svg>
  )
}


function ComponentIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="blue"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M5.5 8.5 9 12l-3.5 3.5L2 12l3.5-3.5Z" />
      <path d="m12 2 3.5 3.5L12 9 8.5 5.5 12 2Z" />
      <path d="M18.5 8.5 22 12l-3.5 3.5L15 12l3.5-3.5Z" />
      <path d="m12 15 3.5 3.5L12 22l-3.5-3.5L12 15Z" />
    </svg>
  )
}


function StripedGreenCircleSolid(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
        <pattern id="stripes" patternUnits="userSpaceOnUse" width="10" height="10">
          <polygon points="0,0 2,5 0,10 5,8 10,10 8,5 10,0 5,2" fill="#6BC78A" stroke="none" />
        </pattern>
        <circle cx="50" cy="50" r="10" fill="none" stroke="url(#stripes)" strokeWidth="50" />

    </svg>
  )
}


function StripedGreenSquareHole(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="100"
      height="100"
      viewBox="0 0 100 100"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect x="10" y="10" width="80" height="80" fill="#996BC7" />
      <circle cx="50" cy="50" r="20" fill="white" />
      <pattern id="stripes" patternUnits="userSpaceOnUse" width="10" height="10">
          <circle cx="5" cy="5" r="4" fill="#6BC78A" stroke="none" />
      </pattern>
      <rect x="10" y="10" width="80" height="80" fill="url(#stripes)" />
      </svg>
  )
}


function HexagonIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z" />
    </svg>
  )
}


function OctagonIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="7.86 2 16.14 2 22 7.86 22 16.14 16.14 22 7.86 22 2 16.14 2 7.86 7.86 2" />
    </svg>
  )
}


function SquareIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <rect width="18" height="18" x="3" y="3" rx="2" />
    </svg>
  )
}


function StarIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    </svg>
  )
}


function TriangleIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M13.73 4a2 2 0 0 0-3.46 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    </svg>
  )
}


function XIcon(props: any) {
  return (
    <svg
      {...props}
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M18 6 6 18" />
      <path d="m6 6 12 12" />
    </svg>
  )
}
