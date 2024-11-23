export class ListsService {
    constructor(listsRepository) {
        this.repository = listsRepository
    }

    create(data) {
        return this.repository.create(data)
    }

    find(id) {
        return this.repository.find(+id)
    }


    findAll() {
        return this.repository.findAll()
    }

    delete(id) {
        this.repository.delete(+id)
    }

    update(id, data) {
        this.repository.update(+id, data)
    }

    renameList(id, newTitle) {
        this.repository.update(+id, { title: newTitle })
    }
}