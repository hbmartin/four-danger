"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useMemo } from "react";
import { useGamesStore } from "@/lib/local-hook";
import { useRouter } from "next/navigation";

interface GameListProps {
    name: string
}

export const GameList: React.FC<GameListProps> = ({ name }) => {
    const { games, loadGames, createGame } = useGamesStore();
    const router = useRouter()

    useEffect(() => {
        loadGames();
    }, []);

    const createAndNavToGame = () => {
        createGame(name).then(gameId => router.push(`/${gameId}`));
    }
    const currentGames = useMemo(() => games.filter(game => game.winner === null), [games]);

    return (
        <div className="w-full space-y-4 px-4 md:px-0 md:max-w-md">
            <h2 className="text-2xl font-bold text-center p-4">Hello {name}</h2>
            <Button key={-1} className="w-full" onClick={createAndNavToGame}>
                <span className="flex-1 text-center">New Game</span>
            </Button>
            {games.map((game, index) => (
                <Button
                    key={index}
                    className="w-full"
                    variant="outline"
                    onClick={() => router.push(`/${game.id}`)}
                    aria-label={`Join game against opponent, ${game.clock} turns played`}
                >
                    <span className="flex-1 text-center">{game.id} ({game.clock} turns)</span>
                </Button>
            ))}
        </div>
    );

}
