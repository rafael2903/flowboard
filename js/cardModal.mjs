import { addCard, cardsService } from "./index.mjs"

const cardModal = document.querySelector("#card-modal")
const cardModalContent = cardModal.querySelector(".modal-content")
const mainElement = document.querySelector("main")
const cardDescriptionInput = document.querySelector("#card-description-input")
const cardTitleInput = document.querySelector("#card-title-input")
const closeModalButton = document.querySelector("#close-modal-button")
const cardForm = document.querySelector("#card-form")
const createCardButton = document.querySelector("#create-card-button")
let currentCard
let cardList

cardModalContent.addEventListener("click", event => event.stopPropagation())

const updateCardTitle = event => updateCard({ title: event.target.value })
const updateCardDescription = event => updateCard({ description: event.target.value })

const openModal = () => {
    mainElement.setAttribute("inert", true);
    cardModal.classList.add("open")
}

const closeModal = () => {
    currentCard = undefined
    cardTitleInput.removeEventListener("change", updateCardTitle)
    cardDescriptionInput.removeEventListener("change", updateCardDescription)
    mainElement.removeAttribute("inert");
    cardModal.classList.remove("open")
}

const updateCard = (data) => {
    const card = cardsService.update(currentCard.id, data)
    currentCard.querySelector('.card-title').textContent = card.title
    currentCard.querySelector('.card-description').textContent = card.description
}


export const openCard = (cardId) => {
    currentCard = document.getElementById(cardId)
    const card = cardsService.find(cardId)
    cardTitleInput.value = card?.title
    cardDescriptionInput.value = card?.description
    cardTitleInput.addEventListener("change", updateCardTitle)
    cardDescriptionInput.addEventListener("change", updateCardDescription)
    createCardButton.classList.add("hidden")
    openModal()
}

const createNewCard = (data) => {
    const card = cardsService.create(data)
    addCard(card)
    closeModal()
}

export const openCreateCardModal = (listId) => {
    createCardButton.classList.remove("hidden")
    cardForm.reset()
    cardList = listId
    openModal()
}

cardForm.addEventListener("submit", (event) => {
    event.preventDefault()
    const formData = new FormData(event.target);
    const cardData = Object.fromEntries(formData);
    createNewCard({ ...cardData, listId: cardList })
})

cardModal.addEventListener("click", closeModal)
closeModalButton.addEventListener("click", closeModal)

cardDescriptionInput.addEventListener("focus", () => cardDescriptionInput.setAttribute("spellcheck", true))
cardDescriptionInput.addEventListener("blur", () => cardDescriptionInput.setAttribute("spellcheck", false))
