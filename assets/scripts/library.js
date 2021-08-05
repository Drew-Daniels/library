//+++++++++++++++++ GRAB STATIC REFERENCES +++++++++++++++++++++
let myLibrary;
let index = 0;
const bookList = document.querySelector('#bookTable');
const popup = document.querySelector('#myPopup');
const bookEntry = document.querySelector('#bookTitle');
const authorEntry = document.querySelector('#authorName');
const pageEntry = document.querySelector('#numPages');
const readEntry = document.querySelector('#readStatus');
const removeIconPath = '/assets/images/remove_icon.png'

function Book(title, author, pageNumber, readStatus=false) {
    this.index = 0; //default
	this.title = title;
	this.author = author;
	this.pageNumber = +pageNumber;
	this.readStatus = readStatus;
}

Book.prototype.toggleReadStatus = function() {
    this.readStatus = !(this.readStatus);
}

Book.prototype.info = function() {
    let readStr;
    if(readStatus) {
        readStr = 'has been read';
    } else {
        readStr = 'has not been read';
    }
    return (title + ' by '+ author + ', ' + pageNumber + ', ' + readStr);
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

function buildTable(lib) {
    index = 0;
    lib.forEach((bk) => {
        index++
        bk['index'] = index;
        addRow(bk, bk['index']);
    });
}

function addBookToLibrary(bk) {
    // Add in functionality to detect if this is a duplicate entry
    // Add in functionality to reset the book index when books are deleted
    myLibrary.push(bk);
    saveToLocal();
    index++;
    addRow(bk, index)
}

function addRow(bk, index) {
    bk['index'] = index;
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
    //addDelBtn(entry, index);
    addDelCol(entry, index);
    bookList.appendChild(entry);
}

function addReadCol(text, parent, ind) {
    let fact = document.createElement('td');
    addReadBtn(ind, fact, text);
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

function addDelCol(parent, ind) {
    let fact = document.createElement('td');
    addDelBtn(fact, ind);
    parent.appendChild(fact);
}

function addDelBtn(parent, ind) {
    let delBtn = document.createElement('button');
    delBtn.setAttribute('id', 'delBtn-' + String(ind));
    delBtn.setAttribute('class', 'delBtn');
    addDelFunc(delBtn);
    parent.appendChild(delBtn);  // append DELETE btn to the end of each row
    //addIconToBtn(delBtn, removeIconPath)
    return delBtn;
}

function addDelFunc(btn) {
    btn.addEventListener('click', function() {
        // Remove the book from the display
        let bId = btn.getAttribute('id');
        let index = bId.slice(-1);
        let dataRow = document.getElementById(String(index));
        while (dataRow.hasChildNodes()) {
            dataRow.firstChild.remove();
        }
        dataRow.remove();
        // Remove the book from the library
        myLibrary.splice(index-1, 1);
        saveToLocal();
    })
}

function addReadToggle(ele) {
    ele.addEventListener('click', function() {
        // Cannot directly assign prototype function because they could not
        // then be read from localStorage later on
        function toggleReadStatus(bk) {
            bk.readStatus = !(bk.readStatus);
        }
        let id = ele.getAttribute('id').slice(-1);
        let bk = myLibrary[id-1];
        toggleReadStatus(bk);
        saveToLocal();
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

    return collection;
}

function locStorageAvailable() {
    let storage;
    try {
        storage = window['localStorage'];
        var x = 'test';
        storage.setItem(x, x);
        storage.removeItem(x);
        return true;
    }
    catch(e) {
        console.log(e);
        return false;
    }
}

function saveToLocal() {
    locStor.setItem('userLibrary', JSON.stringify(myLibrary))
}

function initLibrary() {
    let lib;
    if (useLocStorage) {
        initStorage();
        let userLibrary = locStor.getItem('userLibrary');
        if (!(userLibrary === null)) {
            lib = JSON.parse(userLibrary);
            return lib;
        }
        else {
            lib = selfTest();
            return lib;
        }
    }
}

let locStor;
function initStorage() {
    locStor = window['localStorage'];
}

// RUN
let useLocStorage = locStorageAvailable();
myLibrary = initLibrary();
buildTable(myLibrary);