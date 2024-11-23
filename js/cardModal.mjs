import { cardsService } from "./index.mjs"

const cardModal = document.querySelector("#card-modal")
const cardModalContent = cardModal.querySelector(".modal-content")
const mainElement = document.querySelector("main")
const cardDescriptionInput = document.querySelector("#card-description-input")
const cardTitleInput = document.querySelector("#card-title-input")
const closeModalButton = document.querySelector("#close-modal-button")
const cardForm = document.querySelector("#card-form")
let currentCardId
let currentCardElement
let cardList

cardModalContent.addEventListener("click", event => event.stopPropagation())

const openModal = () => {
    mainElement.setAttribute("inert", true);
    cardModal.classList.add("open")
}

const closeModal = () => {
    mainElement.removeAttribute("inert");
    cardModal.classList.remove("open")
}

const updateCard = (data) => {
    const card = cardsService.update(currentCardId, data)
    currentCardElement.querySelector('.card-title').textContent = card.title
    currentCardElement.querySelector('.card-description').textContent = card.description
}

export const openCard = (cardId) => {
    currentCardElement = document.getElementById(cardId)
    const card = cardsService.find(cardId)
    currentCardId = card?.id;
    cardTitleInput.value = card?.title
    cardDescriptionInput.value = card?.description
    cardTitleInput.addEventListener("change", event => updateCard({ title: event.target.value }))
    cardDescriptionInput.addEventListener("change", event => updateCard({ description: event.target.value }))
    openModal()
}


cardModal.addEventListener("click", closeModal)
closeModalButton.addEventListener("click", closeModal)

cardDescriptionInput.addEventListener("focus", () => cardDescriptionInput.setAttribute("spellcheck", true))
cardDescriptionInput.addEventListener("blur", () => cardDescriptionInput.setAttribute("spellcheck", false))
