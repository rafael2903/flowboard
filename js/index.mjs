import { CardsRepository } from "../repositories/CardsRepository.mjs"
import { ListsRepository } from "../repositories/ListsRepository.mjs"
import { CardsService } from "../services/CardsService.mjs"
import { ListsService } from "../services/ListsService.mjs"
import { openCard, openCreateCardModal } from "./cardModal.mjs"
import "./boardScroll.mjs"
import "./theme.mjs"

const cardsRepository = new CardsRepository()
const listsRepository = new ListsRepository()

export const cardsService = new CardsService(cardsRepository)
export const listsService = new ListsService(listsRepository)

const addListButton = document.querySelector("#add-list")


const moveCard = (cardId, listId) => {
    const card = document.getElementById(cardId)
    const list = document.getElementById(listId)
    const cardsContainer = list.querySelector(".cards-container")
    cardsContainer.appendChild(card)
    cardsService.moveCard(cardId, listId.split("-")[1])
}


function handleDragstart(event) {
    event.dataTransfer.setData("text/plain", event.target.id);
    event.dataTransfer.effectAllowed = "move";
}

const handleDragenter = (event) => event.preventDefault();

const handleDragover = (event) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
}

const handleDropInList = (event) => {
    event.preventDefault();
    const cardId = event.dataTransfer.getData("text");
    const listId = event.target.parentNode.id;
    moveCard(cardId, listId)
}

const addListListeners = (list) => {
    list.addEventListener("dragenter", handleDragenter);
    list.addEventListener("dragover", handleDragover);
    list.addEventListener("drop", handleDropInList);
}

const handleDropInCard = (event) => {
    event.preventDefault();
    event.stopPropagation()
    const cardId = event.dataTransfer.getData("text");
    const targetCardId = event.target.id
    const listId = "list-" + cardsService.find(targetCardId).listId
    moveCard(cardId, listId)
}

export const addCardListeners = (card) => {
    card.addEventListener("dragstart", handleDragstart);
    card.addEventListener("click", (event) => openCard(event.target.id));
    card.addEventListener("drop", handleDropInCard);
}

export const addCard = ({ title, description, id, listId }) => {
    const card = document.getElementById('card-template').content.cloneNode(true)
    card.querySelector('.card-title').textContent = title
    card.querySelector('.card-description').textContent = description
    card.querySelector('.card').id = id
    document.querySelector(`#list-${listId} .cards-container`)?.appendChild(card)
    addCardListeners(document.getElementById(id))
}

const updateListTitle = (id, event) => {
    const newTitle = event.target.value
    listsService.renameList(id, newTitle)
}

const addList = ({ title, id }) => {
    const list = document.getElementById('list-template').content.cloneNode(true)
    const listTitle = list.querySelector('.list-title')
    listTitle.value = title
    listTitle.addEventListener("change", event => updateListTitle(id, event))
    list.querySelector(".list").id = `list-${id}`
    list.querySelector(".add-card-list").addEventListener("click", () => openCreateCardModal(id))
    addListListeners(list.querySelector(".cards-container"))
    document.getElementById("board")?.insertBefore(list, addListButton)
    return list
}

const createNewList = () => {
    const list = listsService.create({ title: "" })
    addList(list)
    const listElement = document.getElementById(`list-${list.id}`).querySelector(".list-header")
    listElement.scrollIntoView({ block: "end", behavior: "smooth" });
}

addListButton.addEventListener("click", createNewList)

listsService.findAll().forEach(addList)
cardsService.findAll().forEach(addCard)
