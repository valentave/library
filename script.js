let myLibrary = [];

// Initialize form
const formPopUp = document.querySelector(".form-popup");
const formAddBook = document.querySelector("#form-addBook");
const newBook = document.querySelector("#myForm");
const inputTitle = document.querySelector("#title");
const inputAuthor = document.querySelector("#author");
const inputPages = document.querySelector("#pages");
const inputIsRead = document.querySelector("#isRead");
const inputSort = document.querySelector("#sort-list");

// Initialize library
const library = document.querySelector(".library");

// Initialize buttons
const readButtons = document.querySelectorAll(".btn-read");
const notReadButtons = document.querySelectorAll(".btn-notRead");
const deleteButtons = document.querySelectorAll(".btn-delete");
const addBookButton = document.querySelector("#btn-addBook");
const emptyListButton = document.querySelector("#btn-empty");
const sortButton = document.querySelector("#btn-sort");

// Define functions
function Book(title = "unknown", author = "unknown", pages = 0, isRead = false) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
}

function findBook (book) {
    return myLibrary.find(element => element.title === book.title)
}

function addBookToLibrary(title = "unknown", author = "unknown", pages = 0, isRead = false) {
    let book = new Book(title, author, pages, isRead);
    if (findBook(book) === undefined) {
        myLibrary.push(book);
    }
}

function changeRead(target, isRead) {
    if (isRead === true) {
        target.classList.remove("btn-read");
        target.classList.add("btn-notRead");
        target.textContent = "Not read";
    } else {
        target.classList.remove("btn-notRead");
        target.classList.add("btn-read");
        target.textContent = "Read";
    }
}

function updateArray(title, isRead) {
    myLibrary.forEach((book) => {
        if(book.title === title){
            book.isRead = isRead;
        }
    })
}

function popBook(title) {
    console.log(myLibrary);
    const newArray = myLibrary.filter(element => element.title !== title);
    myLibrary = newArray;
}

function displayLibrary() {
    library.innerHTML = '';
  
    myLibrary.forEach(book => {
        const bookElement = document.createElement("div");
        bookElement.classList.add("book");
        bookElement.innerHTML = `
            <h2 class="bookTitle">${book.title}</h2>
            <p class="bookAuthor">Author: ${book.author}</p>
            <p class="bookPages">Pages: ${book.pages}</p>
            <button class="${book.isRead ? "btn-read" : "btn-notRead"}">${book.isRead ? "Read" : "Not read"}</button>
            <button class="btn-delete">Delete</button>
        `;
        library.appendChild(bookElement);
    });
}

function sortList(option) {
    switch (option) {
      case "1":
        myLibrary.sort((a, b) => (a.title < b.title ? -1 : 1));
        break;
      case "2":
        myLibrary.sort((a, b) => (b.title < a.title ? -1 : 1));
        break;
      case "3":
        myLibrary.sort((a, b) => (a.author < b.author ? -1 : 1));
        break;
      case "4":
        myLibrary.sort((a, b) => (b.author < a.author ? -1 : 1));
        break;
      case "5":
        myLibrary.sort((a, b) => a.pages - b.pages);
        break;
      case "6":
        myLibrary.sort((a, b) => b.pages - a.pages);
        break;
      case "7":
        myLibrary.sort((a, b) => (a.isRead && !b.isRead ? -1 : 1));
        break;
      case "8":
        myLibrary.sort((a, b) => (!a.isRead && b.isRead ? -1 : 1));
        break;
    }
}

// Define events
formAddBook.addEventListener("submit", function(event) {
    event.preventDefault();
    
    // Create a Book with the data received from the inputs and adds it to myLibrary
    addBookToLibrary(
        inputTitle.value, 
        inputAuthor.value, 
        inputPages.value, 
        inputIsRead.checked);
    // Hide popup to add a book
    formPopUp.classList.add("hidden");
    displayLibrary();
});

library.addEventListener("click", function(event) {
    const target = event.target;
    let title = target.parentNode.firstChild.nextSibling.textContent;
  
    // Check if the clicked element has the class "btn-read"
    if (target.classList.contains("btn-read")) {
        // Change class and text of the toggle
        changeRead(target, true);
        updateArray(title, false);
    } // Check if the clicked element has the class "btn-notRead"
    else if (target.classList.contains("btn-notRead")) {
        changeRead(target, false);
        updateArray(title, true);
    } else if (target.classList.contains("btn-delete")) {
        target.parentNode.remove(target);
        popBook(title);
    }
});

addBookButton.addEventListener("click", () => {
    // Show popup to add a book
    formPopUp.classList.remove("hidden");
})

emptyListButton.addEventListener("click", () => {
    // Empty and display the library
    myLibrary = [];
    displayLibrary();
})

sortButton.addEventListener("click", function(event) {
    event.preventDefault();
    let option = inputSort.value;
    // Sort the library by the selected option
    sortList(option);
    displayLibrary();
})