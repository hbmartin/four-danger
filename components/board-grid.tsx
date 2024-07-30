import { ComponentIcon } from "lucide-react"
import { Piece } from "./pieces"

export const BoardGrid = ({ grid, onGridClick }: { grid: (number | null)[], onGridClick: (index: number) => void }) => {
    return (
        <div className="grid grid-cols-4 gap-2 w-full border rounded-md p-2 mt-20">
            {grid.map((piece, index) => (
                <div
                    key={index}
                    className="bg-background border rounded-md aspect-square cursor-pointer"
                    onClick={() => onGridClick(index)}
                >
                    {(piece != null) && <Piece piece={piece} />}
                </div>
            ))}
        </div>
    )
}