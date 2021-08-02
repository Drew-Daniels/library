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
}

Book.prototype.toggleReadStatus = function() {
    this.readStatus = !(this.readStatus);
}

Book.prototype.info = function() {
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
    if (!(entry[0] === "" || entry[1] ==="" || entry[2] === "")) {
        let newBook = new Book(...entry);
        addBookToLibrary(newBook);
    }
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
    let index = bk.index;
    let entry = document.createElement('tr');
    entry.setAttribute('id', index)
    for (let prop in bk) {                      // new Col for each Book prop
        if (bk.hasOwnProperty(prop)) {
            if (!(prop === 'readStatus')) {
                addStandardCol(bk[prop], entry);
            } else {
                addReadCol(bk[prop], entry, index);
            }
        }
    }
    // create DELETE btn
    let delBtn = addDelBtn(bk.index, entry);
    addIconToBtn(delBtn, removeIconPath)
    bookList.appendChild(entry);
}

function addReadCol(text, parent, ind) {
    let fact = document.createElement('td');
    addReadBtn(ind, parent, text);
    parent.appendChild(fact);
}

function addStandardCol(prop, parent) {
    let fact = document.createElement('td');
    fact.innerHTML = prop;
    parent.appendChild(fact);
}

function addIconToBtn(btn, iconPath) {
    let icon = document.createElement('img');
    icon.src = iconPath;
    btn.appendChild(icon);
}

function addReadBtn(ind, parent, text) {
    let btn = document.createElement('button');
    btn.innerHTML = text;
    btn.setAttribute('id', 'readBtn-' + String(ind));
    btn.setAttribute('class', 'readBtn');
    parent.appendChild(btn);
    addReadToggle(btn);
}

function addDelBtn(ind, parent) {
    let delBtn = document.createElement('button');
    delBtn.setAttribute('id', 'delBtn-' + String(ind));
    delBtn.setAttribute('class', 'delBtn');
    addDelFunc(delBtn);
    parent.appendChild(delBtn);  // append DELETE btn to the end of each row
    return delBtn;
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

function addReadToggle(ele) {
    ele.addEventListener('click', function() {
        let id = ele.getAttribute('id').slice(-1);
        let bk = myLibrary[id-1];
        bk.toggleReadStatus();
        let readStatus = document.getElementById('readBtn-' + id);
        readStatus.innerHTML = bk.readStatus;
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

