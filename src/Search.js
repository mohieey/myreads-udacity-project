import React, { Component } from "react";
import { Link } from "react-router-dom";

class Search extends Component {
  state = { Query: "", ToSearchIn: [] };
  updateQuery = (q) => {
    this.setState({ Query: q });
    if (q.length === 0) {
      this.setState({ ToSearchIn: [] });
      return;
    }
    this.props.BooksAPI.search(q)
      .then((books) => {
        if (books) this.setState({ ToSearchIn: books });
        // else this.setState({ ToSearchIn: [] });
      })
      .catch((err) => {
        console.log(err);
      })
      .catch((err) => {
        this.setState({ ToSearchIn: [] });
      });
  };

  verifyStatus = (book) => {
    this.props.BooksAPI.getAll().then((books) => {
      const bookInSearch = books.find((b) => b.id === book.id);
      if (bookInSearch) book.shelf = bookInSearch.shelf;
      else book.shelf = "none";
    });
  };

  render() {
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/">
            <button
              className="close-search"
              onClick={() => this.setState({ showSearchPage: false })}
            >
              Close
            </button>
          </Link>
          <div className="search-books-input-wrapper">
            {/*
              NOTES: The search from BooksAPI is limited to a particular set of search terms.
              You can find these search terms here:
              https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

              However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
              you don't find a specific author or title. Every search is limited by search terms.
            */}
            <input
              type="text"
              placeholder="Search by title or author"
              value={this.state.Query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        <div className="search-books-results">
          <ol className="books-grid">
            {this.state.ToSearchIn.length > 0 &&
              this.state.ToSearchIn.map((book) => {
                const bookInShelves = this.props.books.find(
                  (b) => b.id === book.id
                );
                if (bookInShelves) book.shelf = bookInShelves.shelf;
                else book.shelf = "none";
                return (
                  <li key={book.id}>
                    <div className="book">
                      <div className="book-top">
                        {book.imageLinks && (
                          <div
                            className="book-cover"
                            style={{
                              width: 128,
                              height: 192,
                              backgroundImage: `url(${
                                book.imageLinks.smallThumbnail
                              })`,
                            }}
                          />
                        )}
                        <div className="book-shelf-changer">
                          <select
                            value={book.shelf}
                            onChange={(event) =>
                              this.props.changeBookStatus(
                                book,
                                event.target.value
                              )
                            }
                          >
                            <option value="move" disabled>
                              Move to...
                            </option>
                            <option value="currentlyReading">
                              Currently Reading
                            </option>
                            <option value="wantToRead">Want to Read</option>
                            <option value="read">Read</option>
                            <option value="none">None</option>
                          </select>
                        </div>
                      </div>
                      <div className="book-title">{book.title}</div>
                      <div className="book-authors">
                        {book.authors &&
                          book.authors.map((bookAuthor) => (
                            <p key={bookAuthor}>{bookAuthor}</p>
                          ))}
                      </div>
                    </div>
                  </li>
                );
              })}
          </ol>
        </div>
      </div>
    );
  }
}

export default Search;
