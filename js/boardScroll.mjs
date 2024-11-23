let startX, scrollLeft, isDown = false;
const board = document.querySelector('#board');

board.addEventListener('mousedown', (e) => {
    if (e.target !== board && ![...e.target.classList].includes("cards-container")) return
    isDown = true;
    board.classList.add('active');
    startX = e.pageX - board.offsetLeft;
    scrollLeft = board.scrollLeft;
});

board.addEventListener('mouseleave', () => {
    isDown = false;
    board.classList.remove('active');
});

board.addEventListener('mouseup', () => {
    isDown = false;
    board.classList.remove('active');
});

board.addEventListener('mousemove', (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - board.offsetLeft;
    const walk = x - startX;
    board.scrollLeft = scrollLeft - walk;
});

