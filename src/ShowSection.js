import React, { Component } from "react";
import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import ShowBooks from "./ShowBooks";
class ShowSection extends Component {
  static propTypes = {
    books: PropTypes.array.isRequired,
    shelf: PropTypes.array.isRequired,
    handleBookShelfUpdate: PropTypes.func.isRequired,
  };

  render() {
    const { books, shelf, handleBookShelfUpdate } = this.props;
    return (
      <div>
        {shelf.map((bookShelf) => (
          <div className="bookshelf">
            <h2 className="bookshelf-title">{bookShelf}</h2>
            <div className="bookshelf-books">
              <ol className="books-grid">
                {books
                  .filter((c) => c.shelf === bookShelf)
                  .map((book) => (
                    <ShowBooks
                      key={book.id}
                      book={book}
                      handleBookShelfUpdate={handleBookShelfUpdate}
                    />
                  ))}
              </ol>
              <div className="open-search">
                <Link to="/search">Add Contact</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  }
}

export default ShowSection;
