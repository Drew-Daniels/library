const myLibrary = [];

function Book(title, author, pageNumber, readStatus=false) {
	this.title = title;
	this.author = author;
	this.pageNumber = pageNumber;
	this.readStatus = readStatus;
	info = function() {
		let readStr;
		if(readStatus) {
			readStr = 'has been read';
		} else {
			readStr = 'has not been read';
		}
		return (title + ' by '+ author + ', ' + pageNumber + ', ' + readStr);
	}
}

const popup = document.querySelector('#myPopup');
const bookEntry = document.querySelector('#bookTitle');
const authorEntry = document.querySelector('#authorName');
const pageEntry = document.querySelector('#numPages');
const readEntry = document.querySelector('#readStatus');

function openForm() {
    popup.classList.add('show');
}

function submitForm() {
    let book;
    let author;
    let page;
    let read; 
    let newAddition;
    function getFormData() {
        book = bookEntry.value;
        author = authorEntry.value;
        page = pageEntry.value;
        read = readEntry.value;
        newAddition = [book, author, page, read];
        return newAddition;
    }

    function closeForm() {
        popup.classList.remove('show');
    }

    let entry = getFormData();
    let newBook = new Book(...entry);
    addBookToLibrary(newBook);
    closeForm();

    refreshLibrary();
}

function addBookToLibrary(bk) {
    myLibrary.push(bk);
}

function selfTest() {
    const book1 = new Book('The Great Gatsby', 
                         'F. Scott Fitzgerald',
                         240,
                         true);
    const book2 = new Book('One Hundred Years of Solitude',
                         'Gabriel Garcia Marquez',
                         432,
                         false);
    const book3 = new Book('In Cold Blood',
                         'Truman Capote',
                         320,
                         false);
    const collection = [book1, book2, book3];

    collection.forEach(addBookToLibrary);
}

const bookList = document.querySelector('#bookTable');
selfTest();
refreshLibrary();

function refreshLibrary() {
    myLibrary.forEach(function(bk) {
        let entry = document.createElement('tr');
        for (let prop in bk) {
            let fact = document.createElement('td');
            fact.innerHTML = bk[prop];
            entry.appendChild(fact);
        }
        bookList.appendChild(entry);
    })
}

