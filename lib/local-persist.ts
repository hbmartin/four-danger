import { PersistStorage, StorageValue } from 'zustand/middleware'
import { addGameToDB, fetchGameFromDB, fetchGamesFromDB, updateGameInDB } from './database'
import { GameState } from './models'

const version = 0

// Should this be CurrentGame instead? with custom non null merging for the fn's?
export const gameStorage: PersistStorage<GameState | null> = {
    getItem: (name: string): Promise<StorageValue<GameState> | null> => {
        console.log(name, 'is being retrieved')
        return fetchGameFromDB(name)
            .then(game => {
                console.log('retrieved game', game)
                if (game) {
                    return {
                        state: { game },
                        version: version
                    }
                }
                return null
            })
    },
    setItem: async (name: string, value: StorageValue<GameState | null>): Promise<void> => {
        console.log(name, 'is being saved', value)
        if (value.state) {
            return updateGameInDB(value.state)
        }
        return;
    },
    removeItem: async (name: string): Promise<void> => {
        return;
    },
}