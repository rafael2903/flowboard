// function promissify(request) {
//     console.log(request)
//     return new Promise((resolve, reject) => {
//         if (request.onsuccess) { request.onsuccess?.(() => resolve(request.result)); return }
//         if (request.onupgradeneeded) { request.onupgradeneeded?.(() => resolve(request.result)); return }
//         if (request.onerror) { request.onerror?.(reject); return }
//         resolve(request?.result)
//     })
// }



function promissify(request) {
    return new Promise((resolve, reject) => {
        if (request.onsuccess) { request.onsuccess?.(console.log); return }
        if (request.onupgradeneeded) { request.onupgradeneeded?.(console.log); return }
        if (request.onerror) { request.onerror?.(reject); return }
    })
}

class DB {
    constructor(name) {
        this.name = name
    }

    async open() {
        this.db = await promissify(window.indexedDB.open(this.name, 1))
        return this.db
    }

    createStore(name) {
        return db.createObjectStore(name, { autoIncrement: true })
    }
}


(async () => {
    const db = new DB("teste")
    await db.open()
    console.log(indexedDB.createStore("testee"))
})()

