"use client";

import { GameState } from "./models";

// Open or create the IndexedDB
function openDatabase() {
  return new Promise<IDBDatabase>((resolve, reject) => {
    const request = window.indexedDB.open('GameDatabase', 1);

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

function addGameToDB(gameState: GameState): Promise<void> {
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
function fetchGamesFromDB(): Promise<GameState[]> {
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

// Fetch a single game state from the IndexedDB store by id
function fetchGameFromDB(id: string): Promise<GameState | null> {
  return new Promise<GameState | null>((resolve, reject) => {
    openDatabase().then(db => {
      const transaction = db.transaction('games', 'readonly');
      const store = transaction.objectStore('games');
      const request = store.get(id);

      request.onsuccess = function () {
        resolve(request.result as GameState | null);
      };

      request.onerror = function () {
        reject(request.error);
      };
    }).catch(error => reject(error));
  });
}


// Update an existing game state in the IndexedDB store
function updateGameInDB(gameState: GameState): Promise<void> {
  console.log('updateGameInDB', gameState)
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

function saveNameLS(name: string) {
  window.localStorage.setItem('name', name);
}

function getNameLS(): string | null {
  return window.localStorage.getItem('name');
}


export { addGameToDB, updateGameInDB,fetchGameFromDB, fetchGamesFromDB, saveNameLS, getNameLS };