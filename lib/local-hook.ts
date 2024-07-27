import { create } from 'zustand'
import { GameState, newGame } from './models'
import { addGameToDB, fetchGamesFromDB } from './database'
import { handPiece, placePiece } from './game-logic'
import { persist } from 'zustand/middleware'
import { gameStorage } from './local-persist'

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
    setGame: (game: GameState) => void;
    placePiece: null | ((index: number, piece: number) => void);
    handPiece: null | ((piece: number) => void);
}

const _useCurrentGameStore = (id: string) => create<CurrentGame>()(
    persist(
        (set, get) => ({
            game: null,
            setGame: (game: GameState) => {
                set({ game });
            },
            placePiece: function (index: number, piece: number) {
                const { game } = get();
                if (game != null) {
                    set({ game: placePiece(game, index, piece) });
                }
            },
            handPiece: function (piece: number,) {
                const { game } = get();
                if (game != null) {
                    set({ game: handPiece(game, piece) });
                }
            }
        }),
        {
            name: id,
            storage: gameStorage,
            partialize: (state) => (state.game),
        }
    ))

const gameStores: Record<string, ReturnType<typeof _useCurrentGameStore>> = {}; // Store references

export function useCurrentGameStore(id: string) {
    if (!gameStores[id]) {
        gameStores[id] = _useCurrentGameStore(id)
    }
    return gameStores[id]!;
}