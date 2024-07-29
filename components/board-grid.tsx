import { ComponentIcon } from "lucide-react"

export const BoardGrid = ({ grid, onGridClick }: { grid: (number | null)[], onGridClick: (index: number) => void }) => {
    return (
        <div className="grid grid-cols-4 gap-2 w-full border rounded-md p-2">
            {grid.map((piece, index) => (
                <div
                    key={index}
                    className="bg-background border rounded-md aspect-square flex items-center justify-center cursor-pointer"
                    onClick={() => onGridClick(index)}
                >
                    {piece && <ComponentIcon className="w-5 h-5 text-muted-foreground" />}
                </div>
            ))}
        </div>
    )
}