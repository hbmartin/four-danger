import { create } from 'zustand'
import { GameState, newGame } from './models'
import { addGameToDB, fetchGameFromDB, fetchGamesFromDB, updateGameInDB } from './database'
import { handPiece, placePiece } from './game-logic'
import { persist } from 'zustand/middleware'
import { gameStorage } from './gamer-persist'

interface GamesState {
    games: GameState[]
    loadGames: () => void
    createGame: (myName: string) => void
}

export const useGamesStore = create<GamesState>()((set) => ({
    games: [],
    loadGames: async () => {
        const gamesFromDB = await fetchGamesFromDB();
        set({ games: gamesFromDB });
    },
    createGame: async (myName: string) => {
        const game = newGame(myName);
        await addGameToDB(game);
        set((state) => ({ games: [game, ...state.games] }));
    }
}))

interface CurrentGame {
    game: GameState | null;
    placePiece: (index: number, piece: number) => void;
    handPiece: (piece: number) => void;
}

const _useCurrentGameStore = (id: string) => create<CurrentGame>()(persist(
    (set, get) => ({
        game: null,
        placePiece: function (index: number, piece: number) {
            let game = get().game;
            if (game != null) {
                set({ game: placePiece(game, index, piece) });
                updateGameInDB(game);
                // this._remote?.placePiece(index, piece);
            }
        },
        handPiece: function (piece: number,) {
            let game = get().game;
            if (game != null) {
                set({ game: handPiece(game, piece) });
                updateGameInDB(game);
                // this._remote?.handPiece(piece);
            }
        }
    }), {
        name: id,
        storage: gameStorage,
        partialize: (state) => (state.game )
    }
))

const gameStores: Record<string, ReturnType<typeof _useCurrentGameStore>> = {}; // Store references

export function useCurrentGameStore(id: string) {
    if (!gameStores[id]) {
      gameStores[id] = _useCurrentGameStore(id)
    }
    return gameStores[id];
  }