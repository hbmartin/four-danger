import * as Pieces from "./pieces"

interface PiecesGridProps {
    availablePieces: number[];
    handlePieceClick: (piece: number) => void;
    visible: boolean;
  }

export const PiecesGrid: React.FC<PiecesGridProps> = ({ visible, handlePieceClick, availablePieces }) => {
    return (
        <div className={`flex flex-wrap gap-2 justify-center ${visible ? "opacity-100" : "opacity-0"} transition-opacity ease-in-out delay-150 duration-300`}>
            <div
                className={`bg-muted rounded-full w-24 h-24 flex items-center justify-center cursor-pointer ${selectedIcon === "Circle" ? "ring-2 ring-primary" : ""
                    }`}
                onClick={() => handlePieceClick("Circle")}
            >
                <Pieces.StripedGreenCircleHole className="w-24 h-24 text-muted-foreground" />
            </div>
            <div
                className={`bg-muted rounded-full w-8 h-8 flex items-center justify-center cursor-pointer ${selectedIcon === "Square" ? "ring-2 ring-primary" : ""
                    }`}
                onClick={() => handlePieceClick("Square")}
            >
                <Pieces.SquareIcon className="w-5 h-5 text-muted-foreground" />
            </div>
            <div
                className={`bg-muted rounded-full w-8 h-8 flex items-center justify-center cursor-pointer ${selectedIcon === "Triangle" ? "ring-2 ring-primary" : ""
                    }`}
                onClick={() => handlePieceClick("Triangle")}
            >
                <Pieces.TriangleIcon className="w-5 h-5 text-muted-foreground" />
            </div>
            <div
                className={`bg-muted rounded-full w-8 h-8 flex items-center justify-center cursor-pointer ${selectedIcon === "Star" ? "ring-2 ring-primary" : ""
                    }`}
                onClick={() => handlePieceClick("Star")}
            >
                <Pieces.StarIcon className="w-5 h-5 text-muted-foreground" />
            </div>
            <div
                className={`bg-muted rounded-full w-8 h-8 flex items-center justify-center cursor-pointer ${selectedIcon === "Heart" ? "ring-2 ring-primary" : ""
                    }`}
                onClick={() => handlePieceClick("Heart")}
            >
                <Pieces.StripedGreenSquareHole className="w-5 h-5 text-muted-foreground" />
            </div>
            <div
                className={`bg-muted rounded-full w-8 h-8 flex items-center justify-center cursor-pointer ${selectedIcon === "Hexagon" ? "ring-2 ring-primary" : ""
                    }`}
                onClick={() => handlePieceClick("Hexagon")}
            >
                <Pieces.HexagonIcon className="w-5 h-5 text-muted-foreground" />
            </div>
            <div
                className={`bg-muted rounded-full w-8 h-8 flex items-center justify-center cursor-pointer ${selectedIcon === "Octagon" ? "ring-2 ring-primary" : ""
                    }`}
                onClick={() => handlePieceClick("Octagon")}
            >
                <Pieces.OctagonIcon className="w-5 h-5 text-muted-foreground" />
            </div>
            <div
                className={`bg-muted rounded-full w-8 h-8 flex items-center justify-center cursor-pointer ${selectedIcon === "Diamond" ? "ring-2 ring-primary" : ""
                    }`}
                onClick={() => handlePieceClick("Diamond")}
            >
                <Pieces.StripedGreenCircleSolid className="w-5 h-5 text-muted-foreground" />
            </div>
        </div>
    )
}