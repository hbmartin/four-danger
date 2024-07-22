import setupIndexedDB, { useIndexedDBStore } from "use-indexeddb";

// Database Configuration
const idbConfig = {
  databaseName: "fruity-db",
  version: 1,
  stores: [
    {
      name: "games",
      id: { keyPath: "id" },
      indices: [
        { name: "name", keyPath: "name", options: { unique: false } },
        { name: "quantity", keyPath: "quantity" },
      ],
    },
  ],
};

export const setupDB = () => {
  setupIndexedDB(idbConfig)
    .then(() => console.log("success"))
    .catch(e => console.error("error / unsupported", e));
};

export const { add } = useIndexedDBStore("fruits");

export  const insertFruit = () => {
  add({ name: "Mango 🥭", quantity: 2 }).then(console.log);
};