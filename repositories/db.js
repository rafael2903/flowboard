function openDatabase(name, version) {
    return new Promise((resolve, reject) => {
        const request = indexedDB.open(name, version);

        request.onsuccess = (event) => {
            resolve(event.target.result);
        };

        request.onerror = (event) => {
            reject(event.target.error);
        };

        request.onupgradeneeded = (event) => {
            const db = event.target.result;
            // Perform any database setup here
        };
    });
}

function createObjectStore(db, storeName, options) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([storeName], 'versionchange');
        const objectStore = db.objectStore(storeName);

        transaction.oncomplete = () => {
            resolve(objectStore);
        };

        transaction.onerror = (event) => {
            reject(event.target.error);
        };
    });
}

function addData(db, storeName, data) {
    return new Promise((resolve, reject) => {
        const transaction = db.transaction([storeName], 'readwrite');
        const objectStore = transaction.objectStore(storeName);
        const request = objectStore.add(data);

        request.onsuccess = () => {
            resolve(request.result);
        };

        request.onerror = (event) => {
            reject(event.target.error);
        };
    });
}

openDatabase('myDatabase', 1)
    .then((db) => {
        return createObjectStore(db, 'myObjectStore', { autoIncrement: true });
    })
    .then((objectStore) => {
        return addData(objectStore.transaction.db, 'myObjectStore', { name: 'John Doe', age: 30 });
    })
    .then((key) => {
        console.log('Data added with key:', key);
    })
    .catch((error) => {
        console.error('Error:', error);
    });