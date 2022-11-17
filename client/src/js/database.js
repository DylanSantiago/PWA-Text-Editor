import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });

  // Logic to a method that will accept some content and add it to the database
export const putDb = async (content) => {
  const jateDb = await openDB('jate', 1);
  const tx = jateDb.transaction('jate', 'readwrite');
  const store = tx.objectStore('jate');
  const request = store.put({ id: 1, jate: content });
  const result = await request;
  console.log('🚀 - data saved to the database', result);
}

// Logic for a method that will get all the content from the database
export const getDb = async () => { 
  console.log('GET from the database');

  // A connection to the database that will specify which version we want to use.
  const jateDb = await openDB('jate', 1);

  // A new transaction and will specify the database and data privileges.
  const tx = jateDb.transaction('jate', 'readonly');

  // Opens up the desired object store.
  const store = tx.objectStore('jate');

  // Using the .getAll() method to get all data in the database.
  const request = store.getAll();

  // Get confirmation of the request.
  const result = await request;
  console.log('result.value', result);
  return result;
};

initdb();
