import { PersistStorage, StorageValue } from 'zustand/middleware'
import { addGameToDB, fetchGameFromDB, fetchGamesFromDB, updateGameInDB } from './database'
import { CurrentGame } from './models'

const version = 0

// Should this be CurrentGame instead? with custom non null merging for the fn's?
export const gameStorage: PersistStorage<any | null> = {
    getItem: (name: string): Promise<StorageValue<any> | null> => {
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
    setItem: async (name: string, value: StorageValue<CurrentGame | null>): Promise<void> => {
        console.log(name, 'is being saved', value)
        if (value.state?.game) {
            return updateGameInDB(value.state.game)
        }
        return;
    },
    removeItem: async (name: string): Promise<void> => {
        return;
    },
}