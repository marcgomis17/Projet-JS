const columnsWrapper = document.getElementById('columns-wrapper');
const addTask = document.getElementById('add-task');
const addColumnBtn = document.getElementById('add-column-btn');
const addNoteBtn = document.getElementById('add-note-btn');
const modal = document.getElementById('task-modal');
const taskTitle = document.getElementById('task-title');
const closeBtn = document.getElementById('close-btn');
const createBtn = document.getElementById('create-btn');
const fab = document.getElementById('fab-btn');
const addForm = document.getElementById('add-form');
const taskDate = addForm.querySelector('#date');
const startHour = addForm.querySelector('#start-hour');
const endHour = addForm.querySelector('#end-hour');
/* var hourStart = moment(startHour.value, 'h:mm');
var hourEnd = moment(endHour.value, 'h:mm'); */
const trashBtn = document.getElementById('trash-btn');
const trash = document.getElementById('trash');
const trashContent = document.getElementById('trash-content');
var removed = false;

var i = 0;

var test = '';
var board = {
    column_1: ['Task 1', 'Task 2', 'Task 3'],
    column_2: ['Task 4'],
    column_3: ['Task 5', 'Task 6', 'Task 7', 'Task 8'],
    column_4: ['Task 9', 'Task 10', 'Task 11', 'Task 12', 'Task 13'],
    column_5: ['Task 13', 'Task 14'],
};

function renameColumns() {
    var columnNames = columnsWrapper.querySelectorAll('.column-name');
    var nameText = "";
    var j = 1;
    columnNames.forEach((name) => {
        if (name.innerText.toLowerCase().includes('column')) {
            nameText = name.innerText;
            var columnIndex = nameText.substring(6).trim();
            if (!isNaN(parseInt(columnIndex))) {
                if (name.closest('.column').nextElementSibling != null) {
                    var nextColumn = name.closest('.column').nextElementSibling;
                    var nextName = nextColumn.querySelector('.column-name');
                    if (!nextName.innerText.toLowerCase().includes('column')) {
                        j++;
                    }
                }
                nameText = "Column " + j;
                name.innerText = nameText;
                j++;
            }
        }
    });
}

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
    var removeBtn = document.createElement('button');
    removeBtn.classList.add('remove-btn');
    removeBtn.innerText = "-";
    var columnContent = document.createElement('div');
    columnContent.className = "column-content";

    columnName.onclick = () => {
        columnName.contentEditable = "true";
    }

    removeBtn.onclick = (e) => {
        if (e.target.closest('.column') != columnsWrapper.querySelectorAll('.column')[0] || i == 1) {
            var currentColumn = e.target.closest('.column');
            columnsWrapper.removeChild(currentColumn);
            i--;
            if (i != 1) renameColumns();
        }
    }

    columnHeader.append(columnName, removeBtn);
    column.append(columnHeader, columnContent);
    columnsWrapper.append(column);
}

function setState(card) {
    if (moment().isSameOrBefore(startHour)) {
        card.classList.add('active');
    }
    if (moment().isSameOrAfer(endHour)) {
        if (card.classList.contains('active')) {
            card.classList.replace('active', 'inactive');
        }
        card.classList.add('inactive');
    }
}

function checkFields(field) {
    if (field.value == "") {
        return "Champ obligatoire";
    } else {
        if (field.classList.contains('hour') && field.value != "") {
            if (hourStart.diff(hourEnd) > 0) {
                return "L'heure de fin doit ête plus récent que l'heure de début";
            }
            return "";
        }
        return "";
    }
}

function archive(parent, card) {
    trashContent.append(card);
    removed = true;
    const cardBtn = card.querySelector('.remove-card-btn');
    if (removed) {
        e.target.innerText = "remove";
        parent.append(card);
        removed = false;
    }
}

