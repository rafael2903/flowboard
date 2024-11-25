export class CardsService {
    constructor(cardsRepository) {
        this.repository = cardsRepository
    }

    create(data) {
        return this.repository.create(data)
    }

    find(id) {
        return this.repository.find(+id)
    }


    findAll() {
        return this.repository.findAll().sort((a, b) => a.order - b.order)
    }

    delete(id) {
        this.repository.delete(+id)
    }

    findAllByListId(listId) {
        return this.repository.findAllByListId(+listId)
    }

    update(id, data) {
        return this.repository.update(+id, data)
    }

    moveCard(id, listId) {
        this.repository.update(+id, { listId: +listId })
    }
}
