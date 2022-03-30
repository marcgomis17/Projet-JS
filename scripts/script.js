const columnsWrapper = document.getElementById('columns-wrapper');
const addTask = document.getElementById('add-task');
const addColumnBtn = document.getElementById('add-column-btn');
const addNoteBtn = document.getElementById('add-note-btn');
const modal = document.getElementById('task-modal');
const taskTitle = document.getElementById('task-title');
const closeBtn = document.getElementById('close-btn');
const createBtn = document.getElementById('create-btn');
const fab = document.getElementById('fab-btn');
var i = 1;

function addColumn() {
    var column = document.createElement('div');
    column.className = "column";
    var columnHeader = document.createElement('div');
    columnHeader.id = "column-header";
    columnHeader.className = "column-header";
    var columnName = document.createElement('p');
    columnName.id = "column-name";
    columnName.className = "column-name";
    columnName.innerText = "Column " + i;
    var columnContent = document.createElement('div');
    columnContent.id = "column-content";
    var cardList = document.createElement('div');
    cardList.className = "card-list";
    cardList.id = "card-list";

    columnName.onclick = () => {
        columnName.contentEditable = "true";
    }

    columnHeader.appendChild(columnName);
    columnContent.append(cardList);
    column.append(columnHeader, columnContent);
    columnsWrapper.append(column);
    i++;
}

function buildCard(cardText) {
    var card = document.createElement('div');
    card.classList.add('card');
    var prevBtn = document.createElement('button');
    prevBtn.classList.add('nav-btn', 'btn-hidden');
    prevBtn.id = "prev-btn";
    prevBtn.innerHTML = "&#xab";
    prevBtn.setAttribute('data-move', 'left');
    var taskName = document.createElement('p');
    taskName.innerText = cardText;
    taskName.classList.add('task-name');
    var taskDate = document.createElement('p');
    taskDate.classList.add('task-date')
    var taskStart = document.createElement('p');
    taskStart.classList.add('task-start');
    var taskEnd = document.createElement('p');
    taskEnd.classList.add('task-end');
    var nextBtn = document.createElement('button');
    nextBtn.classList.add('nav-btn');
    nextBtn.id = "next-btn";
    nextBtn.innerHTML = "&#187";
    nextBtn.setAttribute('data-move', 'right');

    card.append(prevBtn, taskName, nextBtn);

    return card;
}

function eventHandler(e) {
    var cols = document.querySelectorAll('.column');
    var currentColumn = e.target.closest('.column');
    var card = e.target.closest('.card');
    var nextBtn = card.querySelector('#next-btn');
    var prevBtn = card.querySelector('#prev-btn');
    if (e.target.getAttribute('data-move') == "right" && currentColumn.nextElementSibling != null) {
        var nextList = currentColumn.nextElementSibling.querySelector('#card-list');
        nextList.append(card);
    } else {
    }
    if (e.target.getAttribute('data-move') == "left" && currentColumn.previousElementSibling != null) {
        var prevList = currentColumn.previousElementSibling.querySelector('#card-list');
        prevList.append(card);
    } else {
    }

    // Code à factoriser
    if (e.target.closest('.column') == cols[cols.length - 1]) {
        nextBtn.classList.add('btn-hidden');
    } else {
        nextBtn.classList.remove('btn-hidden');
    }
    if (e.target.closest('.column') == cols[0]) {
        prevBtn.classList.add('btn-hidden');
    } else {
        prevBtn.classList.remove('btn-hidden');
    }
}

function addCard() {
    var card = buildCard(taskTitle.value);
    var cardBtns = card.querySelectorAll('.nav-btn');
    var firstList = document.querySelector('.column').querySelector('#card-list');
    firstList.append(card);
    cardBtns.forEach(btn => {
        btn.onclick = (e) => {
            eventHandler(e);
        }
    });

}

addColumnBtn.onclick = () => {
    if (i < 6) {
        addColumn();
    }
}

addNoteBtn.onclick = () => {
    if (document.querySelectorAll('.column').length !== 0) {
        modal.classList.replace('modal-hidden', 'modal-show');
    }
}

closeBtn.onclick = () => {
    modal.classList.replace('modal-show', 'modal-hidden');
}

fab.onclick = () => {
    addTask.classList.add('add-show');
}

createBtn.onclick = () => {
    modal.classList.replace('modal-show', 'modal-hidden');
    addCard();
}

/* Next Steeeeeeeeeeeeeeeeeeeeeeeeeeep !!!!!!!! */
