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

function getBookInfo() {
    FormData()
}

function addBookToLibrary(bk) {
    myLibrary.push(bk);
}

function selfTest() {
    const book1 = new Book('The Great Gatsby', 
                         'F. Scott Fitzgerald',
                         400,
                         true);
    const book2 = new Book('One Hundred Years of Solitude',
                         'Gabriel Garcia Marquez',
                         1000,
                         false);
    const book3 = new Book('In Cold Blood',
                         'Truman Capote',
                         250,
                         false);
    const collection = [book1, book2, book3];

    collection.forEach(addBookToLibrary);
}

selfTest();

const bookList = document.querySelector('#bookTable');
myLibrary.forEach(function(bk) {
    let entry = document.createElement('tr');
    for (let prop in bk) {
        let fact = document.createElement('td');
        fact.innerHTML = bk[prop];
        entry.appendChild(fact);
    }
    bookList.appendChild(entry);
})
