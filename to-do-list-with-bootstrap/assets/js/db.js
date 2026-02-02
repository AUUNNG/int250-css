const DB_NAME = 'TodoAppDB';
const DB_VERSION = 1;
const STORE_NAME = 'todos';

const openDB = () => {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(DB_NAME, DB_VERSION);

        request.onerror = (event) => {
            console.error('Database error:', event.target.errorCode);
            reject(event.target.error);
        };

        request.onsuccess = (event) => {
            resolve(event.target.result);
        };

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            if (!db.objectStoreNames.contains(STORE_NAME)) {
                db.createObjectStore(STORE_NAME, { keyPath: 'id' });
            }
        };
    });
};

export const createTodo = async ({ title, priority }) => {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);

        const newTodo = {
            id: crypto.randomUUID(),
            title,
            priority,
            status: 'Active',
            datetime: new Date()
        };

        const request = store.add(newTodo);

        request.onsuccess = () => {
            resolve(newTodo);
        };

        request.onerror = (event) => {
            reject(event.target.error);
        };
    });
};

export const getAllTodo = async () => {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.getAll();

        request.onsuccess = () => {
            resolve(request.result);
        };

        request.onerror = (event) => {
            reject(event.target.error);
        };
    });
};

export const getTodo = async (id) => {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readonly');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.get(id);

        request.onsuccess = () => {
            resolve(request.result);
        };

        request.onerror = (event) => {
            reject(event.target.error);
        };
    });
};

export const updateTodo = async (todo) => {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);

        const getReq = store.get(todo.id);

        getReq.onsuccess = () => {
            if (!getReq.result) {
                reject(new Error("Todo not found"));
                return;
            }

            const updatedTodo = {
                ...getReq.result,
                ...todo,
            };

            const putReq = store.put(updatedTodo);

            putReq.onsuccess = () => resolve(updatedTodo);
            putReq.onerror = (e) => reject(e.target.error);
        };

        getReq.onerror = (e) => reject(e.target.error);

    });
};

export const deleteTodo = async (id) => {
    const db = await openDB();
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([STORE_NAME], 'readwrite');
        const store = transaction.objectStore(STORE_NAME);
        const request = store.delete(id);

        request.onsuccess = () => {
            resolve(id);
        };

        request.onerror = (event) => {
            reject(event.target.error);
        };
    });
};
