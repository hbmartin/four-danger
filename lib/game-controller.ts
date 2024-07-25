// For each game, we need to keep track of the state of the game, the moves that have been made, and the players that are in the game.

import { GameState, newGame } from "@/lib/models";
import { addGameToDB, fetchGamesFromDB, updateGameInDB } from "./database";
import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL = 'https://kdmheuzdtaqxkoczxocf.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImtkbWhldXpkdGFxeGtvY3p4b2NmIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjEzNDc5OTEsImV4cCI6MjAzNjkyMzk5MX0.0L0eEUF6PUSE1Pj6nhGQ1EP2kUXY2Q1-5jLkGlFIT5M';

const supabase = createClient(SUPABASE_URL, SUPABASE_KEY)

class GameController {
    private games: Map<string, GameState> = new Map();
    private currentGame: GameState | null = null;

    private channel = supabase.channel('room_01')
        .on(
            'broadcast',
            { event: 'test' },
            (payload) => console.log('payload', payload)
        )
        .subscribe(async (status) => {
            console.log('status', status);
            if (status !== "SUBSCRIBED") return;
        });

    private brodcast = () => {
        const result = this.channel.send({
            type: 'broadcast',
            event: 'test',
            payload: { message: 'hello, world' },
        })
    };

    constructor() {
        this.loadGamesFromDatabase();
    }

    async loadGamesFromDatabase() {
        const gamesFromDB = await fetchGamesFromDB();
        gamesFromDB.forEach((gameData: GameState) => {
            this.games.set(gameData.id, gameData);
        });
    }

    createGame(myName: string): GameState {
        const game = newGame(myName);
        this.games.set(game.id, game);
        addGameToDB(game);
        return game;
    }

    getGame(gameId: string): GameState | undefined {
        return this.games.get(gameId);
    }

    listGames(): GameState[] {
        return Array.from(this.games.values());
    }

    joinGame(gameId: string, oppName: string): boolean {
        // TODO: need to ping Supabase to update the game
        // TODO: need to check if the game is full
        const game = this.games.get(gameId);
        if (game && !game.oppName) {
            game.oppName = oppName;
            updateGameInDB(game);
            return true;
        }

        return false;
    }

    makeMove(gameId: string, index: number, piece: number): boolean {
        const game = this.games.get(gameId);
        if (game) {
            const previousMove = { ...game.currentMove };
            game.placePiece(index, piece);
            if (game.board[index] === piece) {
                return true;
            } else {
                game.currentMove = previousMove;
            }
        }
        return false;
    }

    undoMove(gameId: string, index: number): boolean {
        const game = this.games.get(gameId);
        if (game && game.board[index] !== 0) {
            game.board[index] = 0;
            game.currentMove.piece = null;
            game.clock--;
            return true;
        }
        return false;
    }

    declareWinner(gameId: string, winner: string): boolean {
        const game = this.games.get(gameId);
        if (game) {
            game.winner = winner;
            return true;
        }
        return false;
    }

    listWonGames(): GameState[] {
        return Array.from(this.games.values()).filter(game => game.winner !== null);
    }
}

export const gameController = new GameController();
