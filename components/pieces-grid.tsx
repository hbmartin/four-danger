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
                className={`bg-muted rounded-full w-24 h-24 flex items-center justify-center cursor-pointer`}
                onClick={() => handlePieceClick(1)}
            >
                <Pieces.StripedGreenCircleHole className="w-24 h-24 text-muted-foreground" />
            </div>
            <div
                className={`bg-muted rounded-full w-8 h-8 flex items-center justify-center cursor-pointer`}
                onClick={() => handlePieceClick(2)}
            >
                <Pieces.SquareIcon className="w-5 h-5 text-muted-foreground" />
            </div>
            <div
                className={`bg-muted rounded-full w-8 h-8 flex items-center justify-center cursor-pointer`}
                onClick={() => handlePieceClick(3)}
            >
                <Pieces.TriangleIcon className="w-5 h-5 text-muted-foreground" />
            </div>
            <div
                className={`bg-muted rounded-full w-8 h-8 flex items-center justify-center cursor-pointer`}
                onClick={() => handlePieceClick(4)}
            >
                <Pieces.StarIcon className="w-5 h-5 text-muted-foreground" />
            </div>
            <div
                className={`bg-muted rounded-full w-8 h-8 flex items-center justify-center cursor-pointer`}
                onClick={() => handlePieceClick(5)}
            >
                <Pieces.StripedGreenSquareHole className="w-5 h-5 text-muted-foreground" />
            </div>
            <div
                className={`bg-muted rounded-full w-8 h-8 flex items-center justify-center cursor-pointer`}
                onClick={() => handlePieceClick(6)}
            >
                <Pieces.HexagonIcon className="w-5 h-5 text-muted-foreground" />
            </div>
            <div
                className={`bg-muted rounded-full w-8 h-8 flex items-center justify-center cursor-pointer`}
                onClick={() => handlePieceClick(7)}
            >
                <Pieces.OctagonIcon className="w-5 h-5 text-muted-foreground" />
            </div>
            <div
                className={`bg-muted rounded-full w-8 h-8 flex items-center justify-center cursor-pointer`}
                onClick={() => handlePieceClick(8)}
            >
                <Pieces.StripedGreenCircleSolid className="w-5 h-5 text-muted-foreground" />
            </div>
        </div>
    )
}