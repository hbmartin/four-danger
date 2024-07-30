"use client";

import { Button } from "@/components/ui/button";
import { useEffect, useMemo } from "react";
import { useGamesStore } from "@/lib/local-hook";
import { useRouter } from "next/navigation";
import { findOppName } from "@/lib/game-logic";

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
    const currentGames = useMemo(() => games.filter(game => game.winner === null && game.players[1] !== null), [games]);
    const wonGames = useMemo(() => games.filter(game => game.winner === name).length, [games]);

    return (
        <div className="w-full space-y-4 px-4 md:px-0 md:max-w-md">
            <h2 className="text-2xl font-bold text-center p-4">Hello {name}</h2>
            <Button key={-1} className="w-full" onClick={createAndNavToGame}>
                <span className="flex-1 text-center">New Game</span>
            </Button>
            {currentGames.map((game, index) => (
                <Button
                    key={index}
                    className="w-full"
                    variant="outline"
                    onClick={() => router.push(`/${game.id}`)}
                    aria-label={`Join game against opponent, ${game.clock} turns played`}
                >
                    <span className="flex-1 text-center">{findOppName(game, name) ? findOppName(game, name) : "(New)"} ({game.clock} turns)</span>
                </Button>
            ))}
            {wonGames > 0 && <h3 className="text-xl text-center p-4">🥳 You&rsquo;ve won {wonGames} game{wonGames > 1 ? "s" : ""} 🥳</h3>}
        </div>
    );

}
