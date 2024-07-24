import setupIndexedDB, { useIndexedDBStore } from "use-indexeddb";

// Database Configuration
const idbConfig = {
  databaseName: "games-db",
  version: 1,
  stores: [
    {
      name: "games",
      id: { keyPath: "id", autoIncrement: false },
      indices: [
        { name: "board", keyPath: "board", options: { unique: false } },
        { name: "currentMove", keyPath: "currentMove", options: { unique: false } },
        { name: "oppName", keyPath: "oppName", options: { unique: false } },
        { name: "winner", keyPath: "winner", options: { unique: false } },
        { name: "clock", keyPath: "clock", options: { unique: false } },
      ],
    },
  ],
};

export const setupDB = () => {
  setupIndexedDB(idbConfig)
    .then(() => console.log("success"))
    .catch(e => console.error("error / unsupported", e));
};

export const { add } = useIndexedDBStore("games");

export  const insertFruit = () => {
  add({ name: "Mango 🥭", quantity: 2 }).then(console.log);
};