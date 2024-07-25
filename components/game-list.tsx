import { Button } from "@/components/ui/button"
import { GameState } from "@/lib/models"

interface GameListProps {
    name: string
}

export const GameList: React.FC<GameListProps> = ({ name }) => {
    return (
        <div className="w-full space-y-4 px-4 md:px-0 md:max-w-md">
            <h2 className="text-2xl font-bold text-center">Hello {name}</h2>
            <Button key={-1} className="w-full">
                <span className="flex-1 text-center">New Game</span>
            </Button>
            {games.map((game, index) => (
                <Button key={index} className="w-full">
                    <span className="flex-1 text-center">{game.id}</span>
                </Button>
            ))}
        </div>
    )
}
