import { GameState } from "./models";

// Open or create the IndexedDB
function openDatabase() {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = indexedDB.open('GameDatabase', 1);

    request.onupgradeneeded = function (event) {
      const db = request.result;
      if (!db.objectStoreNames.contains('games')) {
        db.createObjectStore('games', { keyPath: 'id' });
      }
    };

    request.onsuccess = function () {
      resolve(request.result);
    };

    request.onerror = function () {
      reject(request.error);
    };
  });
}

function addGame(gameState: GameState): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    openDatabase().then(db => {
      const transaction = db.transaction('games', 'readwrite');
      const store = transaction.objectStore('games');
      const request = store.add(gameState);

      request.onsuccess = function () {
        resolve();
      };

      request.onerror = function () {
        reject(request.error);
      };
    }).catch(error => reject(error));
  });
}
// List all game states from the IndexedDB store
function listAllGames(): Promise<GameState[]> {
  return new Promise<GameState[]>((resolve, reject) => {
    openDatabase().then(db => {
      const transaction = db.transaction('games', 'readonly');
      const store = transaction.objectStore('games');
      const request = store.getAll();

      request.onsuccess = function () {
        resolve(request.result as GameState[]);
      };

      request.onerror = function () {
        reject(request.error);
      };
    }).catch(error => reject(error));
  });
}

// Update an existing game state in the IndexedDB store
function updateGame(gameState: GameState): Promise<void> {
  return new Promise<void>((resolve, reject) => {
    openDatabase().then(db => {
      const transaction = db.transaction('games', 'readwrite');
      const store = transaction.objectStore('games');
      const request = store.put(gameState);

      request.onsuccess = function () {
        resolve();
      };

      request.onerror = function () {
        reject(request.error);
      };
    }).catch(error => reject(error));
  });
}

export { addGame, updateGame, listAllGames };