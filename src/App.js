import React from "react";
import * as BooksAPI from "./BooksAPI";
import "./App.css";
import { Route, Link } from "react-router-dom";
import Search from "./Search";
import BookShelf from "./bookshelf";

class BooksApp extends React.Component {
  state = {
    books: [],
    showSearchPage: false,
  };

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState({ books: books });
    });
  }

  changeBookStatus = (id, status) => {
    const index = this.state.books.findIndex((b) => b.id === id);
    const books = this.state.books;
    books[index].shelf = status;
    this.setState({ books: books });
  };

  render() {
    return (
      <div className="app">
        <Route
          exact
          path="/search"
          render={() => (
            <Search
              books={this.state.books}
              onDeleteContact={this.removeContact}
              changeBookStatus={this.changeBookStatus}
            />
          )}
        />
        <Route
          exact
          path="/"
          render={() => (
            <div className="list-books">
              <div className="list-books-title">
                <h1>MyReads</h1>
              </div>
              <div className="list-books-content">
                <div>
                  <BookShelf
                    title="Currently Reading"
                    toshow={this.state.books.filter(
                      (b) => b.shelf === "currentlyReading"
                    )}
                    changeBookStatus={this.changeBookStatus}
                  />
                  <BookShelf
                    title="Want To Read"
                    toshow={this.state.books.filter(
                      (b) => b.shelf === "wantToRead"
                    )}
                    changeBookStatus={this.changeBookStatus}
                  />
                  <BookShelf
                    title="Read"
                    toshow={this.state.books.filter((b) => b.shelf === "read")}
                    changeBookStatus={this.changeBookStatus}
                  />
                </div>
              </div>
              <div className="open-search">
                <Link to="/search">
                  <button
                    onClick={() => this.setState({ showSearchPage: true })}
                  >
                    Add a book
                  </button>
                </Link>
              </div>
            </div>
          )}
        />
      </div>
    );
  }
}

export default BooksApp;
