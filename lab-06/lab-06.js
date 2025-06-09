class Book{
    constructor(title, author , pubDate, isbn){
        this.title = title;
        this.author = author;
        this.pubDate = pubDate;
        this.isbn = isbn;
    }
}

//const atomicHabits = new Book("Atomic Habits", "James Clear", "10/16/2018");
//console.log(atomicHabits);

class Library{
    constructor(name){
        this._name = name;
        this._books = [];
    }
    get books(){
        //returns copy of books
        return JSON.parse(JSON.stringify(this._books));
    }
    get count() {
        return this._books.length;
      }

      addBook(book = {}) {
        const { title = "", author = "", pubDate = "", isbn = ""} = book; //desconstructs
        if (title.length > 0 && author.length > 0) { //do they have a value?
          const newBook = { title, author, pubDate, isbn}; //create new book with same values
          this._books.push(newBook); //push it into the array
        }
      }

      listBooks() {
        for (const book of this._books) {
          const {title, author, pubDate, isbn} = book;
          console.log(`Title: ${title}, Author: ${author}, PubDate: ${pubDate}, ISBN: ${isbn}`)
        }
      }

      deleteBook(isbn) {
        const index = this._books.findIndex(book => book.isbn === isbn);
        if (index !== -1) {
          this._books.splice(index, 1);
        }
      }

    }

    
   
    // Create library object
const library = new Library("New York Times Best Seller List");

// Create books
const atomicHabits = new Book("Atomic Habits", "James Clear", "10/16/2018", "0735211299");
const theHillWeClimb = new Book("The Hill We Climb", "David Baldacci", "03/30/2021", "059346527X");
const oceanPrey = new Book("Ocean Prey", "John Sandford", "04/13/2021", "1398505501");

// Add books to library and output library count and books
library.addBook(atomicHabits);
library.addBook(theHillWeClimb);
library.addBook(oceanPrey);
console.log(`Book count: ${library.count}`);
library.listBooks();

// Delete a book and output library books
console.log("* Library after delete *");
library.deleteBook("059346527X");
library.listBooks();