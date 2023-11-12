// models/Book.js
class Book {
  /**
   * @param {Partial<Book>} book
   */
  constructor(book) {
    /** @type {string | undefined} */
    this.id = book.id
    /** @type {string | undefined} */
    this.title = book.title
    /** @type {string | undefined} */
    this.author = book.author
    /** @type {number | undefined} */
    this.rating = book.rating
    /** @type {string | undefined} */
    this.summary = book.summary
    /** @type {string | undefined} */
    this.review = book.review
    /** @type {string | undefined} */
    this.category = book.category
    /** @type {string | undefined} */
    this.image = book.image
  }
}

export default Book
