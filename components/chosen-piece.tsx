import { Piece } from "./pieces";

interface PiecesGridProps {
    piece: number | null | undefined;
    visible: boolean;
}

export const ChosenPiece: React.FC<PiecesGridProps> = ({ visible, piece }) => {
    return (
        <div className={`w-full p-2 ${visible ? "opacity-100" : "opacity-0"} transition-opacity ${visible ? "h-min" : "h-0"} transition-[height] ease-in-out delay-150 duration-300`}>
            {piece !== null && piece !== undefined && visible &&
                <div className="bg-background h-min flex items-center justify-center">
                    <Piece piece={piece} />
                </div>
            }
        </div>
    )
}