function buildCard(cardText, taskStart, taskEnd) {
    var card = document.createElement('div');
    card.classList.add('card');

    var prevBtn = document.createElement('button');
    prevBtn.classList.add('nav-btn', 'btn-hidden');
    prevBtn.id = "prev-btn";
    prevBtn.innerHTML = "&#xab";
    prevBtn.setAttribute('data-move', 'left');

    var cardBody = document.createElement('div');
    cardBody.classList.add('card-body');

    var cardContent = document.createElement('p');
    cardContent.classList.add('card-content');
    cardContent.innerText = cardText;

    var cardFooter = document.createElement('div');
    cardFooter.classList.add('card-footer', 'footer-hidden');

    var removeBtn = document.createElement('button');
    removeBtn.classList.add('remove-card-btn');
    removeBtn.innerText = "remove";

    var cardHours = document.createElement('div');
    cardHours.classList.add('card-hours');

    var startHour = document.createElement('p');
    startHour.classList.add('card-hour', 'start-hour');
    startHour.innerText = taskStart;

    var endHour = document.createElement('p');
    endHour.classList.add('card-hour', 'end-hour');
    endHour.innerText = taskEnd;

    var nextBtn = document.createElement('button');
    nextBtn.classList.add('nav-btn');
    nextBtn.id = "next-btn";
    nextBtn.innerHTML = "&#187";
    nextBtn.setAttribute('data-move', 'right');

    card.onpointerenter = () => {
        cardFooter.classList.remove('footer-hidden');
    }
    card.onpointerleave = () => {
        cardFooter.classList.add('footer-hidden');
    }

    removeBtn.onclick = (e) => {
        if (!removed) {
            archive(e.target.closest('.column-content'), e.target.closest('.card'));
            removeBtn.innerText = "restore";
        }
        console.log(removed);
    }
    cardHours.append(startHour, endHour);
    cardFooter.append(cardHours, removeBtn);
    cardBody.append(cardContent, cardFooter);
    card.append(prevBtn, cardBody, nextBtn);

    return card;
}

function eventHandler(e) {
    var cols = document.querySelectorAll('.column');
    var currentColumn = e.target.closest('.column');
    var card = e.target.closest('.card');
    var nextBtn = card.querySelector('#next-btn');
    var prevBtn = card.querySelector('#prev-btn');
    if (e.target.getAttribute('data-move') == "right" && currentColumn.nextElementSibling != null) {
        var nextList = currentColumn.nextElementSibling.querySelector('.column-content');
        nextList.append(card);
    } else {
    }
    if (e.target.getAttribute('data-move') == "left" && currentColumn.previousElementSibling != null) {
        var prevList = currentColumn.previousElementSibling.querySelector('.column-content');
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
    var card = buildCard(taskTitle.value, startHour.value, endHour.value);
    var cardBtns = card.querySelectorAll('.nav-btn');
    var firstList = document.querySelector('.column-content');
    firstList.append(card);
    cardBtns.forEach(btn => {
        btn.onclick = (e) => {
            eventHandler(e);
        }
    });
}

addColumnBtn.onclick = () => {
    i++;
    if (i < 6) {
        addColumn();
    }
    if (i > 5) i = 5;
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
    addTask.classList.toggle('add-show');
}

taskDate.onfocus = () => {
    var minDate = moment().format('YYYY-MM-DD').toString();
    taskDate.setAttribute('min', minDate);
}

startHour.onfocus = () => {
    var minHour = moment().format('HH:mm').toString();
    startHour.setAttribute('min', minHour);
}

endHour.onfocus = () => {
    var minHour = moment(startHour.value);
    endHour.setAttribute('min', minHour);
}

addForm.onsubmit = (e) => {
    e.preventDefault();
    var error = "";
    var smalls = addForm.querySelectorAll('small');
    /*  addForm.querySelectorAll('*').forEach(field => {
         if (field.nodeName == "TEXTAREA" || field.nodeName == "INPUT") {
             error = checkFields(field);
             if (error != "") {
                 var small = field.parentElement.querySelector('small');
                 small.innerText = error;
                 small.classList.remove('hidden');
             }
         }
     }); */
    if (error == "") {
        addCard();
        smalls.forEach(small => {
            if (!small.classList.contains('hidden')) {
                small.classList.add('hidden');
                small.innerText = "";
            }
        });
        // addForm.reset();
        modal.classList.replace('modal-show', 'modal-hidden');
    }
}

trashBtn.onclick = () => {
    trash.classList.toggle('trash-hidden');
}

async function sendData() {
    var columns = document.querySelectorAll('.column');
    var board = {
        date: new Date().toLocaleString(),
    }
    columns.forEach(column => {
        var columnName = column.querySelector('.column-name').innerText;
        var column = { column_name: columnName };
        const cards = column.querySelectorAll('.card');
        cards.forEach(card => {
            var cardArray = {
                'description': card.querySelector('.card-content').innerText,
                'start_hour': card.querySelector('.start-hour').innerText,
                'end-hour': card.querySelector('.end-hour').innerText
            };
            column.push(cardArray);
        });
        board.push(column);
    });

    await fetch('http://localhost:8000/?controller=cards&action=save',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(board)
        },
    ).then(res => {
        console.log(res);
        return res;
    });
}

async function getData() {
    await fetch('http://localhost:8000/?controller=cards&action=display').then((res) => {
        return res.json();
    }).then(res => {
        console.log(res);
    }).catch(error => console.error('Erreur HTTP', error));
}

// sendData(board);

// getData();