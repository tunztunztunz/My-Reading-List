let myLibrary = [];

function Book(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = false;
}



function loadStorage() {
    if (localStorage.getItem('myLibrary') && localStorage.getItem('myLibrary') !== '[]') {
        retrievedData = localStorage.getItem('myLibrary');
        myLibrary = JSON.parse(retrievedData);
        render();
    } else {
        addBookToLibrary('American Gods', 'Neil Gaiman', '750');
        addBookToLibrary('Friday Black', 'Nana Kwame Adjei-Brenyah', '192');
        addBookToLibrary('1Q84', 'Haruki Murakami', '1157');
        render();
    }
}

function updateStorage() {
    localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
    console.log(localStorage);
}

function addBookToLibrary(title, author, pages, isRead) {
    const newBook = new Book(title, author, pages, isRead);
    myLibrary.push(newBook);
    updateStorage();
}

function render() {
    var container = document.querySelector('.books-container');

    container.innerHTML = '';

    for (const book of myLibrary) {
        let span = document.createElement('span');
        span.classList.add('book');

        let title = document.createElement('p');
        title.textContent = book.title;
        span.appendChild(title);

        let author = document.createElement('p');
        author.textContent = book.author;
        span.appendChild(author);

        let pages = document.createElement('p');
        pages.textContent = book.pages;
        span.appendChild(pages);

        let readButton = document.createElement('button');
        createReadButton(readButton, book);
        span.appendChild(readButton);

        let deleteButton = document.createElement('button');
        deleteButton.classList.add('deleteButton');
        createDeleteButton(deleteButton, book);
        span.appendChild(deleteButton);

        container.appendChild(span);
    }
}

function createReadButton(readButton, book) {
    readButton.innerHTML = '<i class=\"fas fa-book\"></i>';

    readButton.dataset.index = myLibrary.indexOf(book);
    let index = readButton.dataset.index;
    readClassToggle(readButton, index);

    readButton.addEventListener('click', (e) => {
        id = readButton.dataset.index;
        readButton = e.target;
        readButtonToggle(readButton, id);
    });
}

function readButtonToggle(button, index) {
    myLibrary[index].isRead === false ? myLibrary[index].isRead = true : myLibrary[index].isRead = false;
    readClassToggle(button, index);
    updateStorage();
}

function readClassToggle(button, index) {
    if (myLibrary[index].isRead) button.classList.add('read');
    else button.classList.remove('read');
}

function createDeleteButton(deleteButton, book) {
    deleteButton.dataset.index = myLibrary.indexOf(book);
    deleteButton.addEventListener('click', (e) => {
        id = e.target.dataset.index;
        deleteBook(id);
    });
    deleteButton.innerHTML = '<i class="fas fa-trash"></i>'
}

function deleteBook(index) {
    myLibrary.splice(index, 1);
    updateStorage();
    render();
}

const addButton = document.querySelector('.add-new-book');
const cancelButton = document.querySelector('.cancel-button');
const submitButton = document.querySelector('.submit-button');
const isReadButton = document.querySelectorAll('.book button');
const popup = document.querySelector('new-book-form');

addButton.addEventListener('click', () => {
    document.querySelector('.form-background').classList.toggle('hide');
})

cancelButton.addEventListener('click', () => {
    document.querySelector('.form-background').classList.toggle('hide');
    document.querySelector('#warning').textContent = '';
})

document.querySelector('form').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const pages = document.getElementById('pages').value;
    const warningParagraph = document.getElementById('warning');


    if (myLibrary.some(book => book.title === title)) {
        warningParagraph.textContent = `You already added ${title} to the list`;
        submitButton.classList.add('buttonShake');
        return;
    } else if (title === '' || author === '') {
        warningParagraph.textContent = 'Please finish filling out the form';
        submitButton.classList.add('buttonShake');
        return;
    } else {
        addBookToLibrary(title, author, pages, false);
        document.querySelector('.form-background').classList.toggle('hide');
        render();
        document.querySelector('form').reset();
    }
})

submitButton.addEventListener('animationend', () => submitButton.classList.remove('buttonShake'));

loadStorage();