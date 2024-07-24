import { Button } from "@/components/ui/button"
import { GameState } from "@/lib/models"

export function GameList(games: GameState[]) {
    return (
      <div className="w-full space-y-4 px-4 md:px-0 md:max-w-md">
        {games.map((game, index) => (
          <Button key={index} className="w-full">
            <span className="flex-1 text-center">{game.id}</span>
          </Button>
        ))}
      </div>
    )
  }
