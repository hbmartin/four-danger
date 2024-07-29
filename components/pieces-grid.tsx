import { Piece } from "./pieces";

interface PiecesGridProps {
    availablePieces: number[];
    handlePieceClick: (piece: number) => void;
    visible: boolean;
}

export const PiecesGrid: React.FC<PiecesGridProps> = ({ visible, handlePieceClick, availablePieces }) => {
    return (
        <div className={`grid grid-cols-4 w-full p-2 ${visible ? "opacity-100" : "opacity-0"} transition-opacity ease-in-out delay-150 duration-300`}>
            {availablePieces.map((piece, index) => (
                <div
                    key={index}
                    className="bg-background aspect-square flex items-center justify-center cursor-pointer"
                    onClick={() => handlePieceClick(index)}>
                    <Piece piece={piece} />
                </div>
            ))}
        </div>
    )
}