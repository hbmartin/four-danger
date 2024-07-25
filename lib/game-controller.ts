// For each game, we need to keep track of the state of the game, the moves that have been made, and the players that are in the game.
// We need to update the database and the game state, keeping track of the previous currentMove so they can be rolled back in case of failed moves.
// We need to be able to list all the games, and to be able to join a game.
// We need to be able to make a move, and to be able to undo a move.
// We need to be able to declare a winner, and to be able to list all the games that have been won.
import { GameState, newGame } from "@/lib/models";
import { addGameToDB, fetchGamesFromDB, updateGameInDB } from "./database";

class GameController {
    private games: Map<string, GameState>;

    constructor() {
        this.games = new Map();
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
