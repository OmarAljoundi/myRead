import React, { Component } from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import { BrowserRouter as Router } from "react-router-dom";
import { Route, Switch } from "react-router";
import ShowSection from "./ShowSection";
import SearchBooks from "./SearchBooks";
import NoMatch from "./NoMatch";
class App extends Component {
  state = {
    booksFromApi: [],
  };

  updateState = (book, newshelf, image) => {
    this.setState({
      booksFromApi: this.state.booksFromApi.concat({
        id: book.id,
        title: book.title,
        authors: book.authors,
        imageLink: image,
        shelf: newshelf,
      }),
    });
  };

  handleBookShelfUpdate = (newshelf, bookId) => {
    let checkBookExistence = true;
    BooksAPI.get(bookId).then((object) => {
      if (object.shelf === "none") {
        checkBookExistence = false;
      }
      this.insertNewBook(object, checkBookExistence, newshelf, bookId);
      BooksAPI.update(object, newshelf);
    });
  };

  insertNewBook = (book, checkBookExistence, newshelf, bookId) => {
    if (checkBookExistence) {
      this.setState((prevState) => ({
        booksFromApi: this.state.booksFromApi.map((book) =>
          book.id === bookId ? { ...book, shelf: newshelf } : book
        ),
      }));
    } else {
      typeof book.imageLinks === "undefined"
        ? this.updateState(book, newshelf)
        : this.updateState(book, newshelf, book.imageLinks.smallThumbnail);
    }
  };

  componentDidMount() {
    let tempBooks = [];
    BooksAPI.getAll().then((books) => {
      books.map((book) => {
        typeof book.imageLinks === "undefined"
          ? (tempBooks = tempBooks.concat({
              id: book.id,
              title: book.title,
              authors: book.authors,
              imageLink: "undefined",
              shelf: book.shelf,
            }))
          : (tempBooks = tempBooks.concat({
              id: book.id,
              title: book.title,
              authors: book.authors,
              imageLink: book.imageLinks.smallThumbnail,
              shelf: book.shelf,
            }));
      });
      this.setState({ booksFromApi: tempBooks });
    });
  }

  render() {
    const { booksFromApi } = this.state;
    const bookSections = ["currentlyReading", "wantToRead", "read"];
    return (
      <Router>
        <div>
          <Switch>
            <Route
              path="/"
              exact
              render={() => (
                <ShowSection 
                  books={booksFromApi}
                  shelf={bookSections}
                  handleBookShelfUpdate={this.handleBookShelfUpdate}
                />
              )}
            />
            <Route
              path="/search"
              render={({ history }) => (
                <SearchBooks
                  booksWithShelf={booksFromApi}
                  handleBookShelfUpdate={(newshelf, bookId) => {
                    this.handleBookShelfUpdate(newshelf, bookId);
                  }}
                />
              )}
            />
            <Route component={NoMatch} />
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;
