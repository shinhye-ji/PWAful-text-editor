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

// Add logic to a method that accepts some content and adds it to the database
export const putDb = async (content) => {
  // console.error('putDb not implemented', content);
  const existingContent = await getDb();
  const contentExists = existingContent.some((item) => item === content);

  if (!contentExists) {
    const jateDb = await openDB('jate', 1);
    const tx = jateDb.transaction('jate', 'readwrite');
    const store = tx.objectStore('jate');

    await store.add({ content });
    console.log('Content added to the database');

    localStorage.removeItem('content');
  } else {
    console.log('Content already exists in the database');
  }
};

// Add logic for a method that gets all the content from the database
export const getDb = async () => {
  // console.error('getDb not implemented');

  // create a connection to the database and the version we want to use.
  const jateDb = await openDB('jate', 1);

  // create new transaction 
  const tx = jateDb.transaction('jate', 'readonly');

  // store object
  const store = tx.objectStore('jate');

  // use get all to get all data in the database.
  const request = store.getAll();

  // confirm request
  const result = await request;
  console.log('result.value', result);
  return result;
};

initdb();
