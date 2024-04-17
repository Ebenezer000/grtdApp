import { openDB, DBSchema, IDBPDatabase } from 'idb';

// Define the structure of your transaction history
interface TransactionHistory {
  phone_number: string
  username: string,
  user_id: number,
  access_hash: number,
  name: string,
  group_name: string,
  group_id: number
}

// Define the schema for each database
interface MyHistory extends DBSchema {
  transactions: {
    key: number;
    value: TransactionHistory;
  };
}

// Create a class for managing a single database
class HistoryDatabase {
  private dbPromise: Promise<IDBPDatabase<MyHistory>>;

  constructor(dbName: string, version: number) {
    this.dbPromise = openDB(dbName, version, {
      upgrade(db) {
        if (!db.objectStoreNames.contains('transactions')) {
          db.createObjectStore('transactions', { keyPath: 'key', autoIncrement: true });
        }
      },
    });
  }

  async addNewTransaction(transaction: TransactionHistory): Promise<void> {
    const db = await this.dbPromise;
    const tx = db.transaction('transactions', 'readwrite');
    const store = tx.objectStore('transactions');
    await store.add(transaction);
    await tx.done;
  }

  async getAllTransactions(): Promise<TransactionHistory[]> {
    const db = await this.dbPromise;
    const tx = db.transaction('transactions', 'readonly');
    const store = tx.objectStore('transactions');
    return store.getAll();
  }

  async getTransactionByKey(key: number): Promise<TransactionHistory | any> {
    const db = await this.dbPromise;
    const tx = db.transaction('transactions', 'readonly');
    const store = tx.objectStore('transactions');
    return store.get(key);
  }

  async deleteTransactionByKey(key: number): Promise<void> {
    const db = await this.dbPromise;
    const tx = db.transaction('transactions', 'readwrite');
    const store = tx.objectStore('transactions');
    await store.delete(key);
    await tx.done;
  }

  async deleteAllTransactions(): Promise<void> {
    const db = await this.dbPromise;
    const tx = db.transaction('transactions', 'readwrite');
    const store = tx.objectStore('transactions');
    await store.clear();
    await tx.done;
  }

  async hasData(): Promise<boolean> {
    const db = await this.dbPromise;
    const tx = db.transaction('transactions', 'readonly');
    const store = tx.objectStore('transactions');
    const count = await store.count();
    return count > 0;
  }
}

// Create instances of the database for different names
const transactionDB1 = new HistoryDatabase('my-transaction-history1', 1);
// Add more databases as needed

// Function to Add Transaction to DB for a specific database
export async function storeHistory(props: TransactionHistory, dbName: string) {
  const db = getDatabaseInstance(dbName);
  await db.addNewTransaction({
    phone_number: props.phone_number,
    username: props.username,
    user_id: props.user_id,
    access_hash: props.access_hash,
    name: props.name,
    group_name: props.group_name,
    group_id: props.group_id
  });

  console.log('Added a new Transaction to your history');
}

//Function to Remove transaction From DB for a specific database
export async function removeHistoryByKey(key: number, dbName: string) {
  const db = getDatabaseInstance(dbName);
  await db.deleteTransactionByKey(key);
  console.log(`You have removed transaction with index number ${key}`);
}

//Funtion to fetch single transaction by key for a specific database
export async function fetchHistoryByKey(key: number, dbName: string) {
  const db = getDatabaseInstance(dbName);
  const retrievedTransaction: TransactionHistory = await db.getTransactionByKey(key);

  if (retrievedTransaction) {
    console.log('Retrieved Transaction:', retrievedTransaction);
  } else {
    console.log('Transaction not found');
  }
  return retrievedTransaction;
}

// Function to fetch all transactions in user history for a specific database
export async function getAllHistory(dbName: string) {
  const db = getDatabaseInstance(dbName);
  const transactions = await db.getAllTransactions();
  return transactions;
}

// Function to check if a specific database has data
export async function checkForHistory(dbName: string) {
  const db = getDatabaseInstance(dbName);
  const hasData = await db.hasData();
  console.log(hasData);
  return hasData;
}

// Function to clear all transactions for a specific database
export async function clearAllHistory(dbName: string) {
  const db = getDatabaseInstance(dbName);
  await db.deleteAllTransactions();
  console.log(`All transactions for ${dbName} have been removed`);
}

// Helper function to get the correct database instance based on the name
function getDatabaseInstance(dbName: string): HistoryDatabase {
  switch (dbName) {
    case 'my-transaction-history1':
      return transactionDB1;
    // Add more cases for other databases as needed
    default:
      const newDb =  new HistoryDatabase(dbName, 1);
      return newDb;
  }
}
