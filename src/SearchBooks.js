import React, { Component } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import * as BooksAPI from "./BooksAPI";
import ShowBooks from "./ShowBooks";

class SearchBooks extends Component {
  static propTypes = {
    handleBookShelfUpdate: PropTypes.func.isRequired,
    booksWithShelf: PropTypes.array.isRequired,
  };

  state = {
    bookName: "",
    allBooks: [],
  };

  mergeBooks = () => {
    const booksWithShelf = this.props.booksWithShelf.filter(({ id: id1 }) =>
      this.state.allBooks.some(({ id: id2 }) => id2 === id1)
    );
    const booksWithoutShelf = this.state.allBooks.filter(
      ({ id: id1 }) =>
        !this.props.booksWithShelf.some(({ id: id2 }) => id2 === id1)
    );
    const correctBooksForm = booksWithShelf.concat(booksWithoutShelf);
    this.setState({ allBooks: correctBooksForm });
  };

  setBookObject = (book, image = "undefined") => {
    this.setState({
      allBooks: this.state.allBooks.concat({
        id: book.id,
        title: book.title,
        authors: book.authors,
        imageLink: image,
        shelf: book.shelf,
      }),
    });
  };

  searchBooks = (query) => {
    if (query !== "") {
      BooksAPI.search(query, 20).then((books) => {
        if (books.error !== "empty query") {
          this.setState({ allBooks: [] });
          books.map((book) => {
            typeof book.imageLinks === "undefined"
              ? this.setBookObject(book)
              : this.setBookObject(book, book.imageLinks.smallThumbnail);
          });
          this.mergeBooks();
        } else {
          this.setState({ allBooks: [] });
        }
      });
    } else {
      this.setState({ allBooks: [] });
    }
    this.setState({ bookName: query });
  };

  render() {
    const { handleBookShelfUpdate } = this.props;
    const { bookName, allBooks } = this.state;
    return (
      <div className="bookshelf-books">
        <div className="search-books-bar">
          <Link className="close-search" to="/">
            {" "}
            Close{" "}
          </Link>
          <div className="search-books-input-wrapper">
            <input
              className="search-contacts"
              type="text"
              placeholder="Search contacts"
              value={bookName}
              onChange={(event) => this.searchBooks(event.target.value)}
            />
          </div>
        </div>
        <div className="bookshelf-books">
          <ol className="books-grid">
            {allBooks.map((book) => (
              <ShowBooks
                key={book.id}
                book={book}
                handleBookShelfUpdate={handleBookShelfUpdate}
              />
            ))}
          </ol>
        </div>
      </div>
    );
  }
}
export default SearchBooks;
