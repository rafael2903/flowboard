let idCounter = 3

let lists = [
    {
        id: 1,
        title: "Backlog",
    },
    {
        id: 2,
        title: "Sprint Backlog",
    },
    {
        id: 3,
        title: "Em desenvolvimento",
    },
]

window.lists = lists


export class ListsRepository {
    create(data) {
        lists.push(
            {
                id: ++idCounter,
                title: data.title
            }
        )

        return lists.at(-1)
    }

    find(id) {
        return lists.find(list => list.id === id)
    }

    findAll() {
        return lists
    }

    delete(id) {
        lists = lists.filter(list => list.id !== id)
    }

    update(id, data) {
        const listIndex = lists.findIndex(list => list.id === id)
        lists[listIndex] = {...lists[listIndex], ...data}
    }
}