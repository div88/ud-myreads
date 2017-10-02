import React, { Component } from 'react';

import { Route, Link } from 'react-router-dom';
import PropTypes from 'prop-types'
import escapeRegExp from 'escape-string-regexp'
import sortBy from 'sort-by'

import BookSearch from './BookSearch.js'
import * as BooksAPI from './BooksAPI.js'
import './App.css';

class App extends Component {
  state = {
    books: [],
    currentlyReading: [],
    wantToRead: [],
    read: [],
    crvalue: 'currentlyReading',
    wrvalue: 'wantToRead',
    rvalue: 'read'
  }

  updateQuery(book, shelf) {
      let toShelf, fromShelf
      fromShelf = book.shelf
      toShelf = shelf
      console.log(fromShelf);
      console.log(toShelf);
      BooksAPI.update(book, shelf).then(() => {
        this.setState({
          toShelf: this.state[toShelf].push(book),
          [fromShelf]: this.state[fromShelf].filter((b) => b.id !== book.id)
        })
      })
  }

  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      console.log(books);
      this.setState({ books: books })
      this.setState({
        currentlyReading: books.filter(book => book.shelf === "currentlyReading"),
        wantToRead: books.filter(book => book.shelf === "wantToRead"),
        read: books.filter(book => book.shelf === "read")
      })
    })
  }



  render() {
    const {books} = this.props
    const {query} = this.state
    let bookList
    let currentlyreading, wanttoread, read


    return (

      <div>

      <Route exact path="/" render={() => (
        <div className="list-books">
          <div className="list-books-title">
            <h2>My Reads</h2>
          </div>
          <div>
              <div className="list-books-content">

                <div>
                    <div>
                      <div className="bookshelf">
                        <h2 className="bookshelf-title">Currently Reading</h2>
                        <div className="bookshelf-books">
                          <ul className='books-grid'>
                            {this.state.currentlyReading.map((book) => (
                              <li key={book.id}>
                                <div className="book">
                                  <div className="book-top">

                                  <div className="book-cover" style={{ width: 128, height: 193,
                                    backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                                  <div className="book-shelf-changer">
                                    <select value={this.state.crvalue} onChange={(event) => this.updateQuery(book,event.target.value)}>
                                      <option value="none">Move to...</option>
                                      <option value="currentlyReading">Currently Reading</option>
                                      <option value="wantToRead">Want to Read</option>
                                      <option value="read">Read</option>
                                      <option value="none">None</option>
                                    </select>
                                  </div>
                                </div>
                                  <p className="book-title">{book.title}</p>
                                  <p className="book-authors">{book.authors}</p>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                </div>

                <div>
                    <div>
                      <div className="bookshelf">
                        <h2 className="bookshelf-title">Want to read</h2>
                        <div className="bookshelf-books">
                          <ul className='books-grid'>
                            {this.state.wantToRead.map((book) => (
                              <li key={book.id}>
                                <div className="book">
                                  <div className="book-top">

                                  <div className="book-cover" style={{ width: 128, height: 193,
                                    backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                                  <div className="book-shelf-changer">
                                    <select value={this.state.wrvalue} onChange={(event) => this.updateQuery(book,event.target.value)} >
                                      <option value="none" disabled>Move to...</option>
                                      <option value="currentlyReading">Currently Reading</option>
                                      <option value="wantToRead">Want to Read</option>
                                      <option value="read">Read</option>
                                      <option value="none">None</option>
                                    </select>
                                  </div>
                                </div>
                                  <p className="book-title">{book.title}</p>
                                  <p className="book-authors">{book.authors}</p>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                </div>
                <div>
                  <div className="bookshelf">
                    <h2 className="bookshelf-title">Read</h2>
                    <div className="bookshelf-books">
                      <ul className='books-grid'>
                        {this.state.read.map((book) => (
                          <li key={book.id}>
                            <div className="book">
                              <div className="book-top">

                              <div className="book-cover" style={{ width: 128, height: 193,
                                backgroundImage: `url(${book.imageLinks.thumbnail})` }}></div>
                              <div className="book-shelf-changer">
                                <select value={this.state.rvalue} onChange={(event) => this.updateQuery(book,event.target.value)}>
                                  <option value="none">Move to...</option>
                                  <option value="currentlyReading">Currently Reading</option>
                                  <option value="wantToRead">Want to Read</option>
                                  <option value="read">Read</option>
                                  <option value="none">None</option>
                                </select>
                              </div>
                            </div>
                              <p className="book-title">{book.title}</p>
                              <p className="book-authors">{book.authors}</p>
                            </div>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
          </div>
          <div className="open-search">
            <Link to="/search" onClick={() => this.setState({ showSearchPage: true })}>Add a book</Link>
          </div>
        </div>
      )}/>
      <Route path="/search" render = {({ history }) => (
        <BookSearch></BookSearch>
      )}/>

    </div>
      );
  }
}

export default App;
