//+++++++++++++++++ GRAB STATIC REFERENCES +++++++++++++++++++++
const myLibrary = [];
const bookList = document.querySelector('#bookTable');
const popup = document.querySelector('#myPopup');
const bookEntry = document.querySelector('#bookTitle');
const authorEntry = document.querySelector('#authorName');
const pageEntry = document.querySelector('#numPages');
const readEntry = document.querySelector('#readStatus');
const removeIconPath = '/assets/images/remove_icon.png'

let bookIndex = 0;
function Book(title, author, pageNumber, readStatus=false) {
    this.index = ++bookIndex
	this.title = title;
	this.author = author;
	this.pageNumber = +pageNumber;
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

//+++++++++++++++++ FORM FUNCTIONS ++++++++++++++++++++++
function openForm() {
    popup.classList.add('show');
}

function submitForm() {
    let book, author, page, read, newAddition;
    function getFormData() {
        [book, author, page, read] = [bookEntry.value, authorEntry.value, 
                                      pageEntry.value, readEntry.checked]
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
}


/**
 * This function is intended to be called repeatedly for all 'Book' objects
 * created. Each time it is called, it creates a new row to display a 'Book'
 * object where each one is given it's own index and delete button.
 * Each book attribute is displayed as a separate column in the table.
 * @param {Book} bk 
 */
function addBookToLibrary(bk) {
    // Add in functionality to detect if this is a duplicate entry
    // Add in functionality to reset the book index when books are deleted
    myLibrary.push(bk);
    let entry = document.createElement('tr');
    entry.setAttribute('id', bk.index)
    for (let prop in bk) {                      // new Col for each Book prop
        let fact = document.createElement('td');
        fact.innerHTML = bk[prop];
        entry.appendChild(fact);
    }
    // create DELETE btn
    let delBtn = document.createElement('button');
    delBtn.setAttribute('id', 'delBtn-' + String(bk.index));
    delBtn.setAttribute('class', 'delBtn');
    addDelFunc(delBtn);
    entry.appendChild(delBtn);  // append DELETE btn to the end of each row
    let icon = document.createElement('img');
    icon.src = removeIconPath;
    delBtn.appendChild(icon);
    bookList.appendChild(entry);
}

function addDelFunc(btn) {
    btn.addEventListener('click', function() {
        let bId = btn.getAttribute('id');
        let index = bId.slice(-1);
        let dataRow = document.getElementById(String(index));
        while (dataRow.hasChildNodes()) {
            dataRow.firstChild.remove();
        }
        dataRow.remove();
    })
}


//++++++++++++++ SELF TEST CODE ++++++++++++++++++++++
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

selfTest();

