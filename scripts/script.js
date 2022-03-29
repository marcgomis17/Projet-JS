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

function addCard() {
    var card = document.createElement('div');
    card.classList.add('card');
    var prevBtn = document.createElement('button');
    prevBtn.classList.add('nav-btn');
    prevBtn.id = "prev-btn";
    prevBtn.innerHTML = "&#xab";
    var taskName = document.createElement('p');
    taskName.innerText = taskTitle.value;
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
    card.append(prevBtn, taskName, nextBtn);
    var cardList = document.querySelector('.column').querySelector('#card-list');

    nextBtn.onclick = (e) => {
        console.log();
        var cardClone = e.target.parentElement.cloneNode(true);
        var currentColumn = e.target.parentElement.parentElement.parentElement.parentElement;
        console.log(cardClone);
        if (currentColumn.nextElementSibling != null) {
            var currentList = e.target.parentElement.parentElement;
            var card = e.target.parentElement;
            var nextList = currentColumn.nextElementSibling.querySelector('.card-list');
            nextList.append(cardClone);
            currentList.removeChild(card);
        } else {
        }
    }
    cardList.append(card);
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
    console.log(addTask)
}

createBtn.onclick = () => {
    modal.classList.replace('modal-show', 'modal-hidden');
    addCard();
